import 'dotenv/config'
import { prisma } from '../src/lib/prisma'
import fs from 'fs'
import path from 'path'
import { DisorderType } from '../src/generated/client'

async function generatePostmanCollection() {
    console.log('Fetching questions from database...')

    // Fetch all questions with their options
    const questions = await prisma.question.findMany({
        include: {
            options: {
                orderBy: { scoreValue: 'asc' }
            }
        }
    })

    // Group questions by category
    const questionsByDisorder: Record<string, typeof questions> = {}
    questions.forEach(q => {
        if (!questionsByDisorder[q.category]) {
            questionsByDisorder[q.category] = []
        }
        questionsByDisorder[q.category].push(q)
    })

    // Helper to generate responses for a specific disorder (High Score)
    const generateResponses = (targetDisorder: DisorderType | 'NONE') => {
        const responses: Record<string, string> = {}

        questions.forEach(q => {
            // If this question matches the target disorder, pick the highest scoring option
            // Otherwise, pick the lowest scoring option
            if (q.category === targetDisorder) {
                const highestOption = q.options[q.options.length - 1]
                responses[q.id] = highestOption.id
            } else {
                const lowestOption = q.options[0]
                responses[q.id] = lowestOption.id
            }
        })
        return responses
    }

    // Create Requests
    const requests = []

    // 1. Test Case: Depression (MOOD_DISORDERS)
    requests.push({
        name: "Submit Questionnaire - High Depression",
        request: {
            method: "POST",
            header: [
                { key: "Content-Type", value: "application/json" }
            ],
            url: {
                raw: "{{baseUrl}}/api/questionnaire",
                host: ["{{baseUrl}}"],
                path: ["api", "questionnaire"]
            },
            body: {
                mode: "raw",
                raw: JSON.stringify({
                    responses: generateResponses('MOOD_DISORDERS')
                }, null, 2)
            }
        }
    })

    // 2. Test Case: Anxiety (ANXIETY_DISORDERS)
    requests.push({
        name: "Submit Questionnaire - High Anxiety",
        request: {
            method: "POST",
            header: [
                { key: "Content-Type", value: "application/json" }
            ],
            url: {
                raw: "{{baseUrl}}/api/questionnaire",
                host: ["{{baseUrl}}"],
                path: ["api", "questionnaire"]
            },
            body: {
                mode: "raw",
                raw: JSON.stringify({
                    responses: generateResponses('ANXIETY_DISORDERS')
                }, null, 2)
            }
        }
    })

    // 3. Test Case: No Disorders (Healthy)
    const healthyResponses: Record<string, string> = {}
    questions.forEach(q => {
        healthyResponses[q.id] = q.options[0].id // Lowest score for everything
    })

    requests.push({
        name: "Submit Questionnaire - Healthy (Low Scores)",
        request: {
            method: "POST",
            header: [
                { key: "Content-Type", value: "application/json" }
            ],
            url: {
                raw: "{{baseUrl}}/api/questionnaire",
                host: ["{{baseUrl}}"],
                path: ["api", "questionnaire"]
            },
            body: {
                mode: "raw",
                raw: JSON.stringify({
                    responses: healthyResponses
                }, null, 2)
            }
        }
    })

    // 4. Test Case: Empty Body (Error Handling)
    requests.push({
        name: "Submit Questionnaire - Empty Body (Error)",
        request: {
            method: "POST",
            header: [
                { key: "Content-Type", value: "application/json" }
            ],
            url: {
                raw: "{{baseUrl}}/api/questionnaire",
                host: ["{{baseUrl}}"],
                path: ["api", "questionnaire"]
            },
            body: {
                mode: "raw",
                raw: JSON.stringify({
                    responses: {}
                }, null, 2)
            }
        }
    })

    // Collection Structure
    const collection = {
        info: {
            name: "WarmTalk API Tests",
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: requests,
        variable: [
            {
                key: "baseUrl",
                value: "http://localhost:3000",
                type: "string"
            }
        ]
    }

    // Write to file
    const outputPath = path.resolve(process.cwd(), 'warmtalk_postman_collection.json')
    fs.writeFileSync(outputPath, JSON.stringify(collection, null, 2))

    console.log(`✅ Postman collection generated at: ${outputPath}`)
}

generatePostmanCollection()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

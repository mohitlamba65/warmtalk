import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, DisorderType } from '../src/generated/client'

const dbUrl = process.env.DATABASE_URL
console.log('DB URL:', dbUrl ? 'Found' : 'Missing')

const pool = new Pool({ connectionString: dbUrl })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Start seeding clinical questions...')

    // 1. Clean the database (Optional: prevents duplicates if you run seed twice)
    await prisma.questionOption.deleteMany()
    await prisma.question.deleteMany()

    // --- CLINICAL QUESTIONS DATA ---

    const questions = [
        // --- DEPRESSION (Adapted from PHQ-9) ---
        {
            text: "Over the last 2 weeks, how often have you been bothered by having little interest or pleasure in doing things?",
            category: DisorderType.MOOD_DISORDERS,
            weight: 2,
            options: [
                { text: "Not at all", score: 0 },
                { text: "Several days", score: 1 },
                { text: "More than half the days", score: 2 },
                { text: "Nearly every day", score: 3 },
            ],
        },
        {
            text: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
            category: DisorderType.MOOD_DISORDERS,
            weight: 2,
            options: [
                { text: "Not at all", score: 0 },
                { text: "Several days", score: 1 },
                { text: "More than half the days", score: 2 },
                { text: "Nearly every day", score: 3 },
            ],
        },
        {
            text: "How often have you felt tired or had little energy?",
            category: DisorderType.MOOD_DISORDERS,
            weight: 1,
            options: [
                { text: "Not at all", score: 0 },
                { text: "Several days", score: 1 },
                { text: "More than half the days", score: 2 },
                { text: "Nearly every day", score: 3 },
            ],
        },

        // --- ANXIETY (Adapted from GAD-7) ---
        {
            text: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
            category: DisorderType.ANXIETY_DISORDERS,
            weight: 2,
            options: [
                { text: "Not at all", score: 0 },
                { text: "Several days", score: 1 },
                { text: "More than half the days", score: 2 },
                { text: "Nearly every day", score: 3 },
            ],
        },
        {
            text: "Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?",
            category: DisorderType.ANXIETY_DISORDERS,
            weight: 2,
            options: [
                { text: "Not at all", score: 0 },
                { text: "Several days", score: 1 },
                { text: "More than half the days", score: 2 },
                { text: "Nearly every day", score: 3 },
            ],
        },
        {
            text: "How often have you had trouble relaxing?",
            category: DisorderType.ANXIETY_DISORDERS,
            weight: 1,
            options: [
                { text: "Not at all", score: 0 },
                { text: "Several days", score: 1 },
                { text: "More than half the days", score: 2 },
                { text: "Nearly every day", score: 3 },
            ],
        },

        // --- ADHD (Adapted from ASRS v1.1) ---
        {
            text: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
            category: DisorderType.NEURODEVELOPMENTAL,
            weight: 2,
            options: [
                { text: "Never", score: 0 },
                { text: "Rarely", score: 1 },
                { text: "Sometimes", score: 2 },
                { text: "Often", score: 3 },
                { text: "Very Often", score: 4 },
            ],
        },
        {
            text: "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
            category: DisorderType.NEURODEVELOPMENTAL,
            weight: 2,
            options: [
                { text: "Never", score: 0 },
                { text: "Rarely", score: 1 },
                { text: "Sometimes", score: 2 },
                { text: "Often", score: 3 },
                { text: "Very Often", score: 4 },
            ],
        },

        // --- PTSD (Trauma & Stressor) ---
        {
            text: "In the past month, have you had nightmares about a stressful experience from the past?",
            category: DisorderType.TRAUMA_AND_STRESSOR,
            weight: 3,
            options: [
                { text: "No", score: 0 },
                { text: "Yes", score: 5 }, // Binary high score
            ],
        },
        {
            text: "Do you avoid situations or people that remind you of a stressful experience from the past?",
            category: DisorderType.TRAUMA_AND_STRESSOR,
            weight: 3,
            options: [
                { text: "No", score: 0 },
                { text: "Yes", score: 5 },
            ],
        },

        // --- EATING DISORDERS (Adapted from SCOFF) ---
        {
            text: "Do you make yourself sick because you feel uncomfortably full?",
            category: DisorderType.EATING_DISORDERS,
            weight: 3,
            options: [
                { text: "No", score: 0 },
                { text: "Yes", score: 5 },
            ],
        },
        {
            text: "Do you worry you have lost control over how much you eat?",
            category: DisorderType.EATING_DISORDERS,
            weight: 3,
            options: [
                { text: "No", score: 0 },
                { text: "Yes", score: 5 },
            ],
        },

        // --- SUBSTANCE USE (Adapted from CAGE-AID) ---
        {
            text: "Have you ever felt you ought to cut down on your drinking or drug use?",
            category: DisorderType.SUBSTANCE_RELATED,
            weight: 3,
            options: [
                { text: "No", score: 0 },
                { text: "Yes", score: 5 },
            ],
        },
        {
            text: "Have people annoyed you by criticizing your drinking or drug use?",
            category: DisorderType.SUBSTANCE_RELATED,
            weight: 2,
            options: [
                { text: "No", score: 0 },
                { text: "Yes", score: 5 },
            ],
        }
    ]

    // 2. Loop through the data and insert into DB
    for (const q of questions) {
        await prisma.question.create({
            data: {
                questionText: q.text,
                category: q.category,
                weight: q.weight,
                options: {
                    create: q.options.map((opt) => ({
                        optionText: opt.text,
                        scoreValue: opt.score
                    }))
                }
            }
        })
    }

    console.log(`✅ Seeding finished. Created ${questions.length} questions.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
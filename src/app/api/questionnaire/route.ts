import { NextResponse } from 'next/server'
import { matchTherapist } from '../../../services/matching-service'

interface QuestionnaireBody {
    responses?: Record<string, string>
}

export async function POST(request: Request) {
    try {
        // 1. Parse the JSON body from the frontend
        // Expected format: { "responses": { "question_id_1": "option_id_A", ... } }
        const body = await request.json() as QuestionnaireBody
        const { responses } = body

        if (!responses || Object.keys(responses).length === 0) {
            return NextResponse.json(
                { error: "No responses provided" },
                { status: 400 }
            )
        }

        // 2. Run the Matching Engine
        const result = await matchTherapist(responses)

        // 3. Return the JSON result
        return NextResponse.json({
            success: true,
            data: result
        })

    } catch (error: any) {
        console.error("Matching Error:", error)
        return NextResponse.json(
            { success: false, error: error.message || "Internal Server Error" },
            { status: 500 }
        )
    }
}
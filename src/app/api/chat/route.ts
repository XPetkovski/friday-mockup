import { google } from '@ai-sdk/google';
import { streamText, StreamTextResult } from 'ai'; // Added StreamTextResult type

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Ensure this is not awaited here, but the result is captured
        const result = streamText({
            model: google('gemini-2.5-flash'),
            messages,
            system: "You are 'Friday', the AI Incident Response Assistant. Be concise and professional.",
        });

        // Use the official helper method
        return result.toUIMessageStreamResponse();

    } catch (error: unknown) {
        console.error("🔥 AI ROUTE ERROR:", error);
        const errorMessage = error instanceof Error ? error.message : "An error occurred";
        return new Response(
            JSON.stringify({ error: errorMessage }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
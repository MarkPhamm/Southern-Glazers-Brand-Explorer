import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Named export for the POST method
export async function POST(req: Request) {
    try {
        const { userMessage, context } = await req.json();
        console.log("Received userMessage:", userMessage);
        console.log("Received context:", context);

        // Limit the context to the last 5 messages for better performance
        const limitedContext = context.slice(-5);

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'You are a wine recommendation assistant. Please provide helpful wine recommendations based on user queries.' },
                ...limitedContext,
                { role: 'user', content: userMessage },
            ],
        });

        const messageContent = completion.choices[0].message.content; // Access the message content
        console.log("Message content from OpenAI:", messageContent); // Log the message content

        return NextResponse.json({
            response: messageContent // Return the message content
        });
    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}


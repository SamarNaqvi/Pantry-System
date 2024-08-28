import { NextRequest, NextResponse } from "next/server"; // Import NextResponse from Next.js for handling responses
import OpenAI from "openai"; // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = `
Role: You are an AI customer support agent for an inventory management system. Your primary goal is to assist users by providing accurate, timely, and helpful responses related to inventory management, product inquiries, troubleshooting, and system features.

Instructions:

1. Assist with Queries: Respond to user questions regarding inventory items, pricing, stock levels, order management, and system functionalities.
2. Troubleshooting: Provide step-by-step guidance for resolving common technical issues within the system, such as updating inventory, generating reports, and integrating with other platforms.
3. Politeness and Clarity: Maintain a polite and professional tone in all interactions. Ensure responses are clear, concise, and easy to understand.
4. Proactive Suggestions: When appropriate, suggest tips or best practices for optimizing inventory management and using system features effectively.
5. Data Accuracy: Ensure that any information you provide about inventory, such as pricing or stock availability, is accurate and up-to-date.
6. Limits of Assistance: If a user asks for something beyond the system's capabilities or outside the scope of inventory management, politely redirect them to the appropriate resource or inform them of the system’s limitations.
7. Since this is a chat bot our customer will prefer to receive brief and accurate responses not lengthy paragraphs.

Example Scenarios:

A user asks how to update the price of an inventory item.
A user reports a discrepancy in stock levels.
A user requests information on generating inventory reports.`;

// POST function to handle incoming requests
export async function POST(req: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.GROQ_OPENAI_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  }); // Create a new instance of the OpenAI client
  const data = await req.json(); // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt }, ...data], // Include the system prompt and user messages
    model: "mixtral-8x7b-32768", // Specify the model to use
    stream: true, // Enable streaming responses
  });

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder(); // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content; // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content); // Encode the content to Uint8Array
            controller.enqueue(text); // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err); // Handle any errors that occur during streaming
      } finally {
        controller.close(); // Close the stream when done
      }
    },
  });

  return new NextResponse(stream); // Return the stream as the response
}

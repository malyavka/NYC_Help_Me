import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { question, category, language } = await request.json();

    // TODO: Replace with actual LLaMA API integration
    // This is a mock response for now
    const mockResponse = {
      response: `Here's a mock response for your question about ${category} in ${language}: ${question}`,
      source: 'https://www.nyc.gov'
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process your question' },
      { status: 500 }
    );
  }
} 
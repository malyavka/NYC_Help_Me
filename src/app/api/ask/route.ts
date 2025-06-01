import { NextRequest, NextResponse } from 'next/server';
import { getPrompt } from './prompt';

export async function POST(req: NextRequest) {
  const { question, category, language } = await req.json();

  const llamaResponse = await fetch('https://api.llama.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-2-70b-chat',
      messages: [
        {
          role: 'system',
          content: 'You are a NYC employee, knowledgeable about the city and services it provvides.'
        },
        {
          role: 'user',
          content: getPrompt(question, category, language)
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
    })
  });

  const data = await llamaResponse.json();

  return NextResponse.json({
    response: data.choices?.[0]?.message?.content || 'No answer generated.'
  });
}

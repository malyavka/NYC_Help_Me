import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { question, category, language } = await req.json();

  const prompt = `As an AI assistant for NYC services, provide information about ${category}. 
    Question: ${question}
    Respond in ${language === 'EN' ? 'English' : language === 'ES' ? 'Spanish' : 'Russian'}. Provide only factual information, do not make anything up. If you don't know the answer, say so. 
    Don't be biased, be objective.`;

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
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      model_provider: 'llama-2-70b-chat-4096'
    })
  });

  const data = await llamaResponse.json();

  return NextResponse.json({
    response: data.choices?.[0]?.message?.content || 'No answer generated.'
  });
}

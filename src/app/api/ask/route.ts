import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { question, category, language } = await req.json();
  const apiKey = process.env.GROQ_API_KEY;

  const prompt = `As an AI assistant for NYC services, provide information about ${category}.
Question: ${question}
Respond in ${language === 'EN' ? 'English' : language === 'ES' ? 'Spanish' : 'Russian'}.`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a helpful assistant for NYC services." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      return NextResponse.json({ error: "Invalid response from Groq API" }, { status: 500 });
    }

    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json(
      { error: 'Groq API failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

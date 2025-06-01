const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });
const app = express();
const PORT = process.env.PORT || 3001;

const apiKey = process.env.LLAMA_API_KEY;
const apiUrl = process.env.LLAMA_API_URL;
const model = process.env.LLAMA_MODEL || 'meta-llama/Llama-2-7b-chat-hf';

console.log('API config:', { 
  apiKey: apiKey ? 'Set' : 'Not Set', 
  apiUrl: apiUrl || 'Not Set',
  model: model,
  envKeys: Object.keys(process.env).filter(key => key.startsWith('LLAMA_'))
});

app.use(cors());
app.use(express.json());

app.post('/api/ask', async (req, res) => {
  const { question, category, language } = req.body;
  const langName = language === 'EN' ? 'English' : language === 'ES' ? 'Spanish' : 'Russian';

  console.log('Making API call with:', {
    url: apiUrl,
    headers: {
      'Authorization': `Bearer ${apiKey ? 'Set' : 'Not Set'}`,
      'Content-Type': 'application/json'
    },
    body: {
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant providing information about NYC services.'
        },
        {
          role: 'user',
          content: `As an AI assistant for NYC services, please provide information about ${category} services. 
Question: ${question}
Please respond in ${langName}.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      stream: false
    }
  });

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant providing information about NYC services.'
          },
          {
            role: 'user',
            content: `As an AI assistant for NYC services, please provide information about ${category} services. 
Question: ${question}
Please respond in ${langName}.`
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
        stream: false
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errText
      });
      return res.status(500).json({ error: 'LLaMA API failed', details: errText });
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "No answer generated.";

    res.status(200).json({ response: aiResponse, source: "https://www.nyc.gov" });
  } catch (error) {
    console.error('Request failed:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
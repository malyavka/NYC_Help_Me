const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/api/ask', async (req, res) => {
  const { question, category, language } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  const prompt = `As an AI assistant for NYC services, provide information about ${category}.
Question: ${question}
Respond in ${language === 'EN' ? 'English' : language === 'ES' ? 'Spanish' : 'Russian'}.`;

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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

    const data = await groqRes.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      return res.status(500).json({ error: "Invalid response from Groq API" });
    }

    res.json({ response: data.choices[0].message.content });

  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'Groq API failed', details: error.message });
  }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

// Export the Express API
module.exports = app;
'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';

type Category = 'Food' | 'Housing' | 'Legal' | 'Healthcare' | 'Free Resources';
type Language = 'EN' | 'ES' | 'RU';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState<Category>('Food');
  const [language, setLanguage] = useState<Language>('EN');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/api/ask'  // Use relative URL in production
        : 'http://localhost:3001/api/ask';  // Use full URL in development

      const result = await axios.post(apiUrl, {
        question,
        category,
        language,
      });
      setResponse(result.data.response);
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof AxiosError) {
        setResponse(error.response?.data?.error || 'Sorry, there was an error processing your question. Please try again.');
      } else {
        setResponse('Sorry, there was an error processing your question. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Ask your question about NYC services
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="w-full p-2 border rounded-lg min-h-[100px]"
            required
          />
        </div>

        <div className="flex gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="flex-1 p-2 border rounded-lg appearance-none bg-white text-center"
          >
            <option value="Food">Food</option>
            <option value="Housing">Housing</option>
            <option value="Legal">Legal</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Free Resources">Free Resources</option>
          </select>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="flex-1 p-2 border rounded-lg appearance-none bg-white text-center"
          >
            <option value="EN">EN</option>
            <option value="ES">ES</option>
            <option value="RU">RU</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Processing...' : 'Ask AI'}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-start">
          <div className="flex-shrink-0 mr-3">
            {/* Placeholder Assistant Icon (replace with your image or SVG) */}
            <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Response:</h2>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        </div>
      )}

      <footer className="mt-8 text-center text-sm text-gray-600">
        <p>This is an AI-powered service. Responses may not always be accurate.</p>
        <a
          href="https://github.com/malyavka/NYC_Help_Me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          View on GitHub
        </a>
      </footer>
    </main>
  );
} 
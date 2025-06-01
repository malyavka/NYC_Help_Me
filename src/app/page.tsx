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
        ? '/api/ask'
        : 'http://localhost:3001/api/ask';

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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Ask your question about NYC services
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] resize-none"
            required
          />
        </div>

        <div className="flex gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-center"
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
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-center"
          >
            <option value="EN">EN</option>
            <option value="ES">ES</option>
            <option value="RU">RU</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-4 rounded-lg shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Processing...' : 'Ask AI'}
        </button>
      </form>

      {response && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Response:</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-12 text-center text-sm text-gray-600">
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
    </div>
  );
} 
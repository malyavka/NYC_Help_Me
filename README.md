# NYC Help Me

A web application that helps NYC residents get answers to their questions about city services using AI. Built for the Llama hackathon.

## About

This project was created as part of the Llama hackathon, demonstrating the use of Llama 3 model through Groq's API to provide helpful information about NYC services to residents in multiple languages.

## Features

- Ask questions about NYC services in multiple categories (Food, Housing, Legal, Healthcare)
- Support for multiple languages (English, Spanish, Russian)
- Clean, mobile-first interface
- AI-powered responses with source links

## Tech Stack

- Frontend: Next.js 14 with TypeScript
- Backend: Express.js server
- Styling: Tailwind CSS
- AI: Groq API with Llama 3 model

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Groq API key

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nyc-help-me.git
cd nyc-help-me
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
GROQ_API_KEY=your_groq_api_key_here
```

4. Start the backend server:
```bash
node src/server/server.js
```
The backend server will run on http://localhost:3001

5. In a new terminal, start the frontend development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js frontend
│   ├── api/
│   │   └── ask/
│   │       └── route.ts    # API endpoint for questions
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── server/                # Express backend
│   └── server.js         # Backend server implementation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
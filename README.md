# NYC Help Me

A web application that helps NYC residents get answers to their questions about city services using AI.

## Features

- Ask questions about NYC services in multiple categories (Food, Housing, Legal, Healthcare)
- Support for multiple languages (English, Spanish, Russian)
- Clean, mobile-first interface
- AI-powered responses with source links

## Tech Stack

- Frontend: Next.js 14 with TypeScript
- Styling: Tailwind CSS
- API: Next.js API Routes
- AI: LLaMA API (to be integrated)

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

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── ask/
│   │       └── route.ts    # API endpoint for questions
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx           # Main page component
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   └── lib/                  # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
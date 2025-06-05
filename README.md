# AI Essay Scorer

AI Essay Scorer is a web application that uses the OpenAI GPT-4 API to evaluate college admissions essays across five core dimensions: structure, clarity, creativity, tone, and overall quality.

The application provides instant, actionable feedback to students looking to improve their college essays, simulating the perspective of a real admissions officer.

## Features

- Scoring on five criteria: structure, clarity, creativity, tone, overall
- GPT-4 powered analysis and personalized feedback
- Fast and responsive interface using Next.js 14 and Tailwind CSS
- App Router API architecture with secure server-side integration
- No client-side exposure of sensitive keys or logic

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- OpenAI GPT-4 API
- Vercel 

## Getting Started

To run the project locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:3000` to use the application.

## Project Structure

- `src/app/page.tsx` – Frontend UI with essay input and score display
- `src/app/api/score/route.ts` – API route that securely sends essay content to GPT-4 and parses the JSON response
- `.env.local` – Environment variable file to store your OpenAI API key (not committed to Git)

## Why This Project

This project was built to solve a real problem: college applicants often lack timely, high-quality feedback on their essays. By combining AI with modern web technologies, this tool helps students iterate faster and improve their writing quality without needing human reviewers.

It also serves as a technically meaningful project demonstrating API integration, full-stack architecture, secure credential handling, and clean UI design.

## Future Work

- User authentication and saved essay history
- Stripe integration for premium essay reviews
- Region-specific admissions insights
- Essay comparison to accepted applicants

## Author

Toby Thurston  
[https://github.com/TobyKThurston](https://github.com/TobyKThurston)


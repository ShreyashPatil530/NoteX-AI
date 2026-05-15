# NoteX AI - AI-Powered Collaborative Notes Workspace

NoteX AI is a premium, production-ready full-stack application designed for modern note-taking. It features deep AI integration, glassmorphism UI, and real-time collaboration tools.

## 🚀 Features

- **Secure Authentication**: JWT-based auth with secure HTTP-only cookies.
- **AI Insights**: Automatically generate summaries, action items, and suggested titles using OpenRouter (GPT/Claude).
- **Glassmorphism UI**: A stunning, premium dark-mode interface built with Tailwind CSS and Framer Motion.
- **Note Management**: Create, edit, tag, and organize notes with ease.
- **Search & Filter**: Find your thoughts instantly with keyword search and tag filtering.
- **Public Sharing**: Share your notes with anyone via a unique public link.
- **Productivity Dashboard**: Track your note-taking habits and AI usage.

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Next.js API Routes
- **Database**: MongoDB (Mongoose)
- **AI**: OpenRouter API
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- MongoDB instance (Cloud or Local)
- OpenRouter API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ShreyashPatil530/NoteX-AI.git
   cd NoteX-AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Copy `.env.example` to `.env` and fill in your credentials.
   ```bash
   cp .env.example .env
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Environment Variables

- `MONGODB_URI`: Your MongoDB connection string.
- `JWT_SECRET`: A secret key for signing JWT tokens.
- `OPENROUTER_API_KEY`: Your OpenRouter API key.
- `NEXT_PUBLIC_APP_URL`: Your application URL (default: http://localhost:3000).

## 🧑🎨 Design System

- **Primary**: #7C3AED (Purple)
- **Secondary**: #22D3EE (Cyan)
- **Background**: #0B0F19 (Deep Navy)
- **Radius**: 16px - 24px

---

Built with ❤️ by Antigravity AI

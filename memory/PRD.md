# Prompt Box - Product Requirements Document

## Overview
Prompt Box is an interactive web application featuring a library of copyable AI prompts organized by category and an AI-powered chatbot called "Box Bot" that generates custom prompts.

## Original Problem Statement
Create an interactive web app named "Prompt Box" with:
- A library of copy-able prompts organized by category
- An AI-powered chatbot called "Box Bot" to generate custom prompts
- Authentication system with login/signup on same page
- Kid-friendly, interactive design with smooth scrolling

## Tech Stack
- **Frontend**: React, React Router, TailwindCSS, Lucide React icons
- **Backend**: FastAPI, MongoDB (motor async driver)
- **Authentication**: Emergent Auth (Google OAuth)
- **AI**: GPT-4o via emergentintegrations library

## Core Features

### ✅ Implemented
1. **Homepage with Prompt Library**
   - Hero section with animated stats (150+ prompts, 10 categories)
   - Browse Prompts section with expand/collapse controls
   - Categories closed by default
   - 10 categories, each with 15 unique prompts
   - Copy button on every prompt
   - "Why Choose" features section
   - Box Bot CTA section

2. **Category System**
   - Homework Helper, Creative Writing, Gaming & Fun
   - Science Explorer, Art & Drawing, Coding Adventures
   - Math Magic, Reading & Books, Learn Languages, Health & Fitness
   - Each category has 15 unique, copyable prompts
   - Dark themed cards with gradient icons

3. **Box Bot AI Chatbot**
   - GPT-4o powered prompt generation
   - Quick start prompts for common topics
   - Auto-copy button on AI responses
   - Session-based conversation history

4. **Authentication System**
   - Google OAuth via Emergent Auth
   - Login/Signup on same page with tab switcher
   - Session persistence with localStorage
   - Protected API endpoints

5. **UI/UX Design**
   - Dark theme with purple/pink gradients
   - Inter font family (system fonts)
   - Smooth scrolling with enhanced scrollbar
   - Floating particle animations
   - Interactive hover effects
   - Mobile responsive design

## API Endpoints

### Public Endpoints
- `GET /api/prompts/all` - All categories with prompts
- `GET /api/prompts/categories` - Category list
- `GET /api/prompts/category/{id}` - Specific category prompts
- `GET /api/health` - Health check

### Protected Endpoints (require auth)
- `POST /api/auth/session` - Exchange OAuth session_id for token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `POST /api/chat/message` - Box Bot chat
- `GET /api/chat/history/{session_id}` - Chat history
- `POST /api/favorites` - Add favorite prompt
- `DELETE /api/favorites/{prompt_id}` - Remove favorite
- `GET /api/favorites` - Get user favorites

## File Structure
```
/app
├── backend/
│   ├── .env (MONGO_URL, EMERGENT_LLM_KEY)
│   ├── requirements.txt
│   └── server.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Header.jsx
│   │   ├── pages/
│   │   │   ├── AuthPage.jsx
│   │   │   ├── ChatbotPage.jsx
│   │   │   └── HomePage.jsx
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
└── memory/
    └── PRD.md
```

## Database Schema
- **users**: user_id, email, name, picture, created_at
- **user_sessions**: user_id, session_token, expires_at, created_at
- **chat_messages**: user_id, session_id, role, content, created_at
- **favorites**: user_id, prompt_id, category, created_at

## Completed Work - December 2025

### Session 1
- Full-stack scaffolding (React + FastAPI + MongoDB)
- Backend with Emergent Auth integration
- GPT-4o chatbot endpoint
- Initial dark theme UI

### Session 2 (Current)
- Restored Inter font (removed Orbitron)
- Enhanced smooth scrolling with custom scrollbar
- Categories closed by default
- All 10 categories with 15 prompts each connected to backend
- Copy functionality on all prompts
- Auto-copy on Box Bot responses
- Login/Signup on same page working
- Dark themed category cards

## Future Enhancements
- [ ] Favorite prompts feature (UI)
- [ ] User prompt collections
- [ ] Prompt rating/voting system
- [ ] Custom prompt creation
- [ ] Share prompts functionality
- [ ] Advanced search/filter prompts

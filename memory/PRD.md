# PromptBox - AI Prompt Library PRD

## Original Problem Statement
Create a modern, premium, 3D-style website for an "AI Prompt Library" startup with:
- Dark mode futuristic AI aesthetic
- Browse and copy AI prompts across 5 categories
- Backend authorization system (Emergent Auth)
- AI chatbot "Box Bot" for custom prompt generation (OpenAI GPT-4o)
- Glassmorphism, 3D effects, smooth interactions

## User Personas
- **Students**: Need proven prompts for essays, research, studying
- **Content Creators**: Need social media hooks, content ideas
- **Business Professionals**: Need email campaigns, marketing copy
- **Developers**: Need debugging help, code explanations
- **General Users**: Need productivity and life optimization prompts

## Core Architecture

### Tech Stack
- **Frontend**: React, TailwindCSS, shadcn/ui components
- **Backend**: FastAPI, MongoDB
- **Auth**: Emergent Managed Authentication (Google OAuth)
- **AI**: OpenAI GPT-4o via Emergent LLM key

### Design System (Green Dark Theme)
- **Colors**: Black background (#000000), Cyan-green accent (#00FFD1)
- **Typography**: Inter font, large headlines (66px), high contrast
- **Components**: Sharp corners (0px border-radius), glassmorphism
- **Interactions**: Hover lifts, smooth transitions (0.4s ease-in-out)

## What's Been Implemented (Phase 1 - Frontend with Mock Data)
**Date**: December 2025

### ✅ Completed Features

1. **Homepage**
   - Hero section with floating prompt cards (CSS 3D effects)
   - 5 category cards (Student, Creator, Business, Productivity, Coding)
   - 6 featured prompt cards with copy functionality
   - Features section (6 benefits)
   - "How It Works" 3-step guide
   - CTA section
   - Footer with links

2. **Chatbot Page (Box Bot UI)**
   - Chat interface with message history
   - User/assistant message bubbles
   - Input textarea with send button
   - Mock responses (not connected to API yet)
   - Loading state with spinner

3. **Login Page**
   - Google OAuth integration UI
   - Redirect setup for Emergent Auth

4. **Components**
   - Header with navigation (Prompts, Box Bot, Sign In)
   - PromptCard component with copy button
   - CategoryCard with hover effects

5. **Mock Data**
   - 5 prompt categories
   - 6 sample prompts across categories
   - Features and benefits list

### Design Quality
- ✅ Dark theme (#000000 background, #00FFD1 accent)
- ✅ Sharp corners (0px border-radius)
- ✅ Proper contrast (white text on dark backgrounds)
- ✅ Hover effects with transforms
- ✅ Responsive grid layouts
- ✅ Clean typography hierarchy

## Prioritized Backlog

### P0 - Phase 2: Backend Development & Integration

#### Authentication System
- [ ] Implement Emergent Auth backend endpoints
  - `/api/auth/session` - Exchange session_id for session_token
  - `/api/auth/me` - Get current user
  - `/api/auth/logout` - Clear session
- [ ] Create MongoDB collections:
  - `users` (user_id, email, name, picture, created_at)
  - `user_sessions` (user_id, session_token, expires_at, created_at)
- [ ] Implement AuthCallback component for OAuth redirect handling
- [ ] Protected routes for chatbot (require login)

#### Box Bot AI Integration
- [ ] Install emergentintegrations library
- [ ] Add EMERGENT_LLM_KEY to backend .env
- [ ] Create `/api/chat/message` endpoint
  - Accept user message and session_id
  - Call OpenAI GPT-4o via LlmChat
  - System prompt: "You are Box Bot, an expert AI prompt generator..."
  - Return generated custom prompt
- [ ] Create MongoDB collection:
  - `chat_messages` (user_id, session_id, role, content, created_at)
- [ ] Update ChatbotPage to call real API
- [ ] Implement streaming responses (optional enhancement)

#### Prompt Management
- [ ] Create MongoDB collection:
  - `prompts` (prompt_id, title, category, description, prompt_text, example, tags, created_at)
- [ ] Seed database with mock prompt data
- [ ] Create API endpoints:
  - `GET /api/prompts` - Get all prompts
  - `GET /api/prompts/:id` - Get single prompt
  - `GET /api/prompts/category/:category` - Filter by category
- [ ] Replace frontend mock data with API calls

### P1 - User Features

#### Favorites System
- [ ] Create MongoDB collection:
  - `user_favorites` (user_id, prompt_id, created_at)
- [ ] Add favorite button to PromptCard
- [ ] Create endpoints:
  - `POST /api/favorites` - Add favorite
  - `DELETE /api/favorites/:prompt_id` - Remove favorite
  - `GET /api/favorites` - Get user's favorites
- [ ] Create "My Favorites" page

#### Save Custom Prompts
- [ ] Create MongoDB collection:
  - `user_prompts` (user_id, title, prompt_text, created_by_bot, created_at)
- [ ] Add "Save" button in chatbot after generation
- [ ] Create endpoints:
  - `POST /api/user-prompts` - Save custom prompt
  - `GET /api/user-prompts` - Get user's saved prompts
  - `DELETE /api/user-prompts/:id` - Delete saved prompt
- [ ] Create "My Prompts" page

#### Search & Filter
- [ ] Add search bar in header
- [ ] Implement frontend search filtering
- [ ] Add category filter dropdown
- [ ] Add tag-based filtering

### P2 - Enhancement Features

#### Advanced Prompt Features
- [ ] Prompt rating system (upvote/downvote)
- [ ] Usage counter (track how many times copied)
- [ ] "Recently Used" prompts section
- [ ] Prompt templates with placeholders

#### Box Bot Enhancements
- [ ] Multi-turn conversation with context
- [ ] Regenerate prompt option
- [ ] Export chat history
- [ ] Prompt refinement (iterate on generated prompts)

#### Admin Features
- [ ] Admin dashboard for prompt management
- [ ] Add/edit/delete prompts via UI
- [ ] User analytics (most popular prompts, categories)
- [ ] Content moderation for user-generated prompts

#### UI Enhancements
- [ ] Add Spline 3D animation to hero section (optional)
- [ ] Dark/light mode toggle
- [ ] Keyboard shortcuts (Cmd+K for search)
- [ ] Prompt preview modal
- [ ] Copy success toast notifications

## Next Tasks (Immediate)
1. ✅ Complete frontend with mock data
2. ✅ Verify design matches requirements (screenshots)
3. ✅ Create PRD.md with API contracts
4. Build backend authentication system
5. Integrate OpenAI GPT-4o for Box Bot
6. Connect frontend to backend APIs
7. Test end-to-end with testing agent

## API Contracts (To Be Implemented)

### Authentication
```
POST /api/auth/session
Headers: X-Session-ID: <session_id>
Response: { user_id, email, name, picture, session_token }

GET /api/auth/me
Headers: Cookie: session_token=<token>
Response: { user_id, email, name, picture }

POST /api/auth/logout
Headers: Cookie: session_token=<token>
Response: { message: "Logged out" }
```

### Prompts
```
GET /api/prompts
Response: [{ prompt_id, title, category, description, prompt_text, example, tags }]

GET /api/prompts/category/:category
Response: [{ prompt_id, title, description, ... }]
```

### Chat
```
POST /api/chat/message
Body: { message: string, session_id: string }
Headers: Cookie: session_token=<token>
Response: { reply: string, session_id: string }

GET /api/chat/history/:session_id
Headers: Cookie: session_token=<token>
Response: [{ role: 'user'|'assistant', content: string, created_at: timestamp }]
```

### Favorites
```
POST /api/favorites
Body: { prompt_id: string }
Headers: Cookie: session_token=<token>
Response: { success: true }

GET /api/favorites
Headers: Cookie: session_token=<token>
Response: [{ prompt_id, title, category, ... }]
```

## Notes
- Using mock data in frontend for Phase 1 (quick "aha" moment)
- Auth and AI chatbot integrations planned for Phase 2
- Design follows green-dark-theme guidelines strictly
- All mock data located in `/app/frontend/src/data/mockPrompts.js`

# Prompt Box - Kid-Friendly AI Prompt Library PRD

## Original Problem Statement
Create a modern, premium, kid-friendly website for an "AI Prompt Library" with:
- Dark theme but NOT pure black (dark navy/purple)
- More interactive and playful design
- 10 categories instead of 5
- Box Bot AI section below categories
- Enhanced AI prompt generation
- Combined login/signup page
- Company name: "Prompt Box" (with space)
- Logo integration

## Design Changes (Phase 2 Update)

### ✅ Kid-Friendly Design Complete
- **Colors**: Dark navy (#1a1a2e) background, purple gradient accent (#8a63ff)
- **Rounded Corners**: 16-24px border-radius for all interactive elements
- **Playful Elements**: Emojis, bouncing animations, colorful gradients
- **Typography**: Friendly, bold fonts with emoji accents
- **Interactive**: Hover effects with scale and lift animations

### ✅ Expanded Categories (10 Total)
1. Homework Helper 📚
2. Creative Writing ✍️
3. Gaming & Fun 🎮
4. Science Explorer 🔬
5. Art & Drawing 🎨
6. Coding Adventures 💻
7. Math Magic 🔢
8. Reading & Books 📖
9. Learn Languages 🌍
10. Health & Fitness 💪

### ✅ Enhanced Box Bot AI
- **Smarter Prompts**: Context-aware prompt generation based on keywords
- **6 Quick Start Options**: Homework, Essay, Creative, Science, Math, Coding
- **Detailed Responses**: Step-by-step AI prompts with customization tips
- **Kid-Friendly UI**: Large icons, colorful buttons, clear instructions
- **Better UX**: Quick prompts buttons, enhanced placeholder text

### ✅ Combined Auth Page
- Tab switcher (Sign In / Sign Up)
- Single Google OAuth flow for both
- Benefits showcase for signup
- Decorative gradient backgrounds
- Mobile responsive

### ✅ Page Structure Changes
1. Hero section (top)
2. Categories section (below hero)
3. **Box Bot AI section** (below categories) ← New placement
4. Featured Prompts
5. CTA section
6. Footer

## Tech Stack
- **Frontend**: React, TailwindCSS, shadcn/ui components
- **Backend**: FastAPI, MongoDB (to be implemented)
- **Auth**: Emergent Managed Authentication
- **AI**: OpenAI GPT-4o via Emergent LLM key (to be implemented)

## What's Been Implemented

### Phase 1 (Initial Build)
✅ Basic dark theme with sharp corners
✅ 5 categories
✅ Hero section with floating cards
✅ Featured prompts with copy functionality
✅ Basic chatbot UI

### Phase 2 (Kid-Friendly Redesign - Complete)
**Date**: December 2025

✅ **Design System Overhaul**
   - Dark navy/purple theme (#1a1a2e, #8a63ff)
   - Rounded corners (16-24px)
   - Playful animations (bounce, float, scale)
   - Colorful gradients for categories
   - Interactive hover effects

✅ **10 Categories with Gradients**
   - Each category has unique gradient background
   - Emojis for visual appeal
   - Rounded cards with hover effects
   - Decorative background patterns

✅ **Box Bot AI Enhancement**
   - Context-aware prompt generation
   - 6 quick start buttons
   - Enhanced response templates:
     * Homework helper prompts
     * Essay writing prompts
     * Creative writing prompts
     * Science explorer prompts
     * Math helper prompts
     * Coding helper prompts
   - Step-by-step instructions in responses
   - Pro tips included
   - Kid-friendly explanations

✅ **Combined Auth Page**
   - Sign In / Sign Up tabs
   - Google OAuth integration
   - Benefits showcase
   - Playful design with decorative elements
   - Mobile responsive

✅ **Logo Integration**
   - Brand logo in header
   - Gradient text for "Prompt Box"
   - Consistent branding

✅ **Improved Homepage Structure**
   - Reordered sections (Categories → Box Bot → Prompts)
   - Playful copy and emojis throughout
   - Gradient text for headings
   - Decorative background patterns

## Enhanced Box Bot Prompt Templates

### Homework Helper
```
"I need help with [SUBJECT] homework. I'm in [GRADE] grade. Please:
1. Explain the concept in simple terms
2. Show me step-by-step examples
3. Give me practice questions
4. Check my understanding

Make it fun and easy to understand! Use examples from everyday life."
```

### Essay Writer
```
"Help me write an essay about [TOPIC]. I'm in [GRADE] grade. Please:
1. Create an interesting introduction with a hook
2. Suggest 3 main points with supporting details
3. Help me write a strong conclusion
4. Use simple, clear language
5. Make it [LENGTH] words

Include fun facts and examples to make it engaging!"
```

### Creative Writing
```
"I want to write a creative [STORY TYPE] about [TOPIC]. Help me by:
1. Creating interesting characters
2. Developing an exciting plot
3. Suggesting cool settings
4. Adding descriptive words
5. Making it engaging for [AGE] year olds

Make it fun, imaginative, and easy to follow!"
```

### Science Explorer
```
"Explain [SCIENCE TOPIC] to me like I'm [AGE] years old. Please:
1. Use simple, everyday examples
2. Show me cool experiments I can try
3. Explain why it's important
4. Add fun facts
5. Use analogies I can understand

Make science exciting and easy to understand!"
```

### Math Helper
```
"I'm learning about [MATH TOPIC] in [GRADE] grade. Please:
1. Explain it using real-life examples
2. Show me the steps clearly
3. Give me practice problems (easy to hard)
4. Teach me tricks to remember
5. Make it fun and visual

Help me understand WHY we use this in real life!"
```

### Coding Helper
```
"I want to learn [CODING CONCEPT] using [LANGUAGE]. I'm a [SKILL LEVEL] coder. Please:
1. Explain it in simple terms
2. Show me a fun example project
3. Break down the code step-by-step
4. Point out common mistakes
5. Give me challenges to practice

Make coding fun and easy to understand!"
```

## Prioritized Backlog

### P0 - Phase 3: Backend Development

#### Authentication System
- [ ] Implement Emergent Auth backend endpoints
- [ ] Create MongoDB collections for users and sessions
- [ ] Implement AuthCallback component
- [ ] Protected routes for chatbot

#### Box Bot AI Integration
- [ ] Install emergentintegrations library
- [ ] Add EMERGENT_LLM_KEY to backend .env
- [ ] Create `/api/chat/message` endpoint with enhanced prompt system
- [ ] System prompt optimized for kid-friendly responses
- [ ] Store chat history in MongoDB
- [ ] Connect frontend to real API

#### Prompt Management
- [ ] Create MongoDB prompts collection
- [ ] Seed with 50+ prompts across 10 categories
- [ ] API endpoints for browsing/filtering prompts
- [ ] Replace frontend mock data

### P1 - User Features

- [ ] Favorites system
- [ ] Save custom Box Bot prompts
- [ ] Search & filter prompts
- [ ] User profile page
- [ ] Prompt usage analytics

### P2 - Enhancement Features

- [ ] Prompt rating system
- [ ] Social sharing
- [ ] Spline 3D animation in hero
- [ ] Dark/light mode toggle
- [ ] Keyboard shortcuts
- [ ] Copy success animations
- [ ] Achievement badges for kids

## Next Tasks (Immediate)
1. ✅ Complete kid-friendly frontend redesign
2. ✅ Expand to 10 categories
3. ✅ Enhance Box Bot AI prompting
4. ✅ Create combined auth page
5. ✅ Add logo and branding
6. Build backend authentication
7. Integrate real OpenAI GPT-4o API
8. Test end-to-end with testing agent

## Design Quality Checklist
✅ Dark navy theme (not pure black)
✅ Rounded corners (16-24px)
✅ Playful animations
✅ Colorful gradients
✅ Kid-friendly emojis
✅ Interactive hover effects
✅ Clear, friendly copy
✅ Mobile responsive
✅ Logo integration
✅ Consistent branding

## API Contracts (To Be Implemented)
Same as before, plus:

### Enhanced Chat Endpoint
```
POST /api/chat/message
Body: { message: string, session_id: string }
Response: {
  reply: string (enhanced prompt with context awareness),
  session_id: string,
  prompt_type: 'homework' | 'essay' | 'creative' | 'science' | 'math' | 'coding'
}
```

## Notes
- Frontend completely redesigned for kid-friendly experience
- Box Bot AI now generates context-aware, educational prompts
- 10 categories with unique gradients and emojis
- Combined auth page with tab switcher
- All elements rounded and playful
- Ready for backend integration

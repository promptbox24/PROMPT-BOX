# 🚀 Prompt Box Backend Management Guide

## 📍 Backend Location & Structure

### Main Server File
**Location**: `/app/backend/server.py`

This is your complete backend server with:
- ✅ Emergent Authentication (Google OAuth)
- ✅ GPT-4o AI Integration (Box Bot)
- ✅ MongoDB Database
- ✅ User Management
- ✅ Chat History
- ✅ Favorites System

---

## 🔑 Environment Variables

**Location**: `/app/backend/.env`

```bash
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
EMERGENT_LLM_KEY=sk-emergent-6865bC786F5C1E2354
```

**To Update:**
```bash
nano /app/backend/.env
# Edit values
# Save: Ctrl+X, Y, Enter
sudo supervisorctl restart backend
```

---

## 🗄️ Database Management

### MongoDB Collections

**Location**: MongoDB at `localhost:27017`
**Database Name**: `test_database`

**Collections Created Automatically:**
1. `users` - User profiles
2. `user_sessions` - Login sessions
3. `chat_messages` - Box Bot conversations
4. `favorites` - Saved prompts

### View Database
```bash
# Connect to MongoDB
mongosh

# Switch to database
use test_database

# View collections
show collections

# View users
db.users.find().pretty()

# View chat messages
db.chat_messages.find().pretty()

# Count documents
db.users.countDocuments()
db.chat_messages.countDocuments()

# Clear a collection
db.chat_messages.deleteMany({})
```

---

## 🔧 Server Management

### Start/Stop/Restart Backend
```bash
# Restart backend
sudo supervisorctl restart backend

# Stop backend
sudo supervisorctl stop backend

# Start backend
sudo supervisorctl start backend

# Check status
sudo supervisorctl status backend

# View all services
sudo supervisorctl status
```

### Check Backend Logs
```bash
# Real-time logs
tail -f /var/log/supervisor/backend.out.log

# Error logs
tail -f /var/log/supervisor/backend.err.log

# Last 50 lines
tail -n 50 /var/log/supervisor/backend.out.log

# Search logs for errors
grep ERROR /var/log/supervisor/backend.out.log
```

---

## 🌐 API Endpoints

### Base URL
`https://prompt-box-1.preview.emergentagent.com/api`

### Authentication Endpoints

**1. Create Session (Login)**
```bash
POST /api/auth/session
Body: { "session_id": "from_oauth_redirect" }
Response: { user_id, email, name, picture, session_token }
```

**2. Get Current User**
```bash
GET /api/auth/me
Headers: Cookie: session_token=<token>
Response: { user_id, email, name, picture }
```

**3. Logout**
```bash
POST /api/auth/logout
Headers: Cookie: session_token=<token>
Response: { message: "Logged out successfully" }
```

### Box Bot AI Endpoints

**1. Send Message to Box Bot**
```bash
POST /api/chat/message
Headers: Cookie: session_token=<token>
Body: {
  "message": "Help me with math homework",
  "session_id": "optional_session_id"
}
Response: {
  "reply": "Here's your custom prompt...",
  "session_id": "session_xyz"
}
```

**2. Get Chat History**
```bash
GET /api/chat/history/{session_id}
Headers: Cookie: session_token=<token>
Response: [
  { role: "user", content: "...", created_at: "..." },
  { role: "assistant", content: "...", created_at: "..." }
]
```

### Favorites Endpoints

**1. Add to Favorites**
```bash
POST /api/favorites?prompt_id=hw1&category=homework
Headers: Cookie: session_token=<token>
Response: { message: "Added to favorites" }
```

**2. Remove from Favorites**
```bash
DELETE /api/favorites/{prompt_id}
Headers: Cookie: session_token=<token>
Response: { message: "Removed from favorites" }
```

**3. Get All Favorites**
```bash
GET /api/favorites
Headers: Cookie: session_token=<token>
Response: [
  { user_id, prompt_id, category, created_at }
]
```

---

## 🤖 Box Bot AI Configuration

### Current Model
- **Model**: GPT-4o (OpenAI's latest)
- **Provider**: OpenAI via Emergent LLM Key
- **System Prompt**: Educational, structured prompt generator

### Improve Box Bot Intelligence

**Edit System Prompt in `/app/backend/server.py`:**

Find `BOXBOT_SYSTEM_PROMPT` (around line 137) and modify:

```python
BOXBOT_SYSTEM_PROMPT = """You are Box Bot, an expert AI prompt engineer...
[Your custom instructions here]
"""
```

After editing:
```bash
sudo supervisorctl restart backend
```

### Switch AI Model

```python
# In server.py, around line 186
chat.with_model("openai", "gpt-4o")  # Current

# Options:
chat.with_model("openai", "gpt-4o-mini")  # Faster, cheaper
chat.with_model("anthropic", "claude-sonnet-4")  # Claude
chat.with_model("google", "gemini-2.5-flash")  # Gemini
```

---

## 📦 Install New Python Packages

```bash
cd /app/backend

# Install package
pip install package-name

# Update requirements.txt
pip freeze > requirements.txt

# Restart backend
sudo supervisorctl restart backend
```

---

## 🔍 Testing API Endpoints

### Test Health Check
```bash
curl https://prompt-box-1.preview.emergentagent.com/api/health
```

### Test Authentication
```bash
# This requires actual OAuth flow from frontend
# Check /app/frontend/src/pages/AuthPage.jsx for implementation
```

### Test Box Bot (with auth token)
```bash
curl -X POST https://prompt-box-1.preview.emergentagent.com/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Cookie: session_token=YOUR_SESSION_TOKEN" \
  -d '{"message": "Help me with essay writing"}'
```

---

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check error logs
tail -n 100 /var/log/supervisor/backend.err.log

# Common issues:
# 1. Import error → pip install missing-package
# 2. Port conflict → Check if port 8001 is in use
# 3. Syntax error → Check server.py for Python errors
```

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
sudo systemctl status mongodb

# Start MongoDB
sudo systemctl start mongodb

# Check connection
mongosh --eval "db.adminCommand('ping')"
```

### API Returns 500 Error
```bash
# Check backend logs
tail -f /var/log/supervisor/backend.out.log

# Test specific endpoint
curl -v https://prompt-box-1.preview.emergentagent.com/api/
```

---

## 📝 Adding New API Endpoints

### Example: Add "Prompt of the Day" Feature

**1. Add to server.py:**
```python
@api_router.get("/prompt-of-day")
async def get_prompt_of_day():
    """Get daily featured prompt"""
    # Your logic here
    return {"prompt": "...", "category": "..."}
```

**2. Restart backend:**
```bash
sudo supervisorctl restart backend
```

**3. Test:**
```bash
curl https://prompt-box-1.preview.emergentagent.com/api/prompt-of-day
```

---

## 🔐 Security Best Practices

1. **Never expose EMERGENT_LLM_KEY** in frontend code
2. **Always use HTTPS** (already configured)
3. **Validate user input** in all endpoints
4. **Use proper authentication** (already implemented)
5. **Rate limiting** - Add if needed:
   ```python
   from slowapi import Limiter
   limiter = Limiter(key_func=get_remote_address)
   ```

---

## 📊 Monitoring & Analytics

### Check Active Users
```bash
mongosh
use test_database
db.users.countDocuments()
db.user_sessions.countDocuments()
```

### Check Box Bot Usage
```bash
mongosh
use test_database
db.chat_messages.countDocuments()
db.chat_messages.aggregate([
  { $group: { _id: "$user_id", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
```

### Check Popular Prompts
```bash
mongosh
use test_database
db.favorites.aggregate([
  { $group: { _id: "$prompt_id", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 10 }
])
```

---

## 🚀 Deployment Checklist

- [x] Backend running on supervisor
- [x] MongoDB connected
- [x] Emergent Auth configured
- [x] GPT-4o integrated
- [x] CORS enabled
- [x] Logs configured
- [ ] Rate limiting (optional)
- [ ] Monitoring (optional)
- [ ] Backup strategy (recommended)

---

## 📞 Quick Commands Reference

```bash
# Restart all services
sudo supervisorctl restart all

# View all logs
tail -f /var/log/supervisor/*.log

# Check backend status
curl https://prompt-box-1.preview.emergentagent.com/api/health

# Access MongoDB
mongosh

# Edit backend code
nano /app/backend/server.py

# Edit environment variables
nano /app/backend/.env
```

---

## ✅ Your Backend Is Ready!

**All Features Implemented:**
✅ Google OAuth authentication
✅ GPT-4o AI chatbot (Box Bot)
✅ User management
✅ Chat history storage
✅ Favorites system
✅ MongoDB database
✅ Secure API endpoints
✅ CORS enabled
✅ Logging configured

**Next Steps:**
1. Test authentication flow from frontend
2. Chat with Box Bot
3. Monitor usage in MongoDB
4. Add custom features as needed

**Need Help?**
Check logs: `tail -f /var/log/supervisor/backend.out.log`

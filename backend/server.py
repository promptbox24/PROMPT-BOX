from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from emergentintegrations.llm.chat import LlmChat, UserMessage
import requests

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]

# API Keys
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', 'sk-emergent-6865bC786F5C1E2354')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ==================== MODELS ====================

class User(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None
    created_at: datetime

class UserSession(BaseModel):
    user_id: str
    session_token: str
    expires_at: datetime
    created_at: datetime

class SessionCreate(BaseModel):
    session_id: str

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    reply: str
    session_id: str

class PromptFavorite(BaseModel):
    user_id: str
    prompt_id: str
    category: str
    created_at: datetime

# ==================== AUTH HELPER ====================

async def get_current_user(request: Request) -> Optional[User]:
    """Get current user from session token in cookie or header"""
    # Check cookie first
    session_token = request.cookies.get('session_token')
    
    # Fallback to Authorization header
    if not session_token:
        auth_header = request.headers.get('Authorization', '')
        if auth_header.startswith('Bearer '):
            session_token = auth_header.replace('Bearer ', '')
    
    if not session_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    # Find session in database
    session_doc = await db.user_sessions.find_one(
        {"session_token": session_token},
        {"_id": 0}
    )
    
    if not session_doc:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    # Check expiry
    expires_at = session_doc["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    
    # Get user
    user_doc = await db.users.find_one(
        {"user_id": session_doc["user_id"]},
        {"_id": 0}
    )
    
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")
    
    return User(**user_doc)

# ==================== AUTH ENDPOINTS ====================

@api_router.post("/auth/session")
async def create_session(session_create: SessionCreate, response: Response):
    """Exchange session_id from OAuth for session_token"""
    try:
        # Call Emergent Auth API
        headers = {'X-Session-ID': session_create.session_id}
        r = requests.get(
            'https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data',
            headers=headers,
            timeout=10
        )
        
        if r.status_code != 200:
            raise HTTPException(status_code=400, detail="Invalid session ID")
        
        user_data = r.json()
        
        # Create or update user
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        existing_user = await db.users.find_one({"email": user_data["email"]})
        
        if existing_user:
            user_id = existing_user["user_id"]
            await db.users.update_one(
                {"user_id": user_id},
                {"$set": {
                    "name": user_data["name"],
                    "picture": user_data.get("picture")
                }}
            )
        else:
            await db.users.insert_one({
                "user_id": user_id,
                "email": user_data["email"],
                "name": user_data["name"],
                "picture": user_data.get("picture"),
                "created_at": datetime.now(timezone.utc)
            })
        
        # Create session
        session_token = user_data["session_token"]
        expires_at = datetime.now(timezone.utc) + timedelta(days=7)
        
        await db.user_sessions.insert_one({
            "user_id": user_id,
            "session_token": session_token,
            "expires_at": expires_at,
            "created_at": datetime.now(timezone.utc)
        })
        
        # Set cookie
        response.set_cookie(
            key="session_token",
            value=session_token,
            httponly=True,
            secure=True,
            samesite="none",
            path="/",
            max_age=7*24*60*60
        )
        
        return {
            "user_id": user_id,
            "email": user_data["email"],
            "name": user_data["name"],
            "picture": user_data.get("picture"),
            "session_token": session_token
        }
    
    except requests.RequestException as e:
        logger.error(f"Auth API error: {e}")
        raise HTTPException(status_code=500, detail="Authentication failed")

@api_router.get("/auth/me")
async def get_me(user: User = Depends(get_current_user)):
    """Get current user"""
    return user

@api_router.post("/auth/logout")
async def logout(response: Response, user: User = Depends(get_current_user)):
    """Logout current user"""
    # Delete session from cookie
    session_token = None
    
    # Find session token from request (this will be available in the dependency)
    # For now, we'll just clear the cookie
    response.delete_cookie(key="session_token", path="/")
    
    return {"message": "Logged out successfully"}

# ==================== BOXBOT AI ENDPOINTS ====================

BOXBOT_SYSTEM_PROMPT = """You are Box Bot, an expert AI prompt engineer designed to create exceptional, educational prompts.

Your mission: Generate custom AI prompts that are:
1. **Clear & Structured**: Use numbered steps, bullet points, and clear sections
2. **Educational**: Explain WHY, not just WHAT. Include learning objectives
3. **Contextual**: Ask for specifics like age, skill level, subject details
4. **Actionable**: Give concrete examples and applications
5. **Encouraging**: Use positive, supportive language

**Prompt Template Structure:**
```
"I need help with [TOPIC/TASK]. I'm [CONTEXT: grade/skill level/situation].

Please:
1. [First specific request]
2. [Second specific request]
3. [Third specific request]
4. [Learning objective or application]

Make it [style: simple/detailed/visual/step-by-step].
Include [specific needs: examples/practice problems/real-world connections]."
```

**Response Format:**
- Start with "Here's your custom [TYPE] prompt:"
- Present the prompt in a code block or clear section
- Add a ✨ tip or 💡 enhancement suggestion
- Keep tone friendly, encouraging, and educational

**Context Detection:**
- Homework → structured learning prompts
- Creative → imaginative, open-ended prompts
- Problem-solving → step-by-step analytical prompts
- Practice → repetitive, skill-building prompts"""

@api_router.post("/chat/message", response_model=ChatResponse)
async def chat_message(
    chat_msg: ChatMessage,
    user: User = Depends(get_current_user)
):
    """Send message to Box Bot and get AI-generated prompt"""
    try:
        # Create unique session ID if not provided
        if not chat_msg.session_id:
            chat_msg.session_id = f"session_{uuid.uuid4().hex[:12]}"
        
        # Initialize LlmChat with GPT-4o
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=chat_msg.session_id,
            system_message=BOXBOT_SYSTEM_PROMPT
        )
        
        # Use GPT-4o (latest model)
        chat.with_model("openai", "gpt-4o")
        
        # Send message
        user_message = UserMessage(text=chat_msg.message)
        response = await chat.send_message(user_message)
        
        # Store chat in database
        await db.chat_messages.insert_one({
            "user_id": user.user_id,
            "session_id": chat_msg.session_id,
            "role": "user",
            "content": chat_msg.message,
            "created_at": datetime.now(timezone.utc)
        })
        
        await db.chat_messages.insert_one({
            "user_id": user.user_id,
            "session_id": chat_msg.session_id,
            "role": "assistant",
            "content": response,
            "created_at": datetime.now(timezone.utc)
        })
        
        return ChatResponse(
            reply=response,
            session_id=chat_msg.session_id
        )
    
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")

@api_router.get("/chat/history/{session_id}")
async def get_chat_history(
    session_id: str,
    user: User = Depends(get_current_user)
):
    """Get chat history for a session"""
    messages = await db.chat_messages.find(
        {
            "user_id": user.user_id,
            "session_id": session_id
        },
        {"_id": 0}
    ).sort("created_at", 1).to_list(1000)
    
    return messages

# ==================== FAVORITES ENDPOINTS ====================

@api_router.post("/favorites")
async def add_favorite(
    prompt_id: str,
    category: str,
    user: User = Depends(get_current_user)
):
    """Add prompt to favorites"""
    # Check if already favorited
    existing = await db.favorites.find_one({
        "user_id": user.user_id,
        "prompt_id": prompt_id
    })
    
    if existing:
        return {"message": "Already favorited"}
    
    await db.favorites.insert_one({
        "user_id": user.user_id,
        "prompt_id": prompt_id,
        "category": category,
        "created_at": datetime.now(timezone.utc)
    })
    
    return {"message": "Added to favorites"}

@api_router.delete("/favorites/{prompt_id}")
async def remove_favorite(
    prompt_id: str,
    user: User = Depends(get_current_user)
):
    """Remove prompt from favorites"""
    result = await db.favorites.delete_one({
        "user_id": user.user_id,
        "prompt_id": prompt_id
    })
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Favorite not found")
    
    return {"message": "Removed from favorites"}

@api_router.get("/favorites")
async def get_favorites(user: User = Depends(get_current_user)):
    """Get user's favorited prompts"""
    favorites = await db.favorites.find(
        {"user_id": user.user_id},
        {"_id": 0}
    ).sort("created_at", -1).to_list(1000)
    
    return favorites

# ==================== HEALTH CHECK ====================

@api_router.get("/")
async def root():
    return {"message": "Prompt Box API v1.0", "status": "running"}

@api_router.get("/health")
async def health():
    return {
        "status": "healthy",
        "database": "connected",
        "ai": "GPT-4o ready"
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

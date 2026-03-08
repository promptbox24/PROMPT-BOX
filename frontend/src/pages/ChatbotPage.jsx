import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Lightbulb } from 'lucide-react';

const ChatbotPage = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi there! I\'m Box Bot 🤖✨\n\nI\'m your personal AI prompt creator! Just tell me:\n• What subject you need help with\n• What you\'re trying to do\n• Your grade level\n\nI\'ll create the perfect AI prompt for you! Let\'s get started 🚀'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateEnhancedPrompt = (userRequest) => {
    // Enhanced AI-like response with better prompt generation
    const prompts = {
      'homework': `Here's your custom homework helper prompt:\n\n"I need help with [SUBJECT] homework. I'm in [GRADE] grade. Please:\n1. Explain the concept in simple terms\n2. Show me step-by-step examples\n3. Give me practice questions\n4. Check my understanding\n\nMake it fun and easy to understand! Use examples from everyday life."\n\n✨ This prompt will help you understand your homework better!`,
      
      'essay': `Here's your essay writing prompt:\n\n"Help me write an essay about [TOPIC]. I'm in [GRADE] grade. Please:\n1. Create an interesting introduction with a hook\n2. Suggest 3 main points with supporting details\n3. Help me write a strong conclusion\n4. Use simple, clear language\n5. Make it [LENGTH] words\n\nInclude fun facts and examples to make it engaging!"\n\n📝 This will help you write an awesome essay!`,
      
      'creative': `Here's your creative writing prompt:\n\n"I want to write a creative [STORY TYPE] about [TOPIC]. Help me by:\n1. Creating interesting characters\n2. Developing an exciting plot\n3. Suggesting cool settings\n4. Adding descriptive words\n5. Making it engaging for [AGE] year olds\n\nMake it fun, imaginative, and easy to follow!"\n\n🎨 Get ready to write something amazing!`,
      
      'science': `Here's your science explorer prompt:\n\n"Explain [SCIENCE TOPIC] to me like I'm [AGE] years old. Please:\n1. Use simple, everyday examples\n2. Show me cool experiments I can try\n3. Explain why it's important\n4. Add fun facts\n5. Use analogies I can understand\n\nMake science exciting and easy to understand!"\n\n🔬 Science is going to be so much fun!`,
      
      'math': `Here's your math helper prompt:\n\n"I'm learning about [MATH TOPIC] in [GRADE] grade. Please:\n1. Explain it using real-life examples\n2. Show me the steps clearly\n3. Give me practice problems (easy to hard)\n4. Teach me tricks to remember\n5. Make it fun and visual\n\nHelp me understand WHY we use this in real life!"\n\n🔢 Math just got easier!`,
      
      'coding': `Here's your coding helper prompt:\n\n"I want to learn [CODING CONCEPT] using [LANGUAGE]. I'm a [SKILL LEVEL] coder. Please:\n1. Explain it in simple terms\n2. Show me a fun example project\n3. Break down the code step-by-step\n4. Point out common mistakes\n5. Give me challenges to practice\n\nMake coding fun and easy to understand!"\n\n💻 Time to become a coding superstar!`
    };

    // Detect keywords in user request
    const request = userRequest.toLowerCase();
    
    if (request.includes('homework') || request.includes('assignment')) {
      return prompts['homework'];
    } else if (request.includes('essay') || request.includes('write') || request.includes('writing')) {
      return prompts['essay'];
    } else if (request.includes('story') || request.includes('creative') || request.includes('imagine')) {
      return prompts['creative'];
    } else if (request.includes('science') || request.includes('experiment') || request.includes('biology') || request.includes('chemistry') || request.includes('physics')) {
      return prompts['science'];
    } else if (request.includes('math') || request.includes('calculate') || request.includes('equation') || request.includes('algebra')) {
      return prompts['math'];
    } else if (request.includes('code') || request.includes('program') || request.includes('coding') || request.includes('python') || request.includes('javascript')) {
      return prompts['coding'];
    }
    
    // Default comprehensive prompt
    return `Here's your custom AI prompt:\n\n"I need help with ${userRequest}. Please:\n1. Explain it clearly and simply\n2. Give me step-by-step instructions\n3. Show real examples\n4. Make it appropriate for my age/level\n5. Make it interesting and fun!\n\nHelp me understand this topic completely!"\n\n✨ Use this prompt with ChatGPT, Claude, or any AI tool!\n\n💡 **Pro Tip:** You can customize the parts in [brackets] to match exactly what you need!`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Call real backend API
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for auth
        body: JSON.stringify({
          message: userMessage,
          session_id: messages.length > 1 ? messages[1]?.session_id : undefined
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.reply,
        session_id: data.session_id
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback to enhanced mock response
      const mockResponse = generateEnhancedPrompt(userMessage);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: mockResponse 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    '📚 Help with homework',
    '📝 Write an essay',
    '🎨 Creative story',
    '🔬 Science project',
    '🔢 Math problem',
    '💻 Learn coding'
  ];

  return (
    <div className="dark-container" style={{
      minHeight: 'calc(100vh - 80px)',
      padding: '40px 20px',
      background: 'radial-gradient(circle at 50% 20%, rgba(138, 99, 255, 0.15) 0%, transparent 50%)'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        height: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              background: 'var(--brand-gradient)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '38px',
              boxShadow: '0 6px 25px rgba(138, 99, 255, 0.5)',
              animation: 'bounce 2s ease-in-out infinite'
            }}>
              🤖
            </div>
          </div>
          <h1 className="display-medium" style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #8a63ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '8px'
          }}>
            Box Bot AI
          </h1>
          <p className="body-medium" style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Your personal AI prompt generator ✨
          </p>
        </div>

        {/* Quick Prompts */}
        {messages.length === 1 && (
          <div style={{ marginBottom: '24px' }}>
            <p className="body-small" style={{ 
              color: 'var(--text-muted)', 
              marginBottom: '12px',
              textAlign: 'center',
              fontWeight: 600
            }}>
              💡 Quick Start:
            </p>
            <div style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInput(prompt)}
                  style={{
                    padding: '10px 18px',
                    background: 'var(--brand-hover)',
                    border: '2px solid var(--brand-primary)',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  className="dark-hover"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          background: 'var(--bg-secondary)',
          border: '2px solid var(--border-subtle)',
          borderRadius: '24px',
          padding: '28px',
          marginBottom: '24px',
          boxShadow: '0 10px 40px rgba(138, 99, 255, 0.2)'
        }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                marginBottom: '28px',
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  padding: '18px 24px',
                  background: message.role === 'user' 
                    ? 'var(--brand-gradient)' 
                    : 'rgba(138, 99, 255, 0.15)',
                  color: '#FFFFFF',
                  borderRadius: '20px',
                  border: message.role === 'assistant' ? '2px solid var(--border-subtle)' : 'none',
                  boxShadow: message.role === 'user' 
                    ? '0 4px 15px rgba(138, 99, 255, 0.4)' 
                    : '0 2px 10px rgba(138, 99, 255, 0.2)'
                }}
              >
                <p className="body-medium" style={{ 
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.7',
                  color: '#FFFFFF',
                  fontSize: '16px'
                }}>
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--brand-primary)',
              padding: '12px 20px',
              background: 'var(--brand-hover)',
              borderRadius: '16px',
              width: 'fit-content'
            }}>
              <Loader2 className="animate-spin" size={20} />
              <span className="body-medium" style={{ fontWeight: 600 }}>Box Bot is creating your prompt...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell me what you need help with... (e.g., 'homework on fractions', 'writing a story about space')"
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '18px 20px',
              background: 'var(--bg-secondary)',
              border: '2px solid var(--border-subtle)',
              borderRadius: '20px',
              color: 'var(--text-primary)',
              fontSize: '16px',
              fontFamily: 'inherit',
              resize: 'none',
              minHeight: '70px',
              maxHeight: '140px'
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="btn-primary"
            style={{
              padding: '18px 26px',
              minHeight: '70px',
              opacity: (!input.trim() || isLoading) ? 0.5 : 1,
              cursor: (!input.trim() || isLoading) ? 'not-allowed' : 'pointer'
            }}
          >
            <Send size={22} />
          </button>
        </div>

        <p className="body-small" style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          marginTop: '18px',
          fontSize: '13px'
        }}>
          💡 Box Bot creates custom prompts using advanced AI. Copy and use them with ChatGPT, Claude, or any AI tool!
        </p>
      </div>
    </div>
  );
};

export default ChatbotPage;

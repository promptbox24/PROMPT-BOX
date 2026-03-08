import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';

const ChatbotPage = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m Box Bot 🤖 I can create custom AI prompts tailored to your needs. Just tell me what you want to accomplish!'
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Mock AI response (will be replaced with real API call)
    setTimeout(() => {
      const mockResponse = `Here's a custom prompt for "${userMessage}":\n\n"You are an expert assistant. Help me with ${userMessage}. Provide detailed, actionable steps with examples. Make it clear and beginner-friendly."\n\nFeel free to customize this further!`;
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: mockResponse 
      }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="dark-container" style={{
      minHeight: 'calc(100vh - 80px)',
      padding: '40px 0'
    }}>
      <div style={{
        maxWidth: '900px',
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
            gap: '12px',
            marginBottom: '12px'
          }}>
            <Sparkles size={32} style={{ color: 'var(--brand-primary)' }} />
            <h1 className="display-medium">Box Bot AI</h1>
          </div>
          <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
            Your personal AI prompt generator
          </p>
        </div>

        {/* Chat Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '0px',
          padding: '24px',
          marginBottom: '20px'
        }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                marginBottom: '24px',
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  padding: '16px 20px',
                  background: message.role === 'user' 
                    ? 'var(--brand-primary)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  color: message.role === 'user' ? '#000000' : 'var(--text-primary)',
                  borderRadius: '0px',
                  border: message.role === 'assistant' ? '1px solid var(--border-subtle)' : 'none'
                }}
              >
                <p className="body-medium" style={{ 
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.6',
                  color: message.role === 'user' ? '#000000' : 'var(--text-primary)'
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
              color: 'var(--text-muted)'
            }}>
              <Loader2 className="animate-spin" size={20} />
              <span className="body-medium">Box Bot is thinking...</span>
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
            placeholder="Describe what you want to accomplish..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '16px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '0px',
              color: 'var(--text-primary)',
              fontSize: '16px',
              fontFamily: 'inherit',
              resize: 'none',
              minHeight: '60px',
              maxHeight: '120px'
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="btn-primary"
            style={{
              padding: '16px 24px',
              minHeight: '60px',
              opacity: (!input.trim() || isLoading) ? 0.5 : 1,
              cursor: (!input.trim() || isLoading) ? 'not-allowed' : 'pointer'
            }}
          >
            <Send size={20} />
          </button>
        </div>

        <p className="body-small" style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          marginTop: '16px'
        }}>
          Box Bot uses AI to generate custom prompts. Results may vary.
        </p>
      </div>
    </div>
  );
};

export default ChatbotPage;

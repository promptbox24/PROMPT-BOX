import React from 'react';
import { promptCategories, featuredPrompts, features, howItWorks } from '../data/mockPrompts';
import CategoryCard from '../components/CategoryCard';
import PromptCard from '../components/PromptCard';
import { Sparkles, ArrowRight, Zap, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const scrollToPrompts = () => {
    document.getElementById('prompts-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="dark-container">
      {/* Hero Section */}
      <section style={{ 
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 0',
        background: 'radial-gradient(circle at 30% 50%, rgba(138, 99, 255, 0.15) 0%, transparent 50%)'
      }}>
        <div style={{ 
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <div>
            <div style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'var(--brand-gradient)',
              borderRadius: '20px',
              marginBottom: '24px',
              fontSize: '14px',
              fontWeight: 700,
              color: '#FFFFFF',
              boxShadow: '0 4px 15px rgba(138, 99, 255, 0.4)'
            }}>
              AI-Powered Learning
            </div>

            <h1 className="display-huge" style={{ 
              marginBottom: '24px',
              lineHeight: '1.1',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 10px 30px rgba(138, 99, 255, 0.5)',
              transform: 'perspective(500px) rotateX(5deg)',
              transformStyle: 'preserve-3d'
            }}>
              Learn Smarter with AI Prompts
            </h1>
            <p className="body-large" style={{ 
              marginBottom: '40px',
              color: 'var(--text-secondary)',
              fontSize: '20px',
              lineHeight: '1.6'
            }}>
              Discover awesome AI prompts for homework, creativity, coding, and more! Make learning fun and easy with Prompt Box.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={scrollToPrompts}
                className="btn-primary"
                style={{ fontSize: '18px', padding: '18px 32px' }}
              >
                Explore Prompts
                <ArrowRight size={22} />
              </button>
              
              <button 
                onClick={() => navigate('/chatbot')}
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '18px',
                  padding: '18px 32px'
                }}
              >
                <Bot size={22} />
                Try Box Bot AI
              </button>
            </div>
          </div>

          {/* Right Side - Floating Prompt Cards */}
          <div style={{ 
            position: 'relative',
            height: '550px'
          }}>
            {featuredPrompts.slice(0, 3).map((prompt, index) => (
              <div
                key={prompt.id}
                className="floating-card"
                style={{
                  position: 'absolute',
                  background: 'var(--bg-secondary)',
                  border: '3px solid var(--border-subtle)',
                  padding: '24px',
                  borderRadius: '20px',
                  width: '85%',
                  boxShadow: '0 10px 40px rgba(138, 99, 255, 0.3)',
                  transform: `translateY(${index * 120}px) translateX(${index * 30}px) rotateZ(${index * 3}deg)`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  animationDelay: `${index * 0.5}s`,
                  zIndex: 3 - index,
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  fontSize: '32px',
                  marginBottom: '12px'
                }}>
                  {['🎯', '✍️', '💡'][index]}
                </div>
                <h4 className="heading-3" style={{ marginBottom: '10px', fontWeight: 700 }}>
                  {prompt.title}
                </h4>
                <p className="body-small" style={{ 
                  color: 'var(--brand-primary)',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  fontWeight: 600
                }}>
                  {prompt.category}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ 
        padding: '100px 0',
        borderTop: '2px solid var(--border-subtle)',
        background: 'radial-gradient(circle at 70% 50%, rgba(74, 172, 254, 0.1) 0%, transparent 50%)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="display-large" style={{ 
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #8a63ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 8px 25px rgba(138, 99, 255, 0.6)',
              transform: 'perspective(500px) translateZ(20px)',
              transformStyle: 'preserve-3d',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'perspective(500px) translateZ(30px) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(500px) translateZ(20px) scale(1)';
            }}
            >
              Choose Your Adventure
            </h2>
            <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
              Pick a category and start exploring amazing AI prompts!
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}>
            {promptCategories.map(category => (
              <CategoryCard 
                key={category.id} 
                category={category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Box Bot AI Section */}
      <section style={{ 
        padding: '100px 0',
        borderTop: '2px solid var(--border-subtle)',
        background: 'radial-gradient(circle at 50% 50%, rgba(138, 99, 255, 0.2) 0%, transparent 60%)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '28px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'var(--brand-gradient)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '42px',
              boxShadow: '0 8px 30px rgba(138, 99, 255, 0.5)',
              animation: 'bounce 2s ease-in-out infinite'
            }}>
              🤖
            </div>
          </div>

          <h2 className="display-large" style={{ 
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #8a63ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 8px 25px rgba(138, 99, 255, 0.6)',
            transform: 'perspective(500px) translateZ(20px)',
            transformStyle: 'preserve-3d'
          }}>
            Meet Box Bot AI!
          </h2>
          <p className="body-large" style={{ 
            marginBottom: '32px',
            color: 'var(--text-secondary)',
            fontSize: '20px',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto 40px'
          }}>
            Your personal AI assistant that creates custom prompts just for you! Tell Box Bot what you need help with, and watch the magic happen ✨
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            marginBottom: '48px'
          }}>
            {[
              { icon: '⚡', title: 'Super Fast', desc: 'Get prompts in seconds' },
              { icon: '🎯', title: 'Custom Made', desc: 'Tailored to your needs' },
              { icon: '🧠', title: 'AI Powered', desc: 'Uses GPT-4o AI' }
            ].map((feature, i) => (
              <div key={i} style={{
                padding: '32px',
                background: 'var(--bg-secondary)',
                border: '2px solid var(--border-subtle)',
                borderRadius: '20px',
                transition: 'all 0.3s ease'
              }} className="dark-hover">
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  {feature.icon}
                </div>
                <h3 className="heading-3" style={{ marginBottom: '8px', fontWeight: 700 }}>
                  {feature.title}
                </h3>
                <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => navigate('/chatbot')}
            className="btn-primary"
            style={{ fontSize: '20px', padding: '20px 40px' }}
          >
            <Sparkles size={24} />
            Chat with Box Bot Now
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Featured Prompts Section */}
      <section 
        id="prompts-section"
        style={{ 
          padding: '100px 0',
          borderTop: '2px solid var(--border-subtle)'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 className="display-large" style={{ 
            textAlign: 'center',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #8a63ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 8px 25px rgba(138, 99, 255, 0.6)',
            transform: 'perspective(500px) translateZ(20px)',
            transformStyle: 'preserve-3d'
          }}>
            Popular Prompts
          </h2>
          <p className="body-large" style={{ 
            textAlign: 'center',
            marginBottom: '60px',
            color: 'var(--text-secondary)'
          }}>
            Try these awesome prompts that other students love!
          </p>
          
          <div className="dark-grid">
            {featuredPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '100px 0',
        borderTop: '2px solid var(--border-subtle)',
        textAlign: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(138, 99, 255, 0.15) 0%, transparent 60%)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🚀</div>
          <h2 className="display-large" style={{ 
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #8a63ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 8px 25px rgba(138, 99, 255, 0.6)',
            transform: 'perspective(500px) translateZ(20px)',
            transformStyle: 'preserve-3d'
          }}>
            Ready to Learn Smarter?
          </h2>
          <p className="body-large" style={{ 
            marginBottom: '40px',
            color: 'var(--text-secondary)',
            fontSize: '19px'
          }}>
            Join thousands of students using Prompt Box to ace their homework and projects!
          </p>
          
          <button 
            onClick={() => navigate('/login')}
            className="btn-primary"
            style={{ fontSize: '20px', padding: '20px 40px' }}
          >
            Get Started Free
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '2px solid var(--border-subtle)',
        padding: '50px 0',
        textAlign: 'center',
        background: 'var(--bg-secondary)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p className="body-medium" style={{ 
            color: 'var(--text-muted)',
            marginBottom: '20px',
            fontSize: '15px'
          }}>
            © 2025 Prompt Box. Made with ❤️ for students everywhere
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '32px',
            flexWrap: 'wrap'
          }}>
            <a href="#" className="dark-nav-link" style={{ fontSize: '15px' }}>Privacy Policy</a>
            <a href="#" className="dark-nav-link" style={{ fontSize: '15px' }}>Terms of Service</a>
            <a href="#" className="dark-nav-link" style={{ fontSize: '15px' }}>Contact Us</a>
            <a href="#" className="dark-nav-link" style={{ fontSize: '15px' }}>Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

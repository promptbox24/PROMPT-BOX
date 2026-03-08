import React from 'react';
import { promptCategories, featuredPrompts, features, howItWorks } from '../data/mockPrompts';
import CategoryCard from '../components/CategoryCard';
import PromptCard from '../components/PromptCard';
import { Sparkles, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const scrollToPrompts = () => {
    document.getElementById('prompts-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryId) => {
    // In future: filter prompts by category
    scrollToPrompts();
  };

  return (
    <div className="dark-container">
      {/* Hero Section */}
      <section style={{ 
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 0'
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
            <h1 className="display-huge" style={{ 
              marginBottom: '24px',
              lineHeight: '1.1'
            }}>
              Copy-Paste AI Prompts That Actually Work
            </h1>
            <p className="body-large" style={{ 
              marginBottom: '40px',
              color: 'var(--text-secondary)'
            }}>
              Stop guessing. Use proven prompts for study, content, business, and productivity.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={scrollToPrompts}
                className="btn-primary"
              >
                Browse Free Prompts
                <ArrowRight size={20} />
              </button>
              
              <button 
                onClick={() => window.location.href = '/chatbot'}
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Sparkles size={20} />
                Try Box Bot AI
              </button>
            </div>
          </div>

          {/* Right Side - Floating Prompt Cards */}
          <div style={{ 
            position: 'relative',
            height: '500px'
          }}>
            {featuredPrompts.slice(0, 3).map((prompt, index) => (
              <div
                key={prompt.id}
                className="floating-card"
                style={{
                  position: 'absolute',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  padding: '20px',
                  borderRadius: '0px',
                  width: '90%',
                  boxShadow: '0 8px 32px rgba(0, 255, 209, 0.1)',
                  transform: `translateY(${index * 100}px) translateX(${index * 20}px) rotateZ(${index * 2}deg)`,
                  transition: 'all 0.4s ease-in-out',
                  animation: `float ${3 + index}s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`,
                  zIndex: 3 - index
                }}
              >
                <h4 className="heading-3" style={{ marginBottom: '8px' }}>
                  {prompt.title}
                </h4>
                <p className="body-small" style={{ 
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                  letterSpacing: '0.05em'
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
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 className="display-large" style={{ 
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            Browse by Category
          </h2>
          
          <div className="dark-grid" style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {promptCategories.map(category => (
              <CategoryCard 
                key={category.id} 
                category={category}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Prompts Section */}
      <section 
        id="prompts-section"
        style={{ 
          padding: '100px 0',
          borderTop: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 className="display-large" style={{ 
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Featured Prompts
          </h2>
          <p className="body-large" style={{ 
            textAlign: 'center',
            marginBottom: '60px',
            color: 'var(--text-secondary)'
          }}>
            Try these popular prompts right now
          </p>
          
          <div className="dark-grid">
            {featuredPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: '100px 0',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 className="display-large" style={{ 
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            Why Use PromptBox?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {features.map((feature, index) => (
              <div 
                key={index}
                style={{
                  textAlign: 'center',
                  padding: '32px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '0px',
                  transition: 'all 0.4s ease-in-out'
                }}
                className="dark-hover"
              >
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  {feature.icon}
                </div>
                <h3 className="heading-3" style={{ marginBottom: '12px' }}>
                  {feature.title}
                </h3>
                <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ 
        padding: '100px 0',
        borderTop: '1px solid var(--border-subtle)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 className="display-large" style={{ 
            textAlign: 'center',
            marginBottom: '60px'
          }}>
            How It Works
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px'
          }}>
            {howItWorks.map((step) => (
              <div 
                key={step.step}
                style={{
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'var(--brand-primary)',
                  color: '#000000',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 600,
                  margin: '0 auto 24px'
                }}>
                  {step.step}
                </div>
                <h3 className="heading-2" style={{ marginBottom: '12px' }}>
                  {step.title}
                </h3>
                <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '100px 0',
        borderTop: '1px solid var(--border-subtle)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="display-large" style={{ marginBottom: '24px' }}>
            Ready to Level Up Your AI Game?
          </h2>
          <p className="body-large" style={{ 
            marginBottom: '40px',
            color: 'var(--text-secondary)'
          }}>
            Join thousands using PromptBox to get better AI results
          </p>
          
          <button 
            onClick={() => window.location.href = '/login'}
            className="btn-primary"
            style={{ fontSize: '20px', padding: '18px 36px' }}
          >
            Get Started Free
            <ArrowRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '40px 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p className="body-medium" style={{ 
            color: 'var(--text-muted)',
            marginBottom: '16px'
          }}>
            © 2025 PromptBox. All rights reserved.
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '32px',
            flexWrap: 'wrap'
          }}>
            <a href="#" className="dark-nav-link">Privacy Policy</a>
            <a href="#" className="dark-nav-link">Terms of Service</a>
            <a href="#" className="dark-nav-link">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

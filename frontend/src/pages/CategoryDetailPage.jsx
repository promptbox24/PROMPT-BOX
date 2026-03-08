import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { promptCategories, categoryPrompts } from '../data/mockPrompts';

const CategoryDetailPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = promptCategories.find(cat => cat.id === categoryId);
  const prompts = categoryPrompts[categoryId] || [];
  const [copiedId, setCopiedId] = useState(null);

  if (!category) {
    return (
      <div className="dark-container" style={{ minHeight: '100vh', padding: '100px 20px', textAlign: 'center' }}>
        <h1>Category not found</h1>
        <button onClick={() => navigate('/')} className="btn-primary" style={{ marginTop: '20px' }}>
          Go Home
        </button>
      </div>
    );
  }

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="dark-container page-enter" style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Hero Section with Category Image */}
      <section style={{
        height: '400px',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '60px',
        borderRadius: '0 0 40px 40px'
      }}>
        <img 
          src={category.image} 
          alt={category.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(26, 26, 46, 0.7) 0%, rgba(26, 26, 46, 0.95) 100%)'
        }}></div>
        
        <div style={{
          position: 'relative',
          maxWidth: '1400px',
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 40px'
        }}>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
            style={{
              marginBottom: '30px',
              width: 'fit-content',
              padding: '12px 24px',
              minHeight: 'auto'
            }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>

          <h1 className="display-huge" style={{
            marginBottom: '20px',
            color: '#FFFFFF'
          }}>
            {category.title}
          </h1>
          <p className="body-large" style={{
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '700px',
            fontSize: '22px'
          }}>
            {category.description}
          </p>
          <p className="body-medium" style={{
            color: 'var(--brand-primary)',
            marginTop: '16px',
            fontWeight: 600
          }}>
            {prompts.length} Ready-to-Use Prompts
          </p>
        </div>
      </section>

      {/* Prompts Grid */}
      <section style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))',
          gap: '30px'
        }}>
          {prompts.map((prompt) => (
            <div
              key={prompt.id}
              className="dark-hover"
              style={{
                background: 'var(--bg-secondary)',
                border: '2px solid var(--border-subtle)',
                borderRadius: '20px',
                padding: '32px',
                transition: 'all 0.3s ease'
              }}
            >
              <h3 className="heading-2" style={{
                marginBottom: '16px',
                fontWeight: 700,
                color: 'var(--brand-primary)'
              }}>
                {prompt.title}
              </h3>

              <p className="body-medium" style={{
                marginBottom: '20px',
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                {prompt.description}
              </p>

              <div style={{
                background: 'rgba(138, 99, 255, 0.1)',
                padding: '20px',
                borderRadius: '16px',
                marginBottom: '24px',
                border: '2px solid var(--border-subtle)'
              }}>
                <p className="body-small" style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'monospace',
                  lineHeight: '1.8',
                  fontSize: '15px',
                  whiteSpace: 'pre-wrap'
                }}>
                  {prompt.prompt}
                </p>
              </div>

              <button
                onClick={() => handleCopy(prompt.id, prompt.prompt)}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '16px'
                }}
              >
                {copiedId === prompt.id ? (
                  <>
                    <Check size={20} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={20} />
                    Copy Prompt
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {prompts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px'
          }}>
            <h2 className="display-medium" style={{ marginBottom: '16px' }}>
              Coming Soon!
            </h2>
            <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
              We're working on adding prompts for this category. Check back soon!
            </p>
            <button
              onClick={() => navigate('/chatbot')}
              className="btn-primary"
              style={{ marginTop: '32px' }}
            >
              Try Box Bot AI Instead
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      {prompts.length > 0 && (
        <section style={{
          maxWidth: '1000px',
          margin: '80px auto 0',
          padding: '60px 40px',
          background: 'var(--brand-gradient)',
          borderRadius: '28px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(138, 99, 255, 0.4)'
        }}>
          <h2 className="display-medium" style={{
            marginBottom: '20px',
            color: '#FFFFFF'
          }}>
            Need a Custom Prompt?
          </h2>
          <p className="body-large" style={{
            marginBottom: '32px',
            color: 'rgba(255, 255, 255, 0.95)',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Chat with Box Bot AI to create personalized prompts tailored exactly to your needs!
          </p>
          <button
            onClick={() => navigate('/chatbot')}
            className="btn-secondary"
            style={{
              background: '#FFFFFF',
              color: 'var(--brand-primary)',
              borderColor: '#FFFFFF'
            }}
          >
            Chat with Box Bot
          </button>
        </section>
      )}
    </div>
  );
};

export default CategoryDetailPage;

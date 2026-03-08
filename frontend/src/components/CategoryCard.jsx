import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { categoryPrompts } from '../data/mockPrompts';

const CategoryCard = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const prompts = categoryPrompts[category.id] || [];

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    
    // Celebration effect
    createConfetti(event.target);
    
    setTimeout(() => setCopiedId(null), 2000);
  };

  const createConfetti = (element) => {
    const colors = ['#8a63ff', '#4facfe', '#43e97b', '#fa709a', '#fee140'];
    for (let i = 0; i < 15; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '8px';
      confetti.style.height = '8px';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.zIndex = '1000';
      confetti.style.pointerEvents = 'none';
      
      const rect = element.getBoundingClientRect();
      confetti.style.left = rect.left + rect.width / 2 + 'px';
      confetti.style.top = rect.top + rect.height / 2 + 'px';
      
      document.body.appendChild(confetti);
      
      const angle = (Math.PI * 2 * i) / 15;
      const velocity = 3 + Math.random() * 2;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      let posX = 0, posY = 0, opacity = 1;
      const animate = () => {
        posX += vx;
        posY += vy + 0.5;
        opacity -= 0.02;
        confetti.style.transform = `translate(${posX}px, ${posY}px)`;
        confetti.style.opacity = opacity;
        
        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          confetti.remove();
        }
      };
      animate();
    }
  };

  return (
    <div 
      className="category-card"
      style={{
        background: category.color,
        backdropFilter: 'blur(16px)',
        border: '3px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '24px',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onMouseMove={(e) => {
        if (isExpanded) return;
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.05)`;
      }}
      onMouseLeave={(e) => {
        if (isExpanded) return;
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
      }}
    >
      {/* Category Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ padding: 0 }}
      >
        {/* Image Section */}
        <div style={{
          height: isExpanded ? '200px' : '160px',
          overflow: 'hidden',
          position: 'relative',
          transition: 'height 0.4s ease'
        }}>
          <img 
            src={category.image} 
            alt={category.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: isExpanded ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isExpanded 
              ? 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.85) 100%)'
              : 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)'
          }}></div>
        </div>

        {/* Content Section */}
        <div style={{
          padding: '24px'
        }}>
          <h3 
            className="category-title-3d" 
            style={{ 
              marginBottom: '12px', 
              fontWeight: 800,
              fontSize: '26px',
              color: '#FFFFFF',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(138, 99, 255, 0.6)',
              transform: 'translateZ(20px)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateZ(30px) scale(1.05)';
              e.currentTarget.style.textShadow = '0 6px 12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(138, 99, 255, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(20px) scale(1)';
              e.currentTarget.style.textShadow = '0 4px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(138, 99, 255, 0.6)';
            }}
          >
            {category.title}
          </h3>
          
          <p className="body-medium" style={{ 
            color: 'rgba(255, 255, 255, 0.95)', 
            fontWeight: 500,
            marginBottom: '16px'
          }}>
            {category.description}
          </p>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 600,
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
            }}>
              {prompts.length} Prompts
            </span>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '8px',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 600,
              padding: '10px 18px',
              background: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
            }}>
              {isExpanded ? (
                <>
                  <ChevronUp size={20} />
                  Close
                </>
              ) : (
                <>
                  <ChevronDown size={20} />
                  View All
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Prompts Section */}
      {isExpanded && (
        <div style={{
          padding: '0 24px 24px',
          animation: 'slideDown 0.4s ease-out'
        }}>
          <div style={{
            maxHeight: '600px',
            overflowY: 'auto',
            paddingRight: '10px'
          }}>
            {prompts.map((prompt, index) => (
              <div
                key={prompt.id}
                className="prompt-item-hover"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '16px',
                  padding: '20px',
                  marginBottom: '16px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(8px) scale(1.02)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0) scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <h4 style={{
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '10px',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}>
                  {prompt.title}
                </h4>
                
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  marginBottom: '12px',
                  lineHeight: '1.5'
                }}>
                  {prompt.description}
                </p>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '12px',
                  borderRadius: '10px',
                  marginBottom: '12px',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  color: '#FFFFFF',
                  lineHeight: '1.6',
                  maxHeight: '100px',
                  overflowY: 'auto'
                }}>
                  {prompt.prompt}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(prompt.id, prompt.prompt);
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: copiedId === prompt.id 
                      ? 'rgba(67, 233, 123, 0.9)' 
                      : 'rgba(255, 255, 255, 0.9)',
                    color: copiedId === prompt.id ? '#FFFFFF' : '#1a1a2e',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    if (copiedId !== prompt.id) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  {copiedId === prompt.id ? (
                    <>
                      <Check size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Prompt
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shine effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
        transform: 'translateX(-100%)',
        transition: 'transform 0.6s ease',
        pointerEvents: 'none'
      }} className="shine-effect"></div>
    </div>
  );
};

export default CategoryCard;

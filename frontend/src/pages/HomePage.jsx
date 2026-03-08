import React, { useState } from 'react';
import { promptCategories } from '../data/mockPrompts';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Video, Briefcase, Zap, Code, Heart, PenTool, Palette, MessageCircle, Sparkles, CheckCircle, Clock, Layers, Users } from 'lucide-react';

const categoryIcons = {
  homework: BookOpen,
  creative: PenTool,
  gaming: Zap,
  science: Layers,
  art: Palette,
  coding: Code,
  math: Code,
  reading: BookOpen,
  languages: MessageCircle,
  health: Heart
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#0A0118', minHeight: '100vh', color: '#fff' }}>
      {/* Hero Section */}
      <section style={{
        padding: '120px 7.6923% 80px',
        background: 'radial-gradient(ellipse at top, rgba(139, 92, 246, 0.15), transparent 70%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: '64px',
              fontWeight: 800,
              lineHeight: '1.1',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #E0A4FC 0%, #FF69B4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              Your Ultimate AI Prompt Library
            </h1>
            
            <p style={{
              fontSize: '20px',
              color: '#B0A0E0',
              marginBottom: '48px',
              lineHeight: '1.6'
            }}>
              Discover 150+ premium AI prompts across 10 categories, or let BOXBOT craft custom prompts tailored to your exact needs.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/chatbot')}
                className="hero-button"
                style={{
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 30px rgba(236, 72, 153, 0.4)'
                }}
              >
                Browse All Prompts
                <ArrowRight size={20} />
              </button>

              <button
                onClick={() => navigate('/chatbot')}
                style={{
                  padding: '16px 32px',
                  fontSize: '18px',
                  fontWeight: 600,
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '2px solid #8B5CF6',
                  borderRadius: '12px',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Sparkles size={20} />
                Try BOXBOT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '80px 7.6923%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 700,
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #fff 0%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Browse by Category
            </h2>
            <p style={{ fontSize: '18px', color: '#B0A0E0' }}>
              Choose from our curated collection of AI prompts
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {promptCategories.map(category => {
              const IconComponent = categoryIcons[category.id];
              return (
                <div
                  key={category.id}
                  onClick={() => navigate(`/category/${category.id}`)}
                  style={{
                    background: category.color,
                    padding: '32px',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <IconComponent size={28} color="#fff" />
                  </div>

                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    marginBottom: '12px',
                    color: '#fff'
                  }}>
                    {category.title}
                  </h3>

                  <p style={{
                    fontSize: '15px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginBottom: '20px',
                    lineHeight: '1.5'
                  }}>
                    {category.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.9)'
                    }}>
                      15+ Prompts
                    </span>
                    <ArrowRight size={20} color="rgba(255, 255, 255, 0.8)" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section style={{ padding: '80px 7.6923%', background: 'rgba(139, 92, 246, 0.03)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 700,
              marginBottom: '16px'
            }}>
              Why Choose Our Prompts?
            </h2>
            <p style={{ fontSize: '18px', color: '#B0A0E0' }}>
              Designed for results, built for everyone
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {[
              { icon: CheckCircle, title: 'Ready-to-Use Prompts', desc: 'Copy and paste immediately into any AI tool. No editing required.' },
              { icon: Clock, title: 'Save Time', desc: 'Skip the trial and error. Get proven prompts that work instantly.' },
              { icon: Layers, title: 'Organized Library', desc: '150+ prompts across 10 categories, all in one place.' },
              { icon: Users, title: 'For Everyone', desc: 'Whether you\'re a student, creator, or professional - we have prompts for you.' }
            ].map((feature, i) => {
              const IconComp = feature.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: 'rgba(17, 24, 39, 0.5)',
                    backdropFilter: 'blur(10px)',
                    padding: '32px',
                    borderRadius: '16px',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <IconComp size={40} color="#8B5CF6" style={{ marginBottom: '20px' }} />
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    marginBottom: '12px'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#B0A0E0',
                    lineHeight: '1.6'
                  }}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOXBOT Section */}
      <section style={{ padding: '80px 7.6923%' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 50%, #EC4899 100%)',
            padding: '60px',
            borderRadius: '24px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              filter: 'blur(40px)'
            }}></div>

            <div style={{
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sparkles size={32} />
                </div>
              </div>

              <h2 style={{
                fontSize: '42px',
                fontWeight: 800,
                marginBottom: '20px',
                color: '#fff'
              }}>
                Meet BOXBOT AI
              </h2>

              <p style={{
                fontSize: '18px',
                marginBottom: '36px',
                color: 'rgba(255, 255, 255, 0.95)',
                maxWidth: '700px',
                margin: '0 auto 36px',
                lineHeight: '1.6'
              }}>
                Can't find the perfect prompt? Let our AI create one for you! Just describe what you need, and BOXBOT will craft a custom prompt in seconds.
              </p>

              <button
                onClick={() => navigate('/chatbot')}
                style={{
                  padding: '18px 40px',
                  fontSize: '18px',
                  fontWeight: 700,
                  background: '#fff',
                  color: '#4F46E5',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
                }}
              >
                Try BOXBOT Now
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '60px 7.6923%',
        borderTop: '1px solid rgba(139, 92, 246, 0.2)',
        textAlign: 'center'
      }}>
        <p style={{ color: '#B0A0E0', fontSize: '15px' }}>
          © 2025 Prompt Box. Powered by BOXBOT AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Zap, Code, Heart, PenTool, Palette, MessageCircle, Sparkles, CheckCircle, Clock, Layers, Users, Copy, Check, ChevronDown, ChevronUp, Gamepad2, FlaskConical, Calculator, Languages, Dumbbell } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const categoryIcons = {
  homework: BookOpen,
  creative: PenTool,
  gaming: Gamepad2,
  science: FlaskConical,
  art: Palette,
  coding: Code,
  math: Calculator,
  reading: BookOpen,
  languages: Languages,
  health: Dumbbell
};

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 8
  }));

  return (
    <div className="floating-particles-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// Copy button component
const CopyButton = ({ text, size = 'normal' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`copy-btn ${size === 'large' ? 'copy-btn-large' : ''} ${copied ? 'copied' : ''}`}
      data-testid="copy-prompt-btn"
    >
      {copied ? (
        <>
          <Check size={size === 'large' ? 18 : 14} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={size === 'large' ? 18 : 14} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
};

// Prompt item component
const PromptItem = ({ prompt, index }) => {
  return (
    <div 
      className="prompt-item"
      style={{ animationDelay: `${index * 0.05}s` }}
      data-testid={`prompt-item-${prompt.id}`}
    >
      <div className="prompt-item-header">
        <h4 className="prompt-item-title">{prompt.title}</h4>
        <CopyButton text={prompt.prompt} />
      </div>
      <p className="prompt-item-description">{prompt.description}</p>
      <div className="prompt-item-content">
        <code>{prompt.prompt}</code>
      </div>
    </div>
  );
};

// Category card with accordion
const CategoryCard = ({ category, isExpanded, onToggle, prompts }) => {
  const IconComponent = categoryIcons[category.id] || Sparkles;

  return (
    <div 
      className={`category-card-dark ${isExpanded ? 'expanded' : ''}`}
      data-testid={`category-card-${category.id}`}
    >
      <div 
        className="category-card-header"
        onClick={onToggle}
      >
        <div className="category-card-icon-wrapper">
          <IconComponent size={28} className="category-icon" />
        </div>
        <div className="category-card-info">
          <h3 className="category-card-title interactive-text">{category.title}</h3>
          <p className="category-card-desc">{category.description}</p>
          <span className="category-card-count">{prompts.length} Prompts</span>
        </div>
        <div className={`category-card-toggle ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>
      
      {isExpanded && (
        <div className="category-prompts-container">
          <div className="prompts-grid">
            {prompts.map((prompt, index) => (
              <PromptItem key={prompt.id} prompt={prompt} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [allPrompts, setAllPrompts] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState({});
  const categoriesRef = useRef(null);

  // Fetch categories and prompts from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/prompts/all`);
        if (response.ok) {
          const data = await response.json();
          setAllPrompts(data);
          
          // Create categories array from data
          const cats = Object.values(data).map(cat => ({
            id: cat.id,
            title: cat.title,
            description: cat.description,
            image: cat.image,
            color: cat.color
          }));
          setCategories(cats);
          
          // Initialize all categories as CLOSED by default
          const expanded = {};
          cats.forEach(cat => {
            expanded[cat.id] = false;
          });
          setExpandedCategories(expanded);
        }
      } catch (error) {
        console.error('Failed to fetch prompts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  // Smooth scroll function
  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const expandAll = () => {
    const expanded = {};
    categories.forEach(cat => {
      expanded[cat.id] = true;
    });
    setExpandedCategories(expanded);
  };

  const collapseAll = () => {
    const collapsed = {};
    categories.forEach(cat => {
      collapsed[cat.id] = false;
    });
    setExpandedCategories(collapsed);
  };

  return (
    <div className="homepage-container" data-testid="homepage">
      <FloatingParticles />
      
      <div className="homepage-content">
        {/* Hero Section */}
        <section className="hero-section" data-testid="hero-section">
          <div className="hero-badge">
            <Zap size={16} className="badge-icon" />
            <span>Powered by Advanced AI • 100% Free Forever</span>
          </div>

          <h1 className="hero-title interactive-title" data-testid="main-title">
            <span className="title-word">Prompt</span>
            <span className="title-word highlight">Box</span>
          </h1>
          
          <p className="hero-subtitle">
            Discover 150+ premium AI prompts across 10 categories, or let <span className="highlight-text">Box Bot</span> craft custom prompts tailored to your exact needs.
          </p>

          <div className="hero-buttons">
            <button
              onClick={scrollToCategories}
              className="btn-primary-hero"
              data-testid="browse-prompts-btn"
            >
              <span>Browse All Prompts</span>
              <ArrowRight size={20} className="btn-icon" />
            </button>

            <button
              onClick={() => navigate('/chatbot')}
              className="btn-secondary-hero"
              data-testid="try-boxbot-btn"
            >
              <Sparkles size={20} />
              <span>Try Box Bot</span>
            </button>
          </div>

          {/* Stats Section */}
          <div className="stats-container" id="stats" data-animate>
            {[
              { number: '150+', label: 'AI Prompts' },
              { number: '10', label: 'Categories' },
              { number: '100%', label: 'Free Forever' }
            ].map((stat, i) => (
              <div 
                key={i}
                className={`stat-item ${visibleSections['stats'] ? 'visible' : ''}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Prompts Section Header */}
        <section className="prompts-section-header" ref={categoriesRef}>
          <h2 className="section-title interactive-title" data-testid="prompts-title">
            <span className="title-word">Browse</span>
            <span className="title-word highlight">Prompts</span>
          </h2>
          <p className="section-subtitle">
            Click any category to explore and copy ready-to-use prompts
          </p>
          
          <div className="category-controls">
            <button onClick={expandAll} className="control-btn" data-testid="expand-all-btn">
              <ChevronDown size={18} />
              Expand All
            </button>
            <button onClick={collapseAll} className="control-btn" data-testid="collapse-all-btn">
              <ChevronUp size={18} />
              Collapse All
            </button>
          </div>
        </section>

        {/* Categories with Prompts */}
        <section className="categories-section" id="categories" data-animate>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading prompts...</p>
            </div>
          ) : (
            <div className="categories-list">
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isExpanded={expandedCategories[category.id]}
                  onToggle={() => toggleCategory(category.id)}
                  prompts={allPrompts[category.id]?.prompts || []}
                />
              ))}
            </div>
          )}
        </section>

        {/* Why Choose Section */}
        <section id="why-choose" data-animate className="why-choose-section">
          <h2 className="section-title interactive-title">
            Why Choose Our <span className="highlight">Prompts</span>?
          </h2>
          <p className="section-subtitle">
            Designed for results, built for everyone
          </p>

          <div className="features-grid">
            {[
              { icon: CheckCircle, title: 'Ready-to-Use Prompts', desc: 'Copy and paste immediately into any AI tool. No editing required.' },
              { icon: Clock, title: 'Save Time', desc: 'Skip the trial and error. Get proven prompts that work instantly.' },
              { icon: Layers, title: 'Organized Library', desc: '150+ prompts across 10 categories, all in one place.' },
              { icon: Users, title: 'For Everyone', desc: "Whether you're a student, creator, or professional - we have prompts for you." }
            ].map((feature, i) => {
              const IconComp = feature.icon;
              return (
                <div
                  key={i}
                  className={`feature-card ${visibleSections['why-choose'] ? 'visible' : ''}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <IconComp size={40} className="feature-icon" />
                  <h3 className="feature-title interactive-text">{feature.title}</h3>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* BOXBOT Section */}
        <section id="boxbot" data-animate className="boxbot-section">
          <div className={`boxbot-card ${visibleSections['boxbot'] ? 'visible' : ''}`}>
            <div className="boxbot-decoration"></div>
            
            <div className="boxbot-content">
              <div className="boxbot-icon-wrapper">
                <Sparkles size={32} className="boxbot-icon" />
              </div>

              <h2 className="boxbot-title interactive-title">
                Meet <span className="highlight">Box Bot</span> AI
              </h2>

              <p className="boxbot-desc">
                Can't find the perfect prompt? Let our AI create one for you! Just describe what you need, and Box Bot will craft a custom prompt in seconds.
              </p>

              <button
                onClick={() => navigate('/chatbot')}
                className="boxbot-btn"
                data-testid="boxbot-cta-btn"
              >
                <span>Try Box Bot Now</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="homepage-footer">
          <p>© 2025 Prompt Box. Powered by Box Bot AI. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;

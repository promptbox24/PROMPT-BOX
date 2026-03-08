import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="dark-header">
      <div className="dark-logo" onClick={() => navigate('/')}>
        <img 
          src="https://customer-assets.emergentagent.com/job_copy-prompt/artifacts/qr4amo3s_Modern%20logo%20design%20with%20gradient%20box.png" 
          alt="Prompt Box Logo"
        />
        <span style={{ 
          fontSize: '24px', 
          fontWeight: 700, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em'
        }}>
          Prompt Box
        </span>
      </div>
      
      <nav className="dark-nav">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigate('/'); }}
          className={`dark-nav-link ${isActive('/') || isActive('/dashboard') ? 'active' : ''}`}
        >
          🎯 Prompts
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigate('/chatbot'); }}
          className={`dark-nav-link ${isActive('/chatbot') ? 'active' : ''}`}
        >
          🤖 Box Bot
        </a>
        
        {user ? (
          <>
            <span className="dark-nav-link" style={{ color: 'var(--text-secondary)', cursor: 'default' }}>
              👋 {user.name || user.email}
            </span>
            <button onClick={onLogout} className="btn-secondary" style={{ minHeight: '44px', padding: '10px 20px' }}>
              Logout
            </button>
          </>
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className="btn-primary" 
            style={{ minHeight: '44px', padding: '10px 20px' }}
          >
            Sign In
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;

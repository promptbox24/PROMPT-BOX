import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="dark-header">
      <div className="dark-logo" onClick={() => navigate('/')}>
        <span style={{ 
          fontSize: '24px', 
          fontWeight: 600, 
          color: 'var(--brand-primary)',
          letterSpacing: '-0.02em'
        }}>
          PromptBox
        </span>
      </div>
      
      <nav className="dark-nav">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigate('/'); }}
          className={`dark-nav-link ${isActive('/') || isActive('/dashboard') ? 'active' : ''}`}
        >
          Prompts
        </a>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigate('/chatbot'); }}
          className={`dark-nav-link ${isActive('/chatbot') ? 'active' : ''}`}
        >
          Box Bot
        </a>
        
        {user ? (
          <>
            <span className="dark-nav-link" style={{ color: 'var(--text-secondary)' }}>
              {user.name || user.email}
            </span>
            <button onClick={onLogout} className="btn-secondary" style={{ minHeight: '40px', padding: '8px 16px' }}>
              Logout
            </button>
          </>
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className="btn-primary" 
            style={{ minHeight: '40px', padding: '8px 16px' }}
          >
            Sign In
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;

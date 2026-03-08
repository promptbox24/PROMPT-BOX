import React from 'react';
import { ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const handleLogin = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + '/dashboard';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="dark-container" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        padding: '60px 40px',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '0px',
        textAlign: 'center'
      }}>
        <h1 className="display-large" style={{ marginBottom: '16px' }}>
          Welcome to PromptBox
        </h1>
        <p className="body-large" style={{ 
          marginBottom: '40px',
          color: 'var(--text-secondary)'
        }}>
          Sign in to access Box Bot AI and save your favorite prompts
        </p>

        <button 
          onClick={handleLogin}
          className="btn-primary"
          style={{
            width: '100%',
            justifyContent: 'center'
          }}
        >
          Sign in with Google
          <ArrowRight size={20} />
        </button>

        <p className="body-small" style={{ 
          marginTop: '24px',
          color: 'var(--text-muted)'
        }}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

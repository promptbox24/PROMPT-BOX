import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleGoogleAuth = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + '/dashboard';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="dark-container" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 50%, rgba(138, 99, 255, 0.15) 0%, var(--bg-primary) 70%)'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        padding: '50px 45px',
        background: 'var(--bg-secondary)',
        border: '2px solid var(--border-subtle)',
        borderRadius: '28px',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(138, 99, 255, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(138, 99, 255, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(74, 172, 254, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}></div>

        {/* Logo */}
        <div style={{ marginBottom: '30px', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <Sparkles size={40} style={{ color: 'var(--brand-primary)' }} />
          </div>
          <h1 className="display-medium" style={{ marginBottom: '12px' }}>
            Welcome to Prompt Box! 🎉
          </h1>
          <p className="body-large" style={{ 
            color: 'var(--text-secondary)',
            fontSize: '16px'
          }}>
            Join thousands of students creating amazing AI prompts
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '32px',
          background: 'rgba(138, 99, 255, 0.1)',
          padding: '6px',
          borderRadius: '16px',
          position: 'relative',
          zIndex: 1
        }}>
          <button
            onClick={() => setActiveTab('login')}
            style={{
              flex: 1,
              padding: '14px',
              background: activeTab === 'login' ? 'var(--brand-gradient)' : 'transparent',
              color: activeTab === 'login' ? '#FFFFFF' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === 'login' ? '0 4px 15px rgba(138, 99, 255, 0.4)' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            style={{
              flex: 1,
              padding: '14px',
              background: activeTab === 'signup' ? 'var(--brand-gradient)' : 'transparent',
              color: activeTab === 'signup' ? '#FFFFFF' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTab === 'signup' ? '0 4px 15px rgba(138, 99, 255, 0.4)' : 'none'
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {activeTab === 'login' && (
            <div>
              <p className="body-medium" style={{ 
                marginBottom: '28px',
                color: 'var(--text-secondary)',
                fontSize: '15px'
              }}>
                Welcome back! Sign in to access Box Bot AI and your saved prompts
              </p>

              <button 
                onClick={handleGoogleAuth}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '17px',
                  padding: '16px'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {activeTab === 'signup' && (
            <div>
              <p className="body-medium" style={{ 
                marginBottom: '28px',
                color: 'var(--text-secondary)',
                fontSize: '15px'
              }}>
                Create your free account and start exploring amazing AI prompts!
              </p>

              <button 
                onClick={handleGoogleAuth}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '17px',
                  padding: '16px'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
                <ArrowRight size={20} />
              </button>

              <div style={{
                marginTop: '24px',
                padding: '16px',
                background: 'rgba(138, 99, 255, 0.1)',
                borderRadius: '16px',
                border: '2px solid var(--border-subtle)'
              }}>
                <p className="body-small" style={{ 
                  color: 'var(--text-secondary)',
                  fontSize: '13px',
                  lineHeight: '1.6'
                }}>
                  ✨ <strong>What you'll get:</strong><br/>
                  • Unlimited access to Box Bot AI<br/>
                  • Save your favorite prompts<br/>
                  • Create custom prompt collections<br/>
                  • 100% Free forever!
                </p>
              </div>
            </div>
          )}

          <p className="body-small" style={{ 
            marginTop: '28px',
            color: 'var(--text-muted)',
            fontSize: '12px',
            lineHeight: '1.6'
          }}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

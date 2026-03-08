import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ChatbotPage from "./pages/ChatbotPage";
import Header from "./components/Header";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for existing session or handle OAuth callback
  useEffect(() => {
    const checkAuth = async () => {
      // Check for OAuth callback with session_id in URL
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get('session_id');

      if (sessionId) {
        try {
          // Exchange session_id for session_token
          const response = await fetch(`${API_URL}/api/auth/session`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ session_id: sessionId })
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            // Store in localStorage for persistence
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('session_token', userData.session_token);
            // Clean up URL
            window.history.replaceState({}, document.title, location.pathname);
            navigate('/');
          }
        } catch (error) {
          console.error('Auth callback error:', error);
        }
      } else {
        // Check for existing session in localStorage
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('session_token');
        
        if (storedUser && storedToken) {
          try {
            // Verify the session is still valid
            const response = await fetch(`${API_URL}/api/auth/me`, {
              headers: {
                'Authorization': `Bearer ${storedToken}`
              },
              credentials: 'include'
            });

            if (response.ok) {
              setUser(JSON.parse(storedUser));
            } else {
              // Session expired, clear storage
              localStorage.removeItem('user');
              localStorage.removeItem('session_token');
            }
          } catch (error) {
            console.error('Session check error:', error);
          }
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [location.pathname, navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('session_token');
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Clear local storage
    localStorage.removeItem('user');
    localStorage.removeItem('session_token');
    setUser(null);
    navigate('/');
  };

  // Don't show header on login page
  const showHeader = location.pathname !== '/login';

  if (loading) {
    return (
      <div className="App" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        background: 'var(--bg-primary)'
      }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      {showHeader && <Header user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/chatbot" element={<ChatbotPage user={user} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

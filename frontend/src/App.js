import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ChatbotPage from "./pages/ChatbotPage";
import Header from "./components/Header";

function AppContent() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    window.location.href = '/';
  };

  // Don't show header on login page
  const showHeader = location.pathname !== '/login';

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

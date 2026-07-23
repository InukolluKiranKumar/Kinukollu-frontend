import { useState, useEffect } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedName = localStorage.getItem('userName');
    if (storedToken && storedName) {
      setToken(storedToken);
      setUserName(storedName);
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (newToken, email, fullName) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userName', fullName);
    setToken(newToken);
    setUserName(fullName);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setToken(null);
    setUserName(null);
  };

  if (loading) {
    return null;
  }

  if (!token) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return <Dashboard token={token} userName={userName} onLogout={handleLogout} />;
}

export default App;

import { useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);

  const handleAuthSuccess = (newToken, email, fullName) => {
    setToken(newToken);
    setUserName(fullName);
  };

  if (!token) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return <Dashboard token={token} userName={userName} />;
}

export default App;

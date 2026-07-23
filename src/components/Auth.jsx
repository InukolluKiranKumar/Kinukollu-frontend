import { useState } from 'react';
import { login, signup } from '../api/client';

function Auth({ onAuthSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [state, setState] = useState('');
  const [occupation, setOccupation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isSignup) {
        result = await signup({
          email, password, fullName,
          age: age ? parseInt(age) : null,
          state, occupation,
        });
      } else {
        result = await login(email, password);
      }
      onAuthSuccess(result.token, result.email, result.fullName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: 10, marginBottom: 12 };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Kinukollu</h1>
      <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: -10 }}>
        India's AI Citizen Assistant
      </p>

      <form onSubmit={handleSubmit} className="card" style={{ marginTop: 20 }}>
        <h2 style={{ marginTop: 0 }}>{isSignup ? 'Sign Up' : 'Log In'}</h2>

        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />

        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />

        {isSignup && (
          <>
            <input type="text" placeholder="Full Name" value={fullName}
              onChange={(e) => setFullName(e.target.value)} required style={inputStyle} />
            <input type="number" placeholder="Age" value={age}
              onChange={(e) => setAge(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="State" value={state}
              onChange={(e) => setState(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="Occupation" value={occupation}
              onChange={(e) => setOccupation(e.target.value)} style={inputStyle} />
          </>
        )}

        {error && <p style={{ color: '#f87171' }}>{error}</p>}

        <button type="submit" disabled={loading} style={{ width: '100%', padding: 12 }}>
          {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Log In'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: 16, color: '#94a3b8' }}>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsSignup(!isSignup)}
          style={{ background: 'none', color: '#818cf8', padding: 0, fontWeight: 400 }}>
          {isSignup ? 'Log In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}

export default Auth;

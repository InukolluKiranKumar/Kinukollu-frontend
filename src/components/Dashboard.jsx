import { useState, useEffect } from 'react';
import { getCases, createCase, askAboutCase } from '../api/client';

function Dashboard({ token, userName }) {
  const [cases, setCases] = useState([]);
  const [query, setQuery] = useState('');
  const [caseType, setCaseType] = useState('RIGHTS_QUERY');
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      const data = await getCases(token);
      setCases(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      await createCase(token, caseType, query);
      setQuery('');
      await loadCases();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async (caseId) => {
    setLoading(true);
    try {
      const result = await askAboutCase(token, caseId);
      setAnswers((prev) => ({ ...prev, [caseId]: result.answer }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '50px auto', padding: 20 }}>
      <h1>Kinukollu</h1>
      <p style={{ color: '#cbd5e1', marginTop: -10 }}>Welcome, {userName}</p>

      <form onSubmit={handleSubmit} className="card">
        <select
          value={caseType}
          onChange={(e) => setCaseType(e.target.value)}
          style={{ width: '100%', marginBottom: 12 }}
        >
          <option value="RIGHTS_QUERY">Rights Question</option>
          <option value="SCHEME_MATCH">Scheme Match</option>
        </select>
        <textarea
          placeholder="Describe your situation or question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={4}
          style={{ width: '100%', marginBottom: 12 }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <h2>Your Cases</h2>
      {cases.length === 0 && <p style={{ color: '#cbd5e1' }}>No cases yet — submit your first question above.</p>}
      {cases.map((c) => (
        <div key={c.id} className="card">
          <span className="badge">{c.caseType.replace('_', ' ')}</span>
          <span className="badge" style={{ marginLeft: 8 }}>{c.status}</span>

          <div className="question-box">{c.summary}</div>

          {answers[c.id] ? (
            <div className="answer-box">{answers[c.id]}</div>
          ) : (
            <button onClick={() => handleAsk(c.id)} disabled={loading} style={{ padding: '8px 16px', marginTop: 12 }}>
              {loading ? 'Thinking...' : 'Get Answer'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;

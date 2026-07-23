const API_BASE_URL = 'http://localhost:8080/api';

export async function signup(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Signup failed');
  }
  return response.json();
}

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Login failed');
  }
  return response.json();
}

export async function getCases(token) {
  const response = await fetch(`${API_BASE_URL}/cases`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch cases');
  return response.json();
}

export async function createCase(token, caseType, query) {
  const response = await fetch(`${API_BASE_URL}/cases`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ caseType, query }),
  });
  if (!response.ok) throw new Error('Failed to create case');
  return response.json();
}

export async function askAboutCase(token, caseId) {
  const response = await fetch(`${API_BASE_URL}/cases/${caseId}/ask`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to get answer');
  return response.json();
}

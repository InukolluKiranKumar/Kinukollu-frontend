const API_BASE_URL = import.meta.env.VITE_API_URL;

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function handleResponse(response) {
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.reload();
    throw new ApiError('Session expired. Please log in again.', response.status);
  }
  if (!response.ok) {
    const error = await response.text();
    throw new ApiError(error || 'Request failed', response.status);
  }
  return response.json();
}

export async function signup(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
}

export async function getCases(token) {
  const response = await fetch(`${API_BASE_URL}/cases`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleResponse(response);
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
  return handleResponse(response);
}

export async function askAboutCase(token, caseId) {
  const response = await fetch(`${API_BASE_URL}/cases/${caseId}/ask`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleResponse(response);
}

const baseURL = import.meta.env.VITE_BACKEND_URL;

// Helper to attach auth token automatically
function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// GET /cats
export async function fetchCats() {
    const response = await fetch(`${baseURL}/api/v1/cats`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch cats');
    }
  
    return response.json();
  }
  
// GET /users/:id
export async function fetchUser(userId) {
  const res = await fetch(`${baseURL}/api/v1/users/${userId}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

// GET /users/me
export const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseURL}/api/v1/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Unauthorized");
    }
  
    return await response.json();
  };
  

// GET /users/:id/most_used_cat
export async function fetchMostUsedCat(userId) {
  const res = await fetch(`${baseURL}/api/v1/users/${userId}/most_used_cat`, {
    headers: authHeaders(),
  });
  return res.json();
}

// POST /users
export async function createUser(userData) {
  const res = await fetch(`${baseURL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: userData }),
  });
  return res;
}

// POST /login
export async function loginUser(credentials) {
  const res = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res;
}

// POST /sessions
export async function createSession(sessionData) {
  const res = await fetch(`${baseURL}/sessions`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ session: sessionData }),
  });
  if (!res.ok) throw new Error("Failed to log session");
  return res.json();
}

export async function post(path, body) {
    const res = await fetch(`${baseURL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res;
  }
  
  export async function get(path) {
    const res = await fetch(`${baseURL}${path}`, {
      method: "GET",
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Failed GET request");
    return res.json();
  }
  
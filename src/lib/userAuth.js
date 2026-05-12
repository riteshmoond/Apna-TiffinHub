const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const USER_TOKEN_KEY = "royal-tiffin-user-token";
const USER_KEY = "royal-tiffin-user";

const request = async (path, options = {}) => {
  const token = getUserToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const getUserToken = () => localStorage.getItem(USER_TOKEN_KEY);

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
};

export const setUserSession = ({ token, user }) => {
  localStorage.setItem(USER_TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearUserSession = () => {
  localStorage.removeItem(USER_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const loginUser = (payload) =>
  request("/users/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const registerUser = (payload) =>
  request("/users/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateUserProfile = async (payload) => {
  const data = await request("/users/me", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data;
};

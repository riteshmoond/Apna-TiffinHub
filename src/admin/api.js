const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "royal-tiffin-admin-token";
const LEGACY_SESSION_KEY = "royal-tiffin-admin";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setSession = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(LEGACY_SESSION_KEY, "logged-in");
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LEGACY_SESSION_KEY);
};

export const isAdminLoggedIn = () =>
  Boolean(localStorage.getItem(TOKEN_KEY));

const request = async (path, options = {}) => {
  const token = getToken();
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
    throw new Error(data.message || "API request failed");
  }

  return data;
};

export const api = {
  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getOrders: () => request("/orders"),
  updateOrderStatus: (id, status, etaMinutes) =>
    request(`/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify(etaMinutes ? { status, etaMinutes } : { status }),
    }),
  getCustomers: () => request("/customers"),
  getMeals: () => request("/meals"),
  createMeal: (payload) =>
    request("/meals", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  deleteMeal: (id) =>
    request(`/meals/${id}`, {
      method: "DELETE",
    }),
  getMenu: () => request("/menu"),
  updateMenu: (items) =>
    request("/menu", {
      method: "PUT",
      body: JSON.stringify({ items }),
    }),
  getRevenue: () => request("/revenue"),
  getAnalytics: () => request("/analytics"),
  getCatalog: () => request("/catalog"),
  createCatalogItem: (payload) =>
    request("/catalog", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateCatalogItem: (id, payload) =>
    request(`/catalog/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteCatalogItem: (id) =>
    request(`/catalog/${id}`, {
      method: "DELETE",
    }),
  getGallery: () => request("/gallery"),
  createGalleryItem: (payload) =>
    request("/gallery", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateGalleryItem: (id, payload) =>
    request(`/gallery/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteGalleryItem: (id) =>
    request(`/gallery/${id}`, {
      method: "DELETE",
    }),
};

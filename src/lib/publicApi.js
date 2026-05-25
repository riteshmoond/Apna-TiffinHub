const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const createOrder = async (order, token) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(order),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Order submit failed");
  }

  return data;
};

export const getMyOrders = async (token) => {
  const response = await fetch(`${API_BASE_URL}/orders/my`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Orders load failed");
  }

  return data;
};

export const cancelMyOrder = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/orders/my/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Cancel order failed");
  }

  return data;
};

export const getCatalog = async () => {
  const response = await fetch(`${API_BASE_URL}/catalog`);
  const data = await response.json().catch(() => ([]));
  if (!response.ok) {
    throw new Error(data.message || "Catalog load failed");
  }
  return data;
};

export const getGallery = async () => {
  const response = await fetch(`${API_BASE_URL}/gallery`);
  const data = await response.json().catch(() => ([]));
  if (!response.ok) {
    throw new Error(data.message || "Gallery load failed");
  }
  return data;
};

export const getWeeklyMenu = async () => {
  const response = await fetch(`${API_BASE_URL}/menu`);
  const data = await response.json().catch(() => ([]));
  if (!response.ok) {
    throw new Error(data.message || "Menu load failed");
  }
  return data;
};

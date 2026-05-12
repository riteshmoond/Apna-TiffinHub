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

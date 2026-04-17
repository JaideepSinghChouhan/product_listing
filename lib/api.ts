const BASE_URL = "/api";

export const api = async (url: string, options: any = {}) => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });

  return res.json();
};
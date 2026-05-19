const BASE_URL = "/api";

const redirectToLogin = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("token");
  localStorage.removeItem("adminUser");
  window.location.href = "/admin/login";
};

export const api = async (url: string, options: any = {}) => {
  const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
  const isProtectedAdminCall = url.startsWith("/admin") || url.startsWith("/leads") || url.startsWith("/products") || url.startsWith("/categories") || url.startsWith("/hero") || url.startsWith("/videos") || url.startsWith("/dashboard") || url.startsWith("/contact");

  if (isProtectedAdminCall && !token) {
    redirectToLogin();
    throw new Error("No token");
  }

  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });

  if (res.status === 401 || res.status === 403) {
    redirectToLogin();
    throw new Error("Unauthorized");
  }

  try {
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};

    // If response is not ok (4xx, 5xx), throw the error message
    if (!res.ok) {
      const errorMsg = data.error || `Server error (${res.status})`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err: any) {
    // If it's already an error with our message, rethrow it
    if (err instanceof Error) {
      throw err;
    }
    console.error("Failed to parse response:", { status: res.status, error: err });
    throw new Error(`Server error (${res.status})`);
  }
};
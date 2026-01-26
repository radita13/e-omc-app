import { useAuthStore } from "@/store/useAuthStore";
import { isTokenExpired } from "@/lib/tokenUtils";

/**
 * Fetch wrapper dengan automatic token expiry handling
 * @param {string} url - URL endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Response>}
 */
export const fetchWithAuth = async (url, options = {}) => {
  const token = useAuthStore.getState().token;

  const headers = {
    ...options.headers,
  };

  if (token) {
    if (isTokenExpired(token)) {
      console.warn("Token expired before request, logging out...");
      const logout = useAuthStore.getState().logout;
      logout();
      throw new Error("Token expired");
    }

    headers.Authorization = `Bearer ${token}`;
  }

  const finalOptions = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, finalOptions);

    if (response.status === 401) {
      console.warn("Received 401 Unauthorized, token might be expired");
      const logout = useAuthStore.getState().logout;
      logout();
      throw new Error("Unauthorized - token expired");
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

/**
 * Secure GET request dengan auth
 */
export const secureGet = (url, options = {}) => {
  return fetchWithAuth(url, {
    ...options,
    method: "GET",
  });
};

/**
 * Secure POST request dengan auth
 */
export const securePost = (url, data, options = {}) => {
  return fetchWithAuth(url, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(data),
  });
};

/**
 * Secure PUT request dengan auth
 */
export const securePut = (url, data, options = {}) => {
  return fetchWithAuth(url, {
    ...options,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(data),
  });
};

/**
 * Secure DELETE request dengan auth
 */
export const secureDelete = (url, options = {}) => {
  return fetchWithAuth(url, {
    ...options,
    method: "DELETE",
  });
};

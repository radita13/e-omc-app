import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

/**
 * Cek apakah token sudah expired
 * @param {string} token - JWT token
 * @returns {boolean} - true jika token sudah expired
 */
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiry:", error);
    return true;
  }
};

export const getTokenTimeRemaining = (token) => {
  if (!token) return 0;

  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return 0;

    const currentTime = Date.now() / 1000;
    const timeRemaining = decoded.exp - currentTime;

    return Math.floor(timeRemaining / 60);
  } catch (error) {
    console.error("Error calculating token time remaining:", error);
    return 0;
  }
};

/**
 * Setup interceptor untuk handle token expired
 * @param {Function} logoutCallback - Function yang dipanggil saat logout
 */
export const setupTokenInterceptor = (logoutCallback) => {
  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const response = await originalFetch.apply(window, args);

    if (response.status === 401) {
      console.warn("Token expired or unauthorized");
      logoutCallback?.();
    }

    return response;
  };
};

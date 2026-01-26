import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { isTokenExpired } from "@/lib/tokenUtils";
import { toast } from "sonner";

/**
 * Hook untuk mengecek token validity secara berkala
 * @param {Object} options - Opsi konfigurasi
 * @param {number} options.checkInterval - Interval dalam ms untuk check (default: 30000)
 * @param {boolean} options.showNotification - Tampilkan notification saat expired (default: true)
 * @param {Function} options.onTokenExpired - Callback saat token expired
 */
export const useTokenExpiry = (options = {}) => {
  const {
    checkInterval = 30000,
    showNotification = true,
    onTokenExpired = null,
  } = options;

  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const notificationShownRef = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      notificationShownRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    const checkTokenValidity = () => {
      if (isTokenExpired(token)) {
        console.warn("Token expired, initiating logout...");

        if (!notificationShownRef.current && showNotification) {
          toast.error("Sesi Anda telah berakhir. Silakan login kembali.", {
            duration: 4000,
          });
          notificationShownRef.current = true;
        }

        if (onTokenExpired) {
          onTokenExpired();
        }

        setTimeout(() => {
          logout();
          router.replace("/auth/login?message=session_expired");
        }, 1000);
      }
    };

    checkTokenValidity();

    intervalRef.current = setInterval(checkTokenValidity, checkInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [
    isAuthenticated,
    token,
    logout,
    router,
    checkInterval,
    showNotification,
    onTokenExpired,
  ]);

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
};

"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useRef } from "react";

export function ZustandInitializer() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      checkAuth();
      hasInitialized.current = true;
    }
  }, [checkAuth]);

  return null;
}

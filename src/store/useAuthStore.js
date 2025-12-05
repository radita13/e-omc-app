"use client";

import { create } from "zustand";
import { loginUser } from "@/services/auth.Service";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,

  login: async (email, no_hp, password) => {
    const result = await loginUser(email, no_hp, password);

    if (result.success) {
      const { token, ...userData } = result.data;

      // Simpan ke localStorage
      localStorage.setItem("omc_token", token);
      localStorage.setItem("omc_user", JSON.stringify(userData));

      // Update state
      set({ user: userData, token, isAuthenticated: true });

      return { success: true };
    } else {
      return { success: false, error: result.error, errors: result.errors };
    }
  },

  logout: () => {
    localStorage.removeItem("omc_token");
    localStorage.removeItem("omc_user");

    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: () => {
    try {
      const storedToken = localStorage.getItem("omc_token");
      const storedUser = localStorage.getItem("omc_user");

      if (storedToken && storedUser && storedUser !== "undefined") {
        set({
          token: storedToken,
          user: JSON.parse(storedUser),
          isAuthenticated: true,
        });
      }
    } catch (e) {
      console.error("Gagal memuat auth dari localStorage", e);
      localStorage.removeItem("omc_token");
      localStorage.removeItem("omc_user");
    }
    set({ loading: false });
  },

  setUser: (userData) => {
    set({ user: userData });
    localStorage.setItem("omc_user", JSON.stringify(userData)); // simpan ke localStorage juga
  },
}));

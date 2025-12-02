"use client";
import { useAuthStore } from "@/store/useAuthStore";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get my profile
export const getMyProfile = async () => {
  const token = useAuthStore.getState().token;
  if (!token) return { success: false, error: "Tidak ada token otorisasi." };

  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Gagal mengambil profil.",
      };
    }
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di getMyProfile:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

// Update my profile
export const updateMyProfile = async (profileData) => {
  const { token, setUser } = useAuthStore.getState();
  if (!token) return { success: false, error: "Tidak ada token otorisasi." };

  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Gagal memperbarui profil.",
      };
    }

    setUser(data.data);

    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di updateMyProfile:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

"use client";
import { useAuthStore } from "@/store/useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeader = () => {
  const token = useAuthStore.getState().token;
  if (!token) throw new Error("Tidak ada token otorisasi.");
  return { Authorization: `Bearer ${token}` };
};

// Mengambil data statistik dashboard
export const getDashboardStats = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/dashboard/stats`, {
      method: "GET",
      headers: getAuthHeader(),
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok)
      return { success: false, error: data.message || "Gagal mengambil data." };
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di getDashboardStats:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

// Mengambil data linimasa asesmen untuk chart
export const getAssessmentTimeline = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/dashboard/timeline`, {
      method: "GET",
      headers: getAuthHeader(),
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok)
      return {
        success: false,
        error: data.message || "Gagal mengambil data chart.",
      };
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di getAssessmentTimeline:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

// Mengambil all user/pasien
export const getAllUsers = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_URL}/admin/users?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: getAuthHeader(),
        cache: "no-store",
      }
    );
    const data = await response.json();
    if (!response.ok)
      return { success: false, error: data.message || "Gagal mengambil data." };
    return { success: true, data: data.data, pagination: data.pagination };
  } catch (error) {
    console.error("Error di getAllUsers:", error);
    return {
      success: false,
      error: error.message || "Tidak bisa terhubung ke server.",
    };
  }
};

// Menghapus user/pasien By Id
export const deleteUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    const data = await response.json();
    if (!response.ok)
      return { success: false, error: data.message || "Gagal menghapus data." };
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di deleteUser:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

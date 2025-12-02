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

export const downloadExcelReport = async (startDate, endDate) => {
  try {
    const url = `${API_URL}/admin/export/excel?startDate=${startDate}&endDate=${endDate}`;

    const response = await fetch(url, {
      method: "GET",
      headers: getAuthHeader(), // Pastikan token terkirim
    });

    // --- PERBAIKAN DI SINI ---
    if (!response.ok) {
      // Coba baca pesan error JSON dari backend
      let errorMessage = "Gagal mengunduh laporan.";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Jika backend error HTML (500/404), ambil status text
        errorMessage = `Error ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    // -------------------------

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `Laporan_OMC_${startDate}_sd_${endDate}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);

    return { success: true };
  } catch (error) {
    console.error("Download Error:", error);
    // Return pesan error asli ke UI
    return { success: false, error: error.message };
  }
};

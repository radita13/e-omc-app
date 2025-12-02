"use client";
import { useAuthStore } from "@/store/useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeader = () => {
  const token = useAuthStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🔹 GET all article
export const getAllArticles = async (page = 1, limit = 5) => {
  try {
    const res = await fetch(
      `${API_URL}/admin/articles?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: getAuthHeader(),
        cache: "no-store",
      }
    );
    const data = await res.json();
    if (!res.ok)
      return {
        success: false,
        error: data.message || "Gagal mengambil artikel.",
      };

    return {
      success: true,
      data: data.data || data,
      pagination: data.pagination,
    };
  } catch (err) {
    console.error("Error di getAllArticles:", err);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

//  GET by ID
export const getArticleById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/admin/articles/${id}`, {
      method: "GET",
      headers: getAuthHeader(),
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok)
      return {
        success: false,
        error: data.message || "Gagal mengambil artikel.",
      };

    return { success: true, data: data.data || data };
  } catch (err) {
    console.error("Error di getArticleById:", err);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

//  CREATE
export const createArticle = async (formData) => {
  try {
    const res = await fetch(`${API_URL}/admin/articles`, {
      method: "POST",
      headers: getAuthHeader(),
      body: formData,
    });
    const data = await res.json();
    if (!res.ok)
      return {
        success: false,
        error: data.message || "Gagal menambahkan artikel.",
      };

    return { success: true, data: data.data || data };
  } catch (err) {
    console.error("Error di createArticle:", err);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

//  UPDATE
export const updateArticle = async (id, formData) => {
  try {
    const res = await fetch(`${API_URL}/admin/articles/${id}`, {
      method: "PUT",
      headers: getAuthHeader(),
      body: formData,
    });
    const data = await res.json();
    if (!res.ok)
      return {
        success: false,
        error: data.message || "Gagal memperbarui artikel.",
      };

    return { success: true, data: data.data || data };
  } catch (err) {
    console.error("Error di updateArticle:", err);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

// DELETE
export const deleteArticleById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/admin/articles/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    const data = await res.json();
    if (!res.ok)
      return {
        success: false,
        error: data.message || "Gagal menghapus artikel.",
      };

    return { success: true, data: data.data || data };
  } catch (err) {
    console.error("Error di deleteArticleById:", err);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

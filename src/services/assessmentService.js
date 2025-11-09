"use client";
import { useAuthStore } from "@/store/useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Mengambil 3 riwayat assessment terakhir untuk user yang login
 */
export const getSubmissionHistory = async () => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) return { success: false, error: "Tidak ada token otorisasi." };

    const response = await fetch(`${API_URL}/submissions/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok)
      return {
        success: false,
        error: data.message || "Gagal mengambil riwayat.",
      };
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di getSubmissionHistory:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

/**
 * Memulai assessment baru untuk template tertentu
 */
export const startAssessment = async (templateId) => {
  try {
    const token = useAuthStore.getState().token;
    if (!token) return { success: false, error: "Tidak ada token otorisasi." };

    const response = await fetch(`${API_URL}/submissions/start/${templateId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok)
      return {
        success: false,
        error: data.message || "Gagal memulai assessment.",
      };
    // data.data berisi { submissionId, question }
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di startAssessment:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

/**
 * Mengirim jawaban untuk satu pertanyaan dalam assessment
 */
export const submitAnswer = async (submissionId, answerData) => {
  // answerData bisa berupa { questionId, optionId } atau { questionId, optionIds }
  try {
    const token = useAuthStore.getState().token;
    if (!token) return { success: false, error: "Tidak ada token otorisasi." };

    const response = await fetch(
      `${API_URL}/submissions/${submissionId}/answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(answerData),
      }
    );
    const data = await response.json();
    if (!response.ok)
      return {
        success: false,
        error: data.message || "Gagal mengirim jawaban.",
      };
    // data.status bisa 'continue' atau 'completed'
    // data.data berisi { question } atau { submission }
    return { success: true, status: data.status, data: data.data };
  } catch (error) {
    console.error("Error di submitAnswer:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

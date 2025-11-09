"use client";

import { create } from "zustand";
import { startAssessment, submitAnswer } from "@/services/assessmentService";

// State yang akan disimpan selama assessment
const initialState = {
  submissionId: null,
  currentQuestion: null,
  finalResult: null,
  status: "idle", // 'idle', 'loading', 'active', 'completed', 'error'
  error: null,
};

export const useAssessmentStore = create((set, get) => ({
  ...initialState,
  start: async (templateId) => {
    set({ status: "loading", error: null });
    const result = await startAssessment(templateId);
    if (result.success) {
      set({
        submissionId: result.data.submissionId,
        currentQuestion: result.data.question,
        status: "active",
        finalResult: null,
      });
    } else {
      set({ status: "error", error: result.error });
    }
  },

  /**
   * (Action) Mengirim jawaban dan mendapatkan pertanyaan/hasil berikutnya
   */
  answer: async (answerData) => {
    const { submissionId } = get(); // Ambil submissionId saat ini dari state
    if (!submissionId || get().status !== "active") return; // Jangan lakukan apa-apa jika tidak aktif

    set({ status: "loading", error: null });
    const result = await submitAnswer(submissionId, answerData);

    if (result.success) {
      if (result.status === "continue") {
        // Assessment berlanjut
        set({
          currentQuestion: result.data.question,
          status: "active",
        });
      } else if (result.status === "completed") {
        // Assessment selesai
        set({
          currentQuestion: null,
          finalResult: result.data, // Simpan hasil akhir
          status: "completed",
        });
      }
    } else {
      set({ status: "error", error: result.error });
    }
  },

  /**
   * (Action) Mereset state saat user meninggalkan halaman
   */
  reset: () => {
    set(initialState);
  },
}));

"use client";

import { create } from "zustand";
import { startAssessment, submitAnswer } from "@/services/assessment.Service";

const initialState = {
  submissionId: null,
  currentQuestion: null,
  currentStep: 1,
  history: [],
  answers: {},
  finalResult: null,
  status: "idle",
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
        currentStep: 1,
        history: [],
        answers: {},
        status: "active",
        finalResult: null,
      });
    } else {
      set({ status: "error", error: result.error });
    }
  },

  answer: async (answerData) => {
    const { submissionId, currentQuestion, currentStep, history, answers } =
      get();
    if (!submissionId || get().status !== "active") return;

    set({ status: "loading", error: null });
    const result = await submitAnswer(submissionId, answerData);

    if (result.success) {
      const updatedAnswers = {
        ...answers,
        [answerData.questionId]: answerData,
      };

      if (result.status === "continue") {
        set({
          history: [
            ...history,
            { question: currentQuestion, answerData, step: currentStep || 1 },
          ],
          answers: updatedAnswers,
          currentQuestion: result.data.question,
          currentStep: (currentStep || 1) + 1,
          status: "active",
        });
      } else if (result.status === "completed") {
        set({
          history: [
            ...history,
            { question: currentQuestion, answerData, step: currentStep || 1 },
          ],
          answers: updatedAnswers,
          currentQuestion: null,
          finalResult: result.data,
          status: "completed",
        });
      }
    } else {
      set({ status: "error", error: result.error });
    }
  },

  goBack: () => {
    const { history } = get();
    if (!history || history.length === 0) return;

    const previousItem = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    set({
      history: newHistory,
      currentQuestion: previousItem.question,
      currentStep: previousItem.step,
      status: "active",
    });
  },

  reset: () => {
    set(initialState);
  },
}));

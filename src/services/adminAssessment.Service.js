import { useAuthStore } from "@/store/useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeader = () => {
  const token = useAuthStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all assessment templates (admin)
export const getAllTemplates = async () => {
  console.log("1. Fungsi getAllTemplates terpanggil!");
  try {
    const res = await fetch(`${API_URL}/admin/assessments`, {
      method: "GET",
      headers: getAuthHeader(),
      cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.message || "failed to fetch assessment templates",
      };
    }
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error in getAllTemplates:", error);
    return { success: false, error: "Cannot connect to server." };
  }
};

// Get assessment by id (admin)
export const getTemplateById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/admin/assessments/${id}`, {
      method: "GET",
      headers: getAuthHeader(),
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok)
      return {
        success: false,
        error: data.message || "failed to fetch detail assessment template",
      };
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error in getTemplateById:", error);
    return { success: false, error: "Cannot connect to server." };
  }
};

// Create new assessment template (admin)
export const createTemplete = async (jsonData) => {
  try {
    const res = await fetch(`${API_URL}/admin/assessments`, {
      method: "POST",
      headers: {
        ...getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.message || "failed to create new assessment template",
      };
    }
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error in createTemplete:", error);
    return { success: false, error: "Cannot connect to server." };
  }
};

// Update Draft assessment template (admin)
export const updateDraftTemplate = async (id, jsonData) => {
  try {
    const res = await fetch(`${API_URL}/admin/assessments/${id}`, {
      method: "PUT",
      headers: {
        ...getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.message || "failed to update assessment template",
      };
    }
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error in updateDraftTemplate:", error);
    return { success: false, error: "Cannot connect to server." };
  }
};

// Publish assessment template (admin)
export const publishTemplate = async (id) => {
  try {
    const res = await fetch(`${API_URL}/admin/assessments/${id}/publish`, {
      method: "POST",
      headers: getAuthHeader(),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.message || "failed to publish assessment template",
      };
    }
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error in publishTemplate:", error);
    return { success: false, error: "Cannot connect to server." };
  }
};

// Duplicate assessment template (admin)
export const duplicateTemplate = async (id) => {
  try {
    const res = await fetch(`${API_URL}/admin/assessments/${id}/duplicate`, {
      method: "POST",
      headers: getAuthHeader(),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.message || "failed to duplicate assessment template",
      };
    }
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error in duplicateTemplate:", error);
    return { success: false, error: "Cannot connect to server." };
  }
};

// Delete assessment template (admin)
export const deleteTemplate = async (id) => {
  try {
    const res = await fetch(`${API_URL}/admin/assessments/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.message || "failed to delete assessment template",
      };
    }
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error in deleteTemplate:", error);
    return { success: false, error: "Cannot connect to server." };
  }
};

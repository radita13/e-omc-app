const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get all assessment templates
export const getAssessmentTemplates = async () => {
  try {
    const response = await fetch(`${API_URL}/templates`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Gagal mengambil daftar template.",
      };
    }
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di getAssessmentTemplates:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

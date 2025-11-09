const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Mengambil daftar artikel
 * @param {string} category - 'pasien' atau 'petugas'
 */
export const getArticles = async (category) => {
  try {
    const response = await fetch(`${API_URL}/articles?category=${category}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Gagal mengambil artikel.",
      };
    }
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di getArticles:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

/**
 * Mengambil satu artikel (termasuk semua gambar detail [src: 280])
 * @param {string} slug - URL-friendly slug
 */
export const getArticleBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_URL}/articles/${slug}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.message || "Artikel tidak ditemukan.",
      };
    }
    // data.data akan berisi satu objek artikel, termasuk array 'images' [src: 280]
    return { success: true, data: data.data };
  } catch (error) {
    console.error("Error di getArticleBySlug:", error);
    return { success: false, error: "Tidak bisa terhubung ke server." };
  }
};

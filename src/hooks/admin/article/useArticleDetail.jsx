"use client";

import { useEffect, useState } from "react";
import { getArticleById } from "@/services/adminArticleService";

export function useArticleDetail(id) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const result = await getArticleById(id);

        if (result.success || result.status === "success") {
          setArticle(result.data);
        } else {
          setError(result.error || "Gagal memuat data artikel.");
        }
      } catch (err) {
        console.error(err);
        setError("Terjadi kesalahan saat memuat artikel.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return { article, loading, error };
}

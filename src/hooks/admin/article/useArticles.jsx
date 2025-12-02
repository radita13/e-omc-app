"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getAllArticles,
  deleteArticleById,
} from "@/services/adminArticle.Service";

export function useArticles(limit = 5) {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchArticles = useCallback(
    async (currentPage = 1) => {
      setLoading(true);
      const result = await getAllArticles(currentPage, limit);
      if (result.success || result.status === "success") {
        setArticles(result.data);
        setPagination(result.pagination);
        setPage(result.page);
      } else {
        console.error(result.error);
      }
      setLoading(false);
    },
    [limit]
  );

  const deleteArticle = useCallback(
    async (id) => {
      if (!confirm("Yakin ingin menghapus artikel ini?")) return false;
      const result = await deleteArticleById(id);
      if (result.success) {
        alert("Artikel berhasil dihapus!");
        await fetchArticles(page);
        return true;
      } else {
        alert(result.error);
        return false;
      }
    },
    [fetchArticles, page]
  );

  useEffect(() => {
    (async () => {
      await fetchArticles(page);
    })();
  }, [fetchArticles, page]);

  return {
    articles,
    pagination,
    loading,
    page,
    setPage,
    fetchArticles,
    deleteArticle,
  };
}

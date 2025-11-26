"use client";
import { useState, useEffect, useCallback } from "react";
import { getAllUsers, deleteUserById } from "@/services/adminService";

export const useUserManage = (initialPage = 1, initialLimit = 10) => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    limit: initialLimit,
    totalPages: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔁 Ambil data user dari backend
  const fetchUsers = useCallback(
    async (page = pagination.currentPage, limit = pagination.limit) => {
      try {
        setLoading(true);
        setError(null);

        const res = await getAllUsers(page, limit);
        if (res.success) {
          setUsers(res.data || []);
          setPagination((prev) => ({
            ...prev,
            currentPage: page,
            limit,
            totalPages: res.pagination?.totalPages ?? prev.totalPages,
            total: res.pagination?.total ?? prev.total,
          }));
        } else {
          setError(res.error || "Gagal memuat data pengguna.");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    },
    [pagination.currentPage, pagination.limit]
  );

  // 🚀 Panggil hanya sekali setelah render pertama
  useEffect(() => {
    fetchUsers(pagination.currentPage, pagination.limit);
  }, [fetchUsers, pagination.currentPage, pagination.limit]);

  // 🗑️ Fungsi untuk menghapus user
  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) return;
      try {
        setLoading(true);
        const res = await deleteUserById(id);
        if (res.success) {
          await fetchUsers(pagination.currentPage, pagination.limit);
        } else {
          setError(res.error || "Gagal menghapus user.");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat menghapus user.");
      } finally {
        setLoading(false);
      }
    },
    [fetchUsers, pagination.currentPage, pagination.limit]
  );

  const goToPage = useCallback(
    (newPage) => {
      if (newPage >= 1 && newPage <= Math.max(1, pagination.totalPages)) {
        setPagination((p) => ({ ...p, currentPage: newPage }));
      }
    },
    [pagination.totalPages]
  );

  const setLimit = useCallback((newLimit) => {
    setPagination((p) => ({ ...p, limit: newLimit, page: 1 })); // reset ke halaman 1 saat ubah limit
  }, []);

  const refresh = useCallback(() => {
    fetchUsers(pagination.currentPage, pagination.limit);
  }, [fetchUsers, pagination.currentPage, pagination.limit]);

  return {
    users,
    loading,
    error,
    pagination,
    fetchUsers,
    handleDelete,
    goToPage,
    setLimit,
    refresh,
  };
};

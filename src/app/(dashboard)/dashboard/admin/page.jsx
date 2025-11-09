"use client";

import { Loader2, Users, FileText, CheckCircle, BookOpen } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import { StatCard } from "@/components/dashboard/admin/StatsCard";
import { AssessmentChart } from "@/components/dashboard/admin/AssessmentChart";

export default function AdminDashboardPage() {
  const { stats, timelineData, loading, error } = useAdminDashboard();
  const user = useAuthStore((state) => state.user);
  const userName = user?.username || "Admin Petugas";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-cyan-600" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-6">Error: {error}</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="w-full rounded-xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold text-gray-800">
            Selamat datang, <span className="text-cyan-600">{userName}</span> 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Berikut ringkasan aktivitas terbaru di sistem hari ini.
          </p>
        </div>
      </div>

      {/* Statistik Kartu */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pasien"
          value={stats?.totalPatients ?? 0}
          description="Jumlah total akun pasien yang terdaftar."
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Total Assessment Selesai"
          value={stats?.totalSubmissions ?? 0}
          description="Total jumlah assessment yang telah diselesaikan."
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Pasien Unik (Assessment)"
          value={stats?.uniqueUsersAssessed ?? 0}
          description="Jumlah pasien yang pernah menyelesaikan assessment."
          icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Total Artikel Edukasi"
          value={stats?.totalArticles ?? 0}
          description="Jumlah artikel (pasien & petugas) yang dipublikasi."
          icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Chart Timeline */}
      <AssessmentChart data={timelineData ?? []} />
    </div>
  );
}

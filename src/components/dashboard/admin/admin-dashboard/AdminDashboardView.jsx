"use client";

import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";
import { AssessmentChart } from "@/components/dashboard/admin/admin-dashboard/AssessmentChart";
import { ExportReportCard } from "@/components/dashboard/admin/admin-dashboard/ExportReportCard";
import { DashboardHeader } from "@/components/dashboard/admin/admin-dashboard/DashboardHeader";
import { StatsSection } from "@/components/dashboard/admin/admin-dashboard/StatsSection";
import { ClinicalGradeCard } from "@/components/dashboard/admin/admin-dashboard/ClinicalGradeCard";

export default function DashboardView() {
  const { stats, timelineData, loading, error } = useAdminDashboard();
  const user = useAuthStore((state) => state.user);

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

  const getGradeCount = (grade) => stats?.statsByGrade?.[grade] ?? 0;

  return (
    <div className="space-y-6">
      <DashboardHeader userName={user?.username || "Admin Petugas"} />

      <StatsSection stats={stats} />

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-6">
          Pemetaan Kondisi Klinis
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[0, 1, 2, 3, 4].map((grade) => (
            <ClinicalGradeCard
              key={grade}
              grade={grade}
              count={getGradeCount(grade)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-6">
          Tren Asesmen Bulanan
        </h3>
        <AssessmentChart data={timelineData ?? []} />
      </div>

      <div>
        <ExportReportCard />
      </div>
    </div>
  );
}

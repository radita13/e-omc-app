"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle, Clock, FileText, Users } from "lucide-react";

export function StatCard({ title, value, icon, description }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export const StatsSection = ({ stats }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-6">
        Statistik Sistem
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Pasien"
          value={stats?.totalPatients ?? 0}
          description="Jumlah total akun pasien yang terdaftar."
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Total Asesmen Selesai"
          value={stats?.totalSubmissions ?? 0}
          description="Total jumlah assessment yang telah diselesaikan."
          icon={<FileText className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Aktivitas Assessment"
          value={stats?.totalSubmissions ?? 0}
          description="Asesmen yang masuk hari ini"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Pasien Asesmen Selesai"
          value={stats?.uniqueUsersAssessed ?? 0}
          description="Jumlah pasien yang pernah menyelesaikan asesmen."
          icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Total Artikel Edukasi"
          value={stats?.totalArticles ?? 0}
          description="Jumlah artikel (pasien & petugas) yang dipublikasi."
          icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
    </div>
  );
};

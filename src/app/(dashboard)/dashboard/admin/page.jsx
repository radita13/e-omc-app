import AdminDashboardView from "@/components/dashboard/admin/admin-dashboard/AdminDashboardView";

export const metadata = {
  title: "Dashboard Admin",
  description:
    "Pusat kontrol data pasien, statistik asesmen, dan pemetaan kondisi klinis.",
};

export default function AdminDashboardPage() {
  return <AdminDashboardView />;
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAllTemplates,
  publishTemplate,
  duplicateTemplate,
  deleteTemplate,
} from "@/services/adminAssessment.Service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Edit, Copy, Eye, CheckCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminAssessmentList() {
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await getAllTemplates();

      if (response.success) {
        const sorted = response.data.sort((a, b) => {
          const statusOrder = { published: 1, draft: 2, archived: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
        setTemplates(sorted);
      }
    } catch (error) {
      toast.error("Gagal memuat data template");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- HANDLE EDIT ---
  const handleEdit = async (template) => {
    // KASUS 1: Jika DRAFT, langsung edit saja
    if (template.status === "draft") {
      router.push(`/dashboard/assessment/edit/${template.id}`);
      return;
    }

    // KASUS 2: Jika PUBLISHED, harus Duplicate dulu
    if (template.status === "published") {
      if (
        !confirm(
          "Template ini sedang AKTIF. Untuk mengedit, sistem akan membuat versi Draft baru. Lanjutkan?"
        )
      )
        return;

      setActionLoading(template.id);
      try {
        const res = await duplicateTemplate(template.id);
        if (res.success) {
          toast.success("Versi Draft berhasil dibuat!", { duration: 5000 });

          await fetchData();

          router.refresh();

          router.push(`/dashboard/assessment/edit/${res.data.newDraftId}`);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Gagal menduplikasi template");
      } finally {
        setActionLoading(null);
      }
    }
  };

  // --- HANDLE PUBLISH ---
  const handlePublish = async (id) => {
    if (
      !confirm(
        "Apakah Anda yakin ingin menayangkan template ini? Template lama akan diarsipkan."
      )
    )
      return;

    setActionLoading(id);
    try {
      const res = await publishTemplate(id);
      if (res.success) {
        toast.success("Template berhasil dipublish!", {
          duration: 5000,
        });

        router.refresh();

        await fetchData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Gagal publish template");
    } finally {
      setActionLoading(null);
    }
  };

  // HANDLE DELETE
  const handleDelete = async (template) => {
    if (
      !confirm(
        `Apakah Anda yakin ingin MENGHAPUS PERMANEN template "${template.title}"? Tindakan ini tidak bisa dibatalkan.`
      )
    )
      return;

    setActionLoading(template.id);
    try {
      const res = await deleteTemplate(template.id);

      if (res.success) {
        toast.success("Template berhasil dihapus!", { duration: 5000 });
        await fetchData();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-600">Active / Published</Badge>;
      case "draft":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
          >
            Draft
          </Badge>
        );
      case "archived":
        return (
          <Badge variant="outline" className="text-gray-500">
            Archived
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (templates.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <Button
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/assessment/create")}
          >
            + Buat Baru
          </Button>
        </div>

        <div className="border rounded-lg bg-white">
          <Table className="space-x-5">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center">No</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[200px]">Tanggal</TableHead>
                <TableHead className="text-right pr-5">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Tidak ada data
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button
          className="cursor-pointer"
          onClick={() => router.push("/dashboard/assessment/create")}
        >
          + Buat Baru
        </Button>
      </div>

      <div className="border rounded-lg bg-white">
        <Table className="space-x-5">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">No</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[200px]">Tanggal</TableHead>
              <TableHead className="text-right pr-5">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((item, index) => (
              <TableRow
                key={item.id}
                className={
                  item.status === "archived" ? "opacity-60 bg-gray-50" : ""
                }
              >
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium">
                  {item.title}
                  {item.status === "draft" && (
                    <span className="ml-2 text-xs text-gray-400 italic">
                      (Belum tayang)
                    </span>
                  )}
                </TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-right pr-5 space-x-2">
                  {/* TOMBOL EDIT / DUPLICATE */}
                  {item.status !== "archived" && (
                    <Button
                      size="sm"
                      variant={
                        item.status === "published" ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => handleEdit(item)}
                      disabled={actionLoading === item.id}
                    >
                      {actionLoading === item.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : item.status === "published" ? (
                        <Copy className="w-4 h-4 mr-1" />
                      ) : (
                        <Edit className="w-4 h-4 mr-1" />
                      )}
                      {item.status === "published" ? "Duplicate" : "Edit"}
                    </Button>
                  )}

                  {/* TOMBOL PUBLISH (Hanya untuk Draft) */}
                  {item.status === "draft" && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handlePublish(item.id)}
                      disabled={actionLoading === item.id}
                    >
                      {actionLoading === item.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      )}
                      Publish
                    </Button>
                  )}

                  {/* TOMBOL LIHAT DETAIL (Untuk Archived) */}
                  {item.status === "archived" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`/dashboard/assessment/detail/${item.id}`)
                      }
                    >
                      <Eye className="w-4 h-4 mr-1" /> Lihat
                    </Button>
                  )}

                  {item.status !== "published" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => handleDelete(item)}
                      disabled={actionLoading === item.id}
                      title="Hapus Permanen"
                    >
                      {actionLoading === item.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

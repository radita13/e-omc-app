"use client";

import { useState } from "react";
import { downloadExcelReport } from "@/services/admin.Service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileSpreadsheet, Loader2, Download } from "lucide-react";
import { toast } from "sonner";

export function ExportReportCard() {
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .split("T")[0];

  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(today);

  const handleDownload = async () => {
    if (!startDate || !endDate) {
      toast.error("Harap pilih rentang tanggal terlebih dahulu.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Tanggal mulai tidak boleh lebih besar dari tanggal akhir.");
      return;
    }

    setLoading(true);
    try {
      const res = await downloadExcelReport(startDate, endDate);
      if (res.success) {
        toast.success("Laporan berhasil diunduh!");
      } else {
        toast.error(res.error || "Gagal mengunduh laporan.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full border-l-4 border-l-green-600 bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2 text-green-700 mb-1">
          <FileSpreadsheet className="h-5 w-5" />
          <CardTitle className="text-lg">Export Laporan Data</CardTitle>
        </div>
        <CardDescription>
          Unduh rekapitulasi hasil asesmen pasien dalam format Excel (.xlsx).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="start-date"
              className="text-xs text-gray-500 uppercase font-bold"
            >
              Dari Tanggal
            </Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="end-date"
              className="text-xs text-gray-500 uppercase font-bold"
            >
              Sampai Tanggal
            </Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sedang Mengunduh...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download Excel
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

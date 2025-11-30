"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTemplateById } from "@/services/adminAssessment.Service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Calendar, FileText, GitFork, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AssessmentDetailPage() {
  const { Id } = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!Id) return;
      setLoading(true);
      try {
        const res = await getTemplateById(Id);
        if (res.success) {
          setTemplate(res.data);
        } else {
          toast.error(res.error || "Gagal mengambil detail template");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan sistem");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [Id]);

  // Helper: Format Tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper: Warna Badge Status
  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-600">Active / Published</Badge>;
      case "draft":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-500">Data tidak ditemukan</h2>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mt-4"
        >
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-4">
        <Button
          variant="default"
          className="w-fit cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>

        <div className="flex justify-between items-start sm:items-start sm:flex-row flex-col">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {template.title}
            </h1>
            <p className="text-gray-500 mt-2 text-lg mb-5">
              {template.description}
            </p>
          </div>
          <div className="flex flex-col sm:items-end items-start gap-2 sm:mb-0 mb-5">
            {getStatusBadge(template.status)}
            <div className="flex items-center text-sm text-gray-700 mt-1">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(template.updatedAt)}
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 1: INTERPRETASI SKOR --- */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-lg flex items-center">
            <FileText className="w-5 h-5 mr-2" /> Interpretasi Klinis & Grade
          </CardTitle>
          <CardDescription>
            Panduan hasil skor untuk template ini.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-6">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[100px] text-center">Grade</TableHead>
                  <TableHead>Penjelasan Klinis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {template.interpretations?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center font-bold">
                      {item.gradeLevel}
                    </TableCell>
                    <TableCell>{item.interpretationText}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* --- SECTION 2: DAFTAR PERTANYAAN (ALUR) --- */}
      <div className="space-y-5 my-5">
        <h2 className="text-xl font-bold flex items-center">
          <GitFork className="w-5 h-5 mr-2" /> Alur Pertanyaan
        </h2>

        <div className="grid gap-6">
          {template.questions?.map((q, index) => (
            <Card key={q.id} className="border-l-4 border-l-blue-500 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-1">
                  <Badge variant="outline">Q{index + 1}</Badge>
                  <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                    {q.aspect} • {q.questionType}
                  </span>
                </div>
                <CardTitle className="text-lg">{q.questionText}</CardTitle>
              </CardHeader>

              <CardContent className="relative p-0">
                <div className="w-full max-w-[calc(100vw-4rem)] sm:max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 p-6">
                  <Table className="min-w-[800px] w-full border-collapse">
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead>Opsi Jawaban</TableHead>
                        <TableHead>Respon Balikan</TableHead>
                        <TableHead className="text-center">
                          Grade Value
                        </TableHead>
                        <TableHead className="text-right">
                          Logika Lanjut (Next)
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {q.options?.map((opt) => (
                        <TableRow key={opt.id}>
                          <TableCell className="font-medium">
                            {opt.optionText}
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm italic">
                            {opt.response || "-"}
                          </TableCell>
                          <TableCell className="text-center">
                            {opt.gradeValue > 0 ? (
                              <Badge variant="secondary">
                                {opt.gradeValue}
                              </Badge>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {opt.nextQuestion ? (
                              <div className="flex items-center justify-end text-blue-600 gap-1 text-sm">
                                <span>Lanjut ke:</span>
                                <span
                                  className="font-semibold max-w-[200px] truncate"
                                  title={opt.nextQuestion.questionText}
                                >
                                  {opt.nextQuestion.questionText}
                                </span>
                              </div>
                            ) : (
                              <Badge
                                variant="outline"
                                className="border-green-500 text-green-600 bg-green-50"
                              >
                                Selesai (STOP)
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getSubmissionHistory } from "@/services/assessment.Service";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function AssessmentHistoryList() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const result = await getSubmissionHistory();

      if (result.success) {
        setHistory(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  const getColorClasses = (colorKey) => {
    switch (colorKey) {
      case "green":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-700",
        };
      case "yellow":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
        };
      case "orange":
        return {
          bg: "bg-orange-50",
          border: "border-orange-200",
          text: "text-orange-800",
        };
      case "red":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
        };
      case "darkred":
        return {
          bg: "bg-red-100",
          border: "border-red-400",
          text: "text-red-900",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-800",
        };
    }
  };

  // Menentukan variant badge berdasarkan grade
  const getGradeBadgeVariant = (grade) => {
    if (grade >= 4) return "darkred";
    if (grade >= 3) return "red";
    if (grade >= 2) return "orange";
    if (grade >= 1) return "yellow";
    return "green";
  };

  if (loading) {
    return (
      <Card className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </Card>
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Riwayat Asesmen Terakhir</CardTitle>
        <CardDescription className="text-gray-600 text-base">
          Berikut adalah 3 riwayat asesmen terakhir Anda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-center">Grade</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Anda belum memiliki riwayat asesmen.
                </TableCell>
              </TableRow>
            ) : (
              history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.AssessmentTemplate?.title || "Assessment Sebelumnya"}
                  </TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    {(() => {
                      const colorKey = getGradeBadgeVariant(item.finalGrade);
                      const color = getColorClasses(colorKey);

                      return (
                        <Badge
                          className={`${color.bg} ${color.border} ${color.text} border px-3 py-1 rounded-full`}
                        >
                          Grade {item.finalGrade}
                        </Badge>
                      );
                    })()}
                  </TableCell>
                  <TableCell className="text-blue-600 hover:underline text-right">
                    <Link href={`/history/assessment/detail/${item.id}`}>
                      Detail
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

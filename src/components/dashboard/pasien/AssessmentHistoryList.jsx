"use client";

import { useEffect, useState } from "react";
import { getSubmissionHistory } from "@/services/assessmentService";
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

  // Fungsi untuk menentukan warna Badge berdasarkan Grade
  const getGradeBadgeVariant = (grade) => {
    if (grade >= 3) return "destructive"; // Merah untuk Grade 3-4
    if (grade >= 1) return "outline"; // Kuning/Netral for Grade 1-2
    return "secondary"; // Abu-abu untuk Grade 0
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
        <CardTitle>Riwayat Assessment Terakhir</CardTitle>
        <CardDescription>
          Berikut adalah 3 riwayat assessment terakhir Anda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Template</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Anda belum memiliki riwayat assessment.
                </TableCell>
              </TableRow>
            ) : (
              history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.AssessmentTemplate.title}
                  </TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={getGradeBadgeVariant(item.finalGrade)}>
                      Grade {item.finalGrade}
                    </Badge>
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

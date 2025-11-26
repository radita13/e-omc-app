"use client";

import AssessmentResult from "@/components/assessment/AssessmentResult";
import { getSubmissionHistory } from "@/services/assessmentService";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AssessmentDetail() {
  const params = useParams();
  const router = useRouter();
  const { Id } = params;

  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!Id) return;

      setLoading(true);

      try {
        const response = await getSubmissionHistory(Id);

        if (response.success) {
          if (Array.isArray(response.data)) {
            const foundData = response.data.find((item) => item.id == Id);
            setDetailData(foundData);
          } else {
            setDetailData(response.data);
          }
        } else {
          setError(response.error || "Gagal memuat detail assessment.");
        }
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil detail assessment.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [Id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={() => router.back()}
          className="text-blue-500 underline mt-4"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <AssessmentResult
        result={detailData}
        onBack={() => router.push("/history/assessment")}
      />
    </div>
  );
}

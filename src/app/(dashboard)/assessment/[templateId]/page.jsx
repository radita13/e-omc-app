"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import QuestionCard from "@/components/assessment/QuestionCard";
import AssessmentResult from "@/components/assessment/AssessmentResult";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2, PlayCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AssessmentPage() {
  const router = useRouter();
  const params = useParams();
  const templateId = params.templateId;

  const { start, answer, reset, currentQuestion, finalResult, status, error } =
    useAssessmentStore((state) => state);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleAnswerSubmit = (answerData) => {
    answer(answerData);
  };

  if (status === "idle") {
    return (
      <div className="sm:p-8 p-0 flex justify-center">
        <Card className="w-full max-w-lg text-center">
          <CardHeader>
            <CardTitle>Mulai Asesmen Mandiri</CardTitle>
            <CardDescription>
              Tekan tombol di bawah untuk memulai asesmen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              className="w-full bg-cyan-600 hover:bg-cyan-700"
              onClick={() => start(templateId)}
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Mulai Sekarang
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="sm:p-8 p-0 flex justify-center">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Gagal Memulai Assessment</AlertTitle>
          <AlertDescription>
            <p>{error}</p>
            <div className="mt-4 flex gap-2 justify-end w-full flex-wrap">
              {/* Tombol untuk melengkapi biodata assessment */}
              <Button onClick={() => router.push("/dashboard/profile")}>
                Lengkapi Biodata Assessment
              </Button>
              {/* Tombol untuk kembali (yang akan me-reset state) */}
              <Button variant="outline" onClick={reset}>
                Kembali
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="p-8 text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-cyan-600" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // 4. Assessment Aktif (Tampilkan Pertanyaan)
  if (status === "active" && currentQuestion) {
    return (
      <div className="p-8 flex justify-center">
        <QuestionCard
          question={currentQuestion}
          onSubmitAnswer={handleAnswerSubmit}
          isLoading={false}
        />
      </div>
    );
  }

  if (status === "completed" && finalResult) {
    return (
      <div className="p-8 flex justify-center">
        <AssessmentResult
          result={finalResult}
          onRestart={() => {
            reset();
            setTimeout(() => start(templateId), 100);
          }}
          onDashboard={() => {
            reset();
            router.push("/history/assessment");
          }}
        />
      </div>
    );
  }

  return <div className="p-8 text-center">Status tidak diketahui.</div>;
}

"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import QuestionCard from "@/components/assessment/QuestionCard";
import AssessmentResult from "@/components/assessment/AssessmentResult";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Loader2, PlayCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function AssessmentPage() {
  const router = useRouter();
  const params = useParams();
  const templateId = params.templateId;

  const {
    start,
    answer,
    goBack,
    history,
    answers,
    reset,
    currentQuestion,
    currentStep,
    finalResult,
    status,
    error,
  } = useAssessmentStore((state) => state);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleAnswerSubmit = (answerData) => {
    answer(answerData);
  };

  // Initial loading state (hanya saat belum ada pertanyaan atau hasil)
  if (status === "loading" && !currentQuestion && !finalResult) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">
            Menyiapkan Asesmen...
          </h3>
          <p className="text-sm text-gray-500 mt-1">Mohon tunggu sebentar.</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (status === "error") {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Card className="w-full max-w-xl shadow-lg border border-red-200 bg-white">
          <CardHeader className="text-center pt-8">
            <div className="bg-red-50 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Gagal Memulai Asesmen
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm mt-2 leading-relaxed">
              {error ? (
                <>
                  Harap lengkapi biodata asesmen (
                  <strong className="text-gray-800">
                    nama lengkap, diagnosis &amp; no. rekam medis
                  </strong>
                  ) di profil Anda sebelum memulai asesmen.
                </>
              ) : (
                "Terjadi kendala saat menghubungi server. Silakan coba beberapa saat lagi."
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 pb-8 px-6 sm:px-8">
            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium h-11 cursor-pointer"
              onClick={() => router.push("/dashboard/profile")}
            >
              Lengkapi Biodata Sekarang
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 h-11 cursor-pointer"
              onClick={() => router.push("/assessment")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Pilihan Asesmen
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // C. (Hasil Akhir) - Layout persis sama dengan detail riwayat asesmen
  if (status === "completed" && finalResult) {
    return (
      <div className="w-full animate-in fade-in duration-300">
        <AssessmentResult
          result={finalResult}
          onBack={() => {
            reset();
            router.push("/history/assessment");
          }}
          onRestart={() => {
            reset();
            setTimeout(() => start(templateId), 100);
          }}
        />
      </div>
    );
  }

  // Assessment Area (Idle & Active)
  return (
    <div className="h-full flex flex-col py-4">
      <main className="grow flex items-center justify-center">
        <div className="w-full">
          {/* A. (Belum Mulai - Idle) */}
          {status === "idle" && (
            <div className="max-w-xl w-full mx-auto animate-in fade-in zoom-in-95 duration-200">
              <Card className="text-center shadow-lg border p-0 gap-2 border-gray-200 bg-white">
                <CardHeader className="pt-8 px-6 sm:px-8">
                  <div className="bg-cyan-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-cyan-600">
                    <PlayCircle className="h-9 w-9" />
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Siap Memulai?
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
                    Pastikan Anda dalam kondisi tenang. Jawablah setiap
                    pertanyaan sesuai kondisi yang Anda rasakan saat ini.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pb-8 pt-4 px-6 sm:px-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-100 h-11 px-5 cursor-pointer"
                    onClick={() => router.push("/assessment")}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Kembali
                  </Button>
                  <Button
                    className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-base h-11 px-7 rounded-lg shadow-sm cursor-pointer"
                    onClick={() => start(templateId)}
                  >
                    Mulai Sekarang
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {/* B. (Sedang Mengerjakan - Active atau Loading saat Submit) */}
          {(status === "active" ||
            (status === "loading" && currentQuestion)) &&
            currentQuestion && (
              <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300">
                <QuestionCard
                  key={currentQuestion.id}
                  question={currentQuestion}
                  step={currentStep}
                  savedAnswer={answers?.[currentQuestion.id]}
                  onSubmitAnswer={handleAnswerSubmit}
                  onPrev={goBack}
                  canGoBack={Boolean(history && history.length > 0)}
                  isLoading={status === "loading"}
                  onCancel={() => {
                    if (
                      window.confirm(
                        "Apakah Anda yakin ingin keluar dari asesmen? Jawaban sesi ini belum disimpan."
                      )
                    ) {
                      reset();
                      router.push("/assessment");
                    }
                  }}
                />
                <p className="text-center text-xs text-gray-400 mt-4">
                  Data asesmen disimpan untuk pemantauan kondisi klinis Anda.
                </p>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}

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

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center animate-pulse">
          <Loader2 className="h-12 w-12 animate-spin text-cyan-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">
            Sedang Memuat...
          </h3>
          <p className="text-sm text-gray-500">Mohon tunggu sebentar.</p>
        </div>
      </div>
    );
  }

  // Hendle error state
  if (status === "error") {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Card className="relative w-full max-w-2xl shadow-lg border-t-4 border-t-red-600">
          <Button
            variant="ghost"
            className="absolute top-4 left-4 hover:bg-gray-500 rounded-full p-5 bg-red-500 cursor-pointer"
            onClick={() => router.push("/assessment")}
          >
            <ArrowLeft className="h-5 w-5 text-white hover:text-black" />
          </Button>
          <CardHeader>
            <div className="flex flex-col items-center gap-3 text-red-600 mb-2 mt-14">
              <AlertTriangle className="h-10 w-10" />
              <CardTitle>Gagal Memulai</CardTitle>
            </div>
            <CardDescription className="text-gray-600 text-base">
              {error ? (
                <>
                  Harap lengkapi biodata asesmen
                  <strong className="text-gray-800 italic">
                    &nbsp;nama lengkap, diagnosis &amp; no. rekam medis&nbsp;
                  </strong>
                  di profil Anda sebelum memulai assessment.
                </>
              ) : (
                error
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button
              variant="default"
              className="w-full bg-red-600 hover:bg-red-700 cursor-pointer"
              onClick={() => router.push("/dashboard/profile")}
            >
              Lengkapi Biodata Sekarang
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Assessment Area
  return (
    <div className="h-full flex flex-col">
      <main className="grow flex items-center justify-center">
        <div className="w-full animate-in fade-in zoom-in duration-300">
          {/* A. (Belum Mulai) */}
          <div className="max-w-2xl w-full mx-auto">
            {status === "idle" && (
              <Card className="relative text-center shadow-xl border-t-4 border-t-cyan-500">
                <Button
                  variant="ghost"
                  className="absolute top-4 left-4 hover:bg-gray-500 rounded-full p-5 bg-cyan-500 cursor-pointer"
                  onClick={() => router.push("/assessment")}
                >
                  <ArrowLeft className="h-5 w-5 text-white hover:text-black" />
                </Button>
                <CardHeader className="pt-10 pb-6">
                  <div className="bg-cyan-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-cyan-600">
                    <PlayCircle className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Siap Memulai?
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 mt-2 px-4">
                    Pastikan Anda dalam kondisi tenang. Jawablah setiap
                    pertanyaan sesuai kondisi yang Anda rasakan saat ini.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pb-10 pt-4 px-8 justify-center">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto min-w-[200px] bg-cyan-600 hover:bg-cyan-700 text-lg h-12 rounded-full shadow-lg hover:shadow-cyan-200/50 transition-all cursor-pointer"
                    onClick={() => start(templateId)}
                  >
                    Mulai Sekarang
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* B. (Sedang Mengerjakan) */}
          {status === "active" && currentQuestion && (
            <div className="w-full">
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm overflow-hidden max-w-3xl mx-auto">
                <div className="h-1.5 w-full bg-slate-100">
                  <div className="h-full bg-cyan-500 w-full animate-pulse rounded-r-full"></div>
                </div>

                <CardHeader className="px-6 flex">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 bg-cyan-50 text-cyan-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-cyan-100">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Pertanyaan
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="w-full">
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <QuestionCard
                      question={currentQuestion}
                      onSubmitAnswer={handleAnswerSubmit}
                      isLoading={false}
                    />
                  </div>
                </CardContent>
              </Card>

              <p className="text-center text-xs text-slate-400 mt-6 animate-pulse">
                Jawablah dengan jujur sesuai kondisi Anda.
              </p>
            </div>
          )}

          {/* C. (Hasil Akhir) */}
          {status === "completed" && finalResult && (
            <div className="w-full">
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
          )}
        </div>
      </main>
    </div>
  );
}

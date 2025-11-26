"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react";

export default function AssessmentResult({
  result,
  onRestart,
  onDashboard,
  onBack,
}) {
  if (!result) return null;

  const isWarning = result.finalGrade >= 3;

  return (
    <Card className="w-full text-center">
      <CardHeader>
        {isWarning ? (
          <AlertTriangle className="mx-auto h-16 w-16 text-destructive mb-4" />
        ) : (
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        )}
        <CardTitle>Assessment Selesai</CardTitle>
        <CardDescription>
          Berikut adalah hasil assessment mandiri Anda:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-100 rounded-md">
          <p className="text-lg font-semibold">
            Hasil Grade Anda: {result.finalGrade}
          </p>
        </div>
        <div className="p-4 border rounded-md text-left">
          <p className="text-sm font-medium mb-2">Interpretasi Klinis:</p>
          <p>
            {result.finalInterpretation || "Tidak ada interpretasi tersedia."}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {onBack ? (
          <Button onClick={onBack} className="w-full cursor-pointer">
            Kembali
          </Button>
        ) : (
          <>
            <Button onClick={onRestart} className="w-full cursor-pointer">
              Ulangi Assessment
            </Button>
            <Button
              variant="outline"
              onClick={onDashboard}
              className="w-full cursor-pointer"
            >
              Lihat Riwayat Saya
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

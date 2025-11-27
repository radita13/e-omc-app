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
import { CheckCircle, AlertTriangle, Info, ArrowLeft } from "lucide-react";

const RESULT_MESSAGES = {
  0: {
    title: "Kondisi Normal",
    color: "green",
    description: "Mukosa oral normal. Tidak ada keluhan makan.",
    action: "Pertahankan kebersihan mulut dan pola hidup sehat.",
  },
  1: {
    title: "Gejala Ringan",
    color: "yellow",
    description:
      "Ada kemerahan atau nyeri ringan, tapi Anda masih bisa makan makanan padat.",
    action:
      "Lakukan perawatan mulut dasar (sikat gigi lembut, kumur air garam/soda). Jaga hidrasi tubuh.",
  },
  2: {
    title: "Gejala Sedang",
    color: "orange",
    description:
      "Terdapat luka sariawan, namun Anda masih bisa menelan makanan padat.",
    action:
      "Makan makanan lunak atau dingin. Gunakan obat kumur medis. Minum pereda nyeri ringan jika perlu.",
  },
  3: {
    title: "Kondisi Berat",
    color: "red",
    description:
      "Luka meluas dan terasa nyeri hebat. Anda hanya sanggup meminum cairan.",
    action:
      "Segera ke Puskesmas/Dokter. Anda butuh pereda nyeri resep dokter dan suplemen nutrisi cair.",
  },
  4: {
    title: "KONDISI GAWAT",
    color: "darkred",
    description:
      "Tidak bisa makan/minum sama sekali. Nyeri sangat hebat dan berisiko dehidrasi.",
    action:
      "SEGERA KE Puskesmas/RS terdekat. Tubuh Anda butuh infus dan perawatan intensif untuk mencegah infeksi.",
  },
};

const getColorClasses = (colorKey) => {
  switch (colorKey) {
    case "green":
      return {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-700",
        icon: "text-green-600",
      };
    case "yellow":
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-800",
        icon: "text-yellow-600",
      };
    case "orange":
      return {
        bg: "bg-orange-50",
        border: "border-orange-200",
        text: "text-orange-800",
        icon: "text-orange-600",
      };
    case "red":
      return {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
        icon: "text-red-600",
      };
    case "darkred":
      return {
        bg: "bg-red-100",
        border: "border-red-400",
        text: "text-red-900",
        icon: "text-red-800",
      };
    default:
      return {
        bg: "bg-gray-50",
        border: "border-gray-200",
        text: "text-gray-800",
        icon: "text-gray-600",
      };
  }
};

export default function AssessmentResult({
  result,
  onRestart,
  onDashboard,
  onBack,
}) {
  if (!result) return null;

  const grade = result.finalGrade || 0;
  const messageData = RESULT_MESSAGES[grade] || RESULT_MESSAGES[0];
  const styles = getColorClasses(messageData.color);

  const IconComponent = grade >= 3 ? AlertTriangle : CheckCircle;

  return (
    <Card className={`w-full text-center border-t-4 ${styles.border}`}>
      <CardHeader>
        {/* Icon Dinamis */}
        <IconComponent className={`mx-auto h-16 w-16 mb-4 ${styles.icon}`} />

        <CardTitle className="text-2xl font-bold uppercase">
          {messageData.title}
        </CardTitle>
        <CardDescription>
          Assessment Selesai. Berikut adalah hasil analisis kondisi Anda.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 text-left">
        {/* Section 1: Nilai Grade */}
        <div className="flex justify-center">
          <div className="bg-gray-100 px-6 py-2 rounded-full font-mono text-sm font-semibold text-gray-600">
            Final Grade: {grade}
          </div>
        </div>

        {/* Section 2: Penjelasan & Tindakan (Box Utama) */}
        <div className={`p-5 rounded-lg border ${styles.bg} ${styles.border}`}>
          <div className="mb-4">
            <h4
              className={`font-semibold mb-1 flex items-center gap-2 ${styles.text}`}
            >
              <Info className="w-4 h-4" /> Penjelasan Kondisi:
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {messageData.description}
            </p>
          </div>

          <div className="bg-white p-3 rounded-sm border border-white/50 mb-4">
            <h4 className={`font-bold mb-1 text-sm ${styles.text}`}>
              SARAN TINDAKAN:
            </h4>
            <p className="text-gray-800 font-medium text-sm">
              {messageData.action}
            </p>
          </div>

          {/* Section 3: Interpretasi Klinis */}
          <div
            className={`bg-white/60 p-3 rounded-sm border ${styles.bg} ${styles.border} text-sm text-gray-800 text-center px-4`}
          >
            <span className="font-semibold">Interpretasi Klinis:</span>{" "}
            {result.finalInterpretation}
          </div>
        </div>

        {/* Section 4: Peringatan --- */}
        <div className="mt-6 pt-4 border border-gray-500 w-full rounded-lg p-4">
          <p className="text-[10px] sm:text-base text-gray-700 leading-normal text-justify sm:text-center">
            <AlertTriangle className="inline w-6 h-6 mr-1 text-yellow-600" />
            <br />
            <span className="font-bold text-yellow-600 text-lg">PENTING</span>
            <br /> Hasil asesmen ini adalah alat bantu skrining awal berdasarkan
            input Anda pada assessment, bukan pengganti diagnosa medis
            profesional. Segera ke puskesmas atau RS terdekat konsultasikan
            dengan dokter jika gejala tidak membaik atau Anda merasa khawatir,
            terlepas dari hasil grade yang muncul.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-2">
        {onBack ? (
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-100 cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Riwayat
          </Button>
        ) : (
          <>
            <Button
              onClick={onRestart}
              className={`w-full cursor-pointer${grade >= 3 ? "bg-red-600 hover:bg-red-700" : ""}`}
            >
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

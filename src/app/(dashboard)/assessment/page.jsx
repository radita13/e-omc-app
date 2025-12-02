import Link from "next/link";
import { getAssessmentTemplates } from "@/services/template.Service";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  Activity,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AssessmentSelectionPage() {
  const result = await getAssessmentTemplates();

  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Gagal Memuat Data</h1>
        <p className="text-gray-500 mt-2 max-w-md">
          {result.error ||
            "Terjadi kesalahan saat menghubungi server. Silakan coba lagi nanti."}
        </p>
      </div>
    );
  }

  // FILTER: get only "published"
  const publishedTemplates = result.data.filter(
    (t) => t.status === "published"
  );

  return (
    <div className="bg-linear-to-b from-slate-50 to-white rounded-[3rem] pb-10">
      {/* --- HERO SECTION --- */}
      <div className="bg-cyan-900 py-16 text-white text-center rounded-[3rem] shadow-lg mb-12 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-cyan-800/50 px-4 py-1.5 rounded-full text-cyan-100 text-sm font-medium mb-6 border border-cyan-700">
            <Activity className="w-4 h-4" /> E-Assessment
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
            Asesmen Mandiri Pasien
          </h1>
          <p className="text-cyan-100 text-lg md:text-xl leading-relaxed">
            Pantau kondisi kesehatan mulut Anda secara berkala dengan metode
            yang terstandarisasi dan mudah digunakan.
          </p>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 bg-cyan-600 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">
            Pilihan Asesmen Tersedia
          </h2>
        </div>

        {/* Grid Card */}
        <div className="grid grid-cols-1 gap-8">
          {publishedTemplates.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
              <ClipboardList className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">
                Belum Ada Asesmen Aktif
              </h3>
              <p className="text-gray-400 mt-2">
                Mohon tunggu petugas medis menerbitkan asesmen baru.
              </p>
            </div>
          ) : (
            publishedTemplates.map((template) => (
              <Card
                key={template.id}
                className="group relative flex flex-col justify-between border-gray-200 hover:border-cyan-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden bg-white"
              >
                {/* Hiasan Atas */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-cyan-500 to-blue-600"></div>

                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-cyan-50 rounded-lg text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                      <ClipboardList className="w-6 h-6" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 hover:bg-green-100 border-0"
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Aktif
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2 leading-snug">
                    {template.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="grow">
                  <CardDescription className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {template.description || "Tidak ada deskripsi tersedia."}
                  </CardDescription>
                </CardContent>

                <CardFooter className="pt-4 border-t bg-gray-50/50">
                  <Button
                    asChild
                    className="w-full bg-white border-2 border-cyan-600 text-cyan-700 hover:bg-cyan-600 hover:text-white font-semibold transition-all h-11"
                  >
                    <Link
                      href={`/assessment/${template.id}`}
                      className="flex justify-between items-center group/btn"
                    >
                      <span>Mulai Sekarang</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

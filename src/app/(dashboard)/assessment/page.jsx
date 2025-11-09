import Link from "next/link";
import { getAssessmentTemplates } from "@/services/templateService";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowRight } from "lucide-react";

// Ini adalah Server Component
export default async function AssessmentSelectionPage() {
  const result = await getAssessmentTemplates();

  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Gagal Memuat Daftar Assessment</h1>
        <p className="text-gray-600 mt-2">{result.error}</p>
      </div>
    );
  }

  const templates = result.data;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">
        Mulai Asesmen Mandiri
      </h1>
      <p className="text-xl text-gray-600 text-center mb-12">
        Pilih salah satu asesmen yang tersedia di bawah ini untuk memulai.
      </p>

      {/* Grid untuk Kartu Pilihan Template */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500">
            Belum ada asesmen yang tersedia.
          </p>
        ) : (
          templates.map((template) => (
            <Card
              key={template.id}
              className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <CardTitle>{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                {/* Tautan dinamis ke halaman [templateId] */}
                <Button
                  asChild
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                >
                  <Link href={`/assessment/${template.id}`}>
                    Mulai <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

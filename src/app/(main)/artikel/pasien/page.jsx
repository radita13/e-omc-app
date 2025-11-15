import { getArticles } from "@/services/articleService";
import PatientArticleList from "@/components/articles/pasien/PatientArticleList";
import { AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Artikel Edukasi Pasien",
};

export default async function ArtikelPasienPage() {
  const result = await getArticles("pasien");

  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold">Gagal Memuat Artikel</h1>
        <p className="text-gray-600 mt-2">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Edukasi Pasien</h1>
      <p className="text-xl text-gray-600 text-center mb-12">
        Panduan visual dan infografis untuk membantu Anda selama masa
        pengobatan.
      </p>

      <PatientArticleList articles={result.data} />
    </div>
  );
}

import Link from "next/link";
import { getArticles } from "@/services/articleService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, AlertTriangle, BookCheck } from "lucide-react";
import ClientImage from "@/components/shared/ClientImage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function ArtikelPetugasPage() {
  const result = await getArticles("petugas");

  let articles = [];
  if (result.success) {
    articles = result.data;
  }

  return (
    <div className="container mx-auto sm:px-15 px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">
        Pusat Edukasi Petugas
      </h1>
      <p className="text-xl text-gray-600 text-center mb-12">
        Akses panduan klinis dan artikel penelitian terbaru.
      </p>

      {/* Panduan Klinis */}
      <Card className="mb-16 bg-gray-50 shadow-lg border-cyan-600 border-2">
        <div className="grid md:grid-cols-3 items-center">
          <div className="md:col-span-2 p-8">
            <CardHeader className="p-0">
              <CardTitle className="text-3xl font-bold">
                Panduan Klinis Oral Mukositis
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Tinjauan komprehensif mengenai patofisiologi, dampak, dan
                penatalaksanaan mukositis oral berbasis bukti ilmiah.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-6">
              <Link href="/artikel/petugas/panduan-klinis">
                <Button className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer">
                  <BookCheck className="mr-2 h-5 w-5" />
                  Baca Panduan Sekarang
                </Button>
              </Link>
            </CardContent>
          </div>
          <div className="hidden md:flex justify-center p-8">
            <BookCheck className="h-32 w-32 text-cyan-200" />
          </div>
        </div>
      </Card>

      {/* Galeri Artikel */}
      <h2 className="text-3xl font-bold text-center mb-4">Edukasi Petugas</h2>
      <p className="text-xl text-gray-600 text-center mb-12">
        Artikel edukasi untuk petugas membantu melakukan pemeriksaan.
      </p>

      {!result.success && (
        <div className="text-center text-red-500">
          <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
          <p>Gagal memuat artikel: {result.error}</p>
        </div>
      )}

      {/* Grid untuk Kartu Artikel/Infografis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length === 0 && result.success ? (
          <p className="col-span-3 text-center text-gray-500">
            Belum ada artikel yang dipublikasikan untuk petugas.
          </p>
        ) : (
          articles.map((article) => {
            const hasImages = article.images && article.images.length > 0;
            const hasVideo = !!article.videoUrl;

            return (
              <Card
                key={article.id}
                className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow py-0"
              >
                <ClientImage
                  src={article.thumbnailUrl}
                  alt={article.title}
                  width={600}
                  height={400}
                  className="w-full h-60 object-cover"
                />
                <CardHeader>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent className="grow">
                  <div className="flex gap-2 flex-wrap">
                    {/* Kategori */}
                    <Badge variant="outline">{article.category}</Badge>

                    {/* Badge Images */}
                    {hasImages && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white dark:bg-blue-600"
                      >
                        🖼 {article.images.length} Gambar
                      </Badge>
                    )}

                    {/* Badge Video */}
                    {hasVideo && (
                      <Badge variant="destructive" className=" text-white">
                        🎥 Video
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Link
                    href={`/artikel/petugas/${article.slug}`}
                    className="font-semibold text-cyan-600 hover:text-cyan-700 flex items-center gap-2"
                  >
                    Lihat Artikel <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

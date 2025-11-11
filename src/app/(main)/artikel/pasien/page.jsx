import Link from "next/link";
import { getArticles } from "@/services/articleService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ClientImage from "@/components/shared/ClientImage";

export const dynamic = "force-dynamic";

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

  const articles = result.data;

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-4">Edukasi Pasien</h1>
      <p className="text-xl text-gray-600 text-center mb-12">
        Panduan visual dan infografis untuk membantu Anda selama masa
        pengobatan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-15">
        {articles.length === 0 && result.success ? (
          <p className="col-span-3 text-center text-gray-500">
            Belum ada artikel edukasi untuk pasien.
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
                      <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
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
                    href={`/artikel/pasien/${article.slug}`}
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

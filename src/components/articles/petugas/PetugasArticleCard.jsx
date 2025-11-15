import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ClientImage from "@/components/shared/ClientImage";

export default function PetugasArticleCard({ articles, error }) {
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-4">Edukasi Petugas</h2>
      <p className="text-xl text-gray-600 text-center mb-12">
        Artikel edukasi ini dibuat untuk membantu petugas dalam melakukan
        pemeriksaan secara tepat, dengan masukan dari Tim PMP:
        <b> Ni Ketut Kardiyudiani, M.Kep., Sp.Kep.MB., PhD</b>,
        <b> NS Rudi Haryono, S.Kep., Ns., M.Kep</b>, dan&nbsp;
        <b> apt. Pramitha Esha ND, M.Sc., PhD</b>.
      </p>

      {error && (
        <div className="text-center text-red-500 mb-6">
          <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
          <p>Gagal memuat artikel: {error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {articles.length === 0 && !error && (
          <p className="col-span-3 text-center text-gray-500">
            Belum ada artikel yang dipublikasikan untuk petugas.
          </p>
        )}

        {articles.map((article) => {
          const hasImages = article.images?.length > 0;
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
                  <Badge variant="outline">{article.category}</Badge>

                  {hasImages && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-500 text-white dark:bg-blue-600"
                    >
                      🖼 {article.images.length} Gambar
                    </Badge>
                  )}

                  {hasVideo && (
                    <Badge variant="destructive" className="text-white">
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
        })}
      </div>
    </>
  );
}

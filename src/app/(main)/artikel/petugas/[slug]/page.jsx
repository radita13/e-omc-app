import { getArticleBySlug } from "@/services/articleService.js";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import ArticleSlider from "@/components/shared/ArticleSlider";
import ArticleVideo from "@/components/shared/ArticleVideo";

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug } = params;
  const result = await getArticleBySlug(slug);
  if (!result.success) {
    return { title: "Artikel Tidak Ditemukan" };
  }
  return {
    title: `${result.data.title} | e-OMC`,
    description: result.data.description,
  };
}

export default async function ArtikelDetailPage(props) {
  const params = await props.params;
  const { slug } = params;
  const result = await getArticleBySlug(slug);

  if (!result.success) {
    notFound();
  }
  const article = result.data;

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button asChild variant="link" className="p-0 text-cyan-600">
            <Link href="/artikel/petugas" className="flex items-center gap-2">
              <ArrowLeft className="sm:size-10 size-8" />
            </Link>
          </Button>
        </div>

        {/* Konten Artikel */}
        <h1 className="text-4xl font-bold mb-4 text-center">{article.title}</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          {article.description}
        </p>

        <ArticleSlider images={article.images} title={article.title} />

        <ArticleVideo videoUrl={article.videoUrl} />
      </div>
    </div>
  );
}

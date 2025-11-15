import { getArticleBySlug } from "@/services/articleService";
import { notFound } from "next/navigation";

import BackButton from "@/components/articles/detail/BackButton";
import ArticleHeader from "@/components/articles/detail/ArticleHeader";
import ArticleContent from "@/components/articles/detail/ArticleContent";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getArticleBySlug(slug);

  if (!result.success) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  const article = result.data;

  return {
    title: `${article.title}`,
    description: article.description,
  };
}

export default async function ArtikelDetailPage({ params }) {
  const { slug } = await params;
  const result = await getArticleBySlug(slug);

  if (!result.success) notFound();

  const article = result.data;

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-0">

        <BackButton href="/artikel/pasien" />

        <ArticleHeader title={article.title} description={article.description} />

        <ArticleContent
          images={article.images}
          videoUrl={article.videoUrl}
          title={article.title}
        />

      </div>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useArticleDetail } from "@/hooks/admin/article/useArticleDetail";
import ArticleDetail from "@/components/dashboard/admin/article/ArticleDetail";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const { article, loading, error } = useArticleDetail(id);

  return <ArticleDetail article={article} loading={loading} error={error} />;
}

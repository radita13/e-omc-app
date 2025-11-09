"use client";

import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import ArticleTable from "@/components/dashboard/admin/article/ArticleTable";
import { useArticles } from "@/hooks/admin/article/useArticles";
import { useRouter } from "next/navigation";

export default function AdminArticlesPage() {
  const router = useRouter();
  const { articles, pagination, loading, page, setPage, deleteArticle } = useArticles(5);

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="flex justify-end items-center mb-6">
        <Button onClick={() => router.push("/dashboard/artikel/create")} className="cursor-pointer">+ Tambah Artikel</Button>
      </div>

      {/* Table */}
      <ArticleTable
        articles={articles}
        pagination={pagination}
        loading={loading}
        onDelete={deleteArticle}
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setPage(i + 1)}
                    isActive={page === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
                  className={page === pagination.totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

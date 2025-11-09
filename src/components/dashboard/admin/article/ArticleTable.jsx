"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";

// --- helper function untuk format tanggal ---
const formatDateTime = (dateStr) => {
  const date = new Date(dateStr);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("id-ID", options); // 21 Nov 2025
  const formattedTime = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }); // 09:45
  return `${formattedDate} • ${formattedTime}`;
};

export default function ArticleTable({
  articles,
  pagination,
  loading,
  onDelete,
}) {
  const router = useRouter();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (articles.length === 0) {
    return (
      <div className="bg-white rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">No</TableHead>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Create</TableHead>
              <TableHead>Update</TableHead>
              <TableHead className="text-center w-[200px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                Tidak ada artikel.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">No</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Judul</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Create</TableHead>
            <TableHead>Update</TableHead>
            <TableHead className="text-center w-[200px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article, index) => (
            <TableRow key={article.id}>
              <TableCell className="text-center font-medium">
                {index +
                  1 +
                  ((pagination?.currentPage ?? 1) - 1) *
                    (pagination?.limit ?? 5)}
              </TableCell>
              <TableCell>
                {article.thumbnailUrl ? (
                  <div className="w-14 h-14 relative rounded-md overflow-hidden border">
                    <Image
                      src={article.thumbnailUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <span className="text-gray-400 italic">Tidak ada</span>
                )}
              </TableCell>
              <TableCell className="font-semibold">{article.title}</TableCell>
              <TableCell className="capitalize">{article.category}</TableCell>
              <TableCell>{formatDateTime(article.createdAt)}</TableCell>
              <TableCell>{formatDateTime(article.updatedAt)}</TableCell>

              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(`/dashboard/artikel/${article.id}`)
                    }
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(`/dashboard/artikel/update/${article.id}`)
                    }
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => onDelete(article.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

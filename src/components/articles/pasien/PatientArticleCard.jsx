"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Image, Video } from "lucide-react";
import ClientImage from "@/components/shared/ClientImage";

export default function PatientArticleCard({ article }) {
  const hasImages = article.images && article.images.length > 0;
  const hasVideo = !!article.videoUrl;

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow py-0">
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

          {/* Images badge */}
          {hasImages && (
            <Badge
              variant="secondary"
              className="bg-blue-500 text-white dark:bg-blue-600"
            >
              <Image className="h-4 w-4" alt="" /> {article.images.length}
              &nbsp;Gambar
            </Badge>
          )}

          {/* Video badge */}
          {hasVideo && (
            <Badge variant="destructive" className="text-white">
              <Video className="h-4 w-4" alt="" />
              &nbsp;Video
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
}

"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ArticleDetail({ article, loading, error }) {
  const [currentSlide, setCurrentSlide] = useState(1);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Terjadi kesalahan: {error}
      </div>
    );

  if (!article)
    return (
      <div className="text-center text-gray-500 mt-10">
        Artikel tidak ditemukan.
      </div>
    );

  // Ambil embed url untuk youtube jika ada
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const ytRegex = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/;
    const match = url.match(ytRegex);
    return match?.[1] ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow">
      {/* --- COVER IMAGE --- */}
      {article.thumbnailUrl && (
        <div className="mb-6 w-full h-[400px] overflow-hidden relative">
          <Image
            src={article.thumbnailUrl}
            alt={article.title}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {/* --- JUDUL & DESKRIPSI --- */}
      <h1 className="text-3xl font-semibold mb-4">{article.title}</h1>
      <p className="text-gray-700 whitespace-pre-line">{article.description}</p>

      <hr className="my-10" />

      {/* --- GALERI ARTIKEL --- */}
      {article.images && article.images.length > 0 && (
        <div className="relative">
          <h2 className="text-xl font-semibold mb-4">Galeri Artikel</h2>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={true}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
            className="w-full rounded-lg relative z-10"
          >
            {article.images
              .filter((img) => img?.imageUrl && img.imageUrl.trim() !== "")
              .map((img, i) => (
                <SwiperSlide key={img.id || i}>
                  <div className="relative w-full rounded-lg overflow-hidden">
                    <Image
                      src={img.imageUrl}
                      alt={`Gambar ${i + 1}`}
                      width={1200}
                      height={800}
                      className="object-contain w-full h-auto relative z-0"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>

          <div className="absolute bottom-3 right-5 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-30">
            {currentSlide} / {article.images.length}
          </div>
        </div>
      )}

      {/* --- VIDEO ARTIKEL --- */}
      {article.videoUrl && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Video Artikel</h2>

          {article.videoUrl.includes("youtube") ||
          article.videoUrl.includes("youtu.be") ? (
            <iframe
              src={getEmbedUrl(article.videoUrl)}
              className="w-full aspect-video rounded-lg border"
              allowFullScreen
            />
          ) : (
            <video
              src={article.videoUrl}
              controls
              className="w-full rounded-lg border"
            />
          )}
        </div>
      )}

      {/* --- INFO PENULIS + UPDATE --- */}
      <div className="mt-8 text-sm text-gray-500">
        Ditulis oleh: <strong>{article.author?.name}</strong>
        <br />
        Dibuat: {new Date(article.createdAt).toLocaleString("id-ID")}
        <br />
        Diperbarui: {new Date(article.updatedAt).toLocaleString("id-ID")}
      </div>
    </div>
  );
}

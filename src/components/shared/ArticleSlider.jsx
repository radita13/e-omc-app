"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { ArrowLeft, ArrowRight, Maximize, Minimize } from "lucide-react";
import screenfull from "screenfull";
import ClientImageControl from "@/components/shared/ClientImageControl";
import "swiper/css";

export default function ArticleSlider({ images = [], title }) {
  const swiperRef = useRef(null);
  const fullscreenRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimeout = useRef(null);

  const hideControls = useCallback(() => {
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  const showAndHideControls = useCallback(() => {
    clearTimeout(hideControlsTimeout.current);
    setShowControls(true);
    hideControls();
  }, [hideControls]);

  const toggleFullscreen = () => {
    if (screenfull.isEnabled && fullscreenRef.current) {
      screenfull.toggle(fullscreenRef.current);
    }
  };

  useEffect(() => {
    if (screenfull.isEnabled) {
      const handler = () => {
        setIsFullscreen(screenfull.isFullscreen);
        showAndHideControls();
      };
      screenfull.on("change", handler);
      return () => screenfull.off("change", handler);
    }
  }, [showAndHideControls]);

  useEffect(() => {
    hideControls();
    return () => clearTimeout(hideControlsTimeout.current);
  }, [hideControls]);

  if (images.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Tidak ada gambar untuk artikel ini.
      </p>
    );
  }

  return (
    <div
      ref={fullscreenRef}
      className="relative w-full max-w-6xl mx-auto border rounded-lg shadow-lg overflow-hidden bg-gray-100 select-none"
      onMouseMove={showAndHideControls}
      onTouchStart={showAndHideControls}
    >
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          el: ".swiper-pagination-custom",
          type: "fraction",
        }}
        className="w-full"
      >
        {images.map((img, i) => (
          <SwiperSlide key={img.id || i}>
            <ClientImageControl
              src={img.imageUrl}
              alt={`Gambar ${i + 1} untuk ${title}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* BAR KONTROL */}
      <div
        className={`custom-controls-bar transition-all duration-300 ${
          showControls ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Pagination */}
        <div className="swiper-pagination-custom"></div>

        {/* Tombol kanan */}
        <div className="flex items-center gap-3 absolute right-4">
          <button
            className="swiper-button-prev-custom swiper-nav-button"
            title="Sebelumnya"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            className="swiper-button-next-custom swiper-nav-button"
            title="Selanjutnya"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="swiper-fullscreen-button-custom"
            title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

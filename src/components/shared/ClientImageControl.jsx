"use client";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import React from "react";
import Image from "next/image";

export default function ClientImageControl({ src, alt }) {
  return (
    <div className="relative w-full bg-gray-50 overflow-hidden">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={6}
        centerOnInit={true}
        wheel={{ step: 0.15 }}
        pinch={{ step: 0.2 }}
        doubleClick={{ disabled: true }}
        bounded={true}
        animation={{ disabled: false, time: 300 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Toolbar */}
            <div className="absolute top-3 right-3 z-50 flex gap-2 bg-white/90 p-2 rounded-lg shadow">
              <button
                type="button"
                onClick={() => zoomIn()}
                className="p-1 rounded hover:bg-gray-100"
                aria-label="Zoom in"
                title="Perbesar"
              >
                <ZoomIn className="w-5 h-5 text-gray-700" />
              </button>

              <button
                type="button"
                onClick={() => zoomOut()}
                className="p-1 rounded hover:bg-gray-100"
                aria-label="Zoom out"
                title="Perkecil"
              >
                <ZoomOut className="w-5 h-5 text-gray-700" />
              </button>

              <button
                type="button"
                onClick={() => {
                  try {
                    resetTransform();
                  } catch (e) {
                    console.warn("resetTransform failed", e);
                  }
                }}
                className="p-1 rounded hover:bg-gray-100"
                aria-label="Reset"
                title="Reset"
              >
                <RotateCcw className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <TransformComponent wrapperClass="w-full">
              <div className="w-full min-h-80 flex items-center justify-center bg-gray-100">
                <Image
                  src={src}
                  alt={alt}
                  width={1200}
                  height={800}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                  draggable={false}
                />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}

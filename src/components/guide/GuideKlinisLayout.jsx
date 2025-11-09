"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArticleRenderer } from "@/lib/data/professionalGuide";

export default function GuideKlinisLayout({ guideData }) {
  const [activeSlug, setActiveSlug] = useState(guideData.sections[0].slug);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeSection = guideData.sections.find(
    (s) => s.slug === activeSlug
  );

  return (
    <div className="relative">
      {/* Tombol Back */}
      <div className="mb-8">
        <Link
          href="/artikel/petugas"
          className="text-cyan-600 hover:text-cyan-700 flex items-center gap-2"
        >
          <ArrowLeft className="size-5 sm:size-6" />
        </Link>
      </div>

      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-4">{guideData.title}</h1>
      <p className="text-xl text-gray-600 text-center mb-12">
        {guideData.description}
      </p>

      {guideData.documentUrl && (
        <div className="flex justify-center mb-12">
          <Link
            href={guideData.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-cyan-700 transition-all shadow-md"
          >
            <Download className="size-5 sm:size-6" />
            Download
          </Link>
        </div>
      )}

      {/* --- SIDEBAR & KONTEN UTAMA --- */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Desktop */}
        <aside className="hidden md:block w-1/4 md:sticky md:top-24 self-start h-fit">
          <ScrollArea className="h-[70vh] p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="font-semibold text-xl mb-4 px-3">Daftar Isi</h3>
            <ul className="space-y-2">
              {guideData.sections.map((section) => (
                <li key={section.slug}>
                  <button
                    onClick={() => setActiveSlug(section.slug)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md text-gray-700 cursor-pointer",
                      activeSlug === section.slug
                        ? "bg-cyan-100 font-semibold text-cyan-700"
                        : "hover:bg-gray-100"
                    )}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </aside>

        {/* Konten Utama */}
        <main className="w-full md:w-3/4">
          <div className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm border">
            {activeSection ? (
              <ArticleRenderer content={activeSection.content} />
            ) : (
              <p>Pilih bagian untuk dibaca.</p>
            )}
          </div>
        </main>
      </div>

      {/* --- SIDEBAR MOBILE SLIDE-IN --- */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden",
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r z-50 transform transition-transform duration-300 md:hidden",
          menuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">Daftar Isi</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100%-4rem)] p-4">
          <ul className="space-y-2">
            {guideData.sections.map((section) => (
              <li key={section.slug}>
                <button
                  onClick={() => {
                    setActiveSlug(section.slug);
                    setMenuOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-gray-700 cursor-pointer",
                    activeSlug === section.slug
                      ? "bg-cyan-100 font-semibold text-cyan-700"
                      : "hover:bg-gray-100"
                  )}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      {/* --- FLOATING BUTTON MENU (MOBILE) --- */}
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-5 right-5 z-50 rounded-full shadow-lg bg-cyan-600 hover:bg-cyan-700 md:hidden"
        onClick={() => setMenuOpen(true)}
      >
        <Menu className="w-10 h-10 text-white" />
      </Button>
    </div>
  );
}

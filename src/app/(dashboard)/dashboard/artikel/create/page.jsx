"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createArticle } from "@/services/adminArticle.Service";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

export default function CreateArticlePage() {
  const router = useRouter();
  const thumbnailRef = useRef(null);
  const imagesRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "pasien",
    videoUrl: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [previewThumb, setPreviewThumb] = useState(null);

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnail(file);
    setPreviewThumb(URL.createObjectURL(file));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const preview = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...preview]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    imagesRef.current.value = "";
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setPreviewThumb(null);
    thumbnailRef.current.value = "";
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;

    const ytRegex = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/;
    const match = url.match(ytRegex);

    return match?.[1] ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value));

      if (thumbnail) fd.append("thumbnailImage", thumbnail);
      images.forEach((img) => fd.append("images", img));

      await createArticle(fd);
      router.push("/dashboard/artikel");
    } catch (err) {
      console.error("❌ Error create artikel:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Buat Artikel Baru</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <Label className="mb-2">Judul Artikel</Label>
              <Input
                name="title"
                placeholder="Masukkan judul artikel"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label className="mb-2">Deskripsi</Label>
              <Textarea
                name="description"
                rows={6}
                value={form.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi artikel"
                required
              />
            </div>

            {/* Category */}
            <div>
              <Label className="mb-2">Kategori Artikel</Label>
              <Select
                value={form.category}
                onValueChange={(category) =>
                  setForm((p) => ({ ...p, category }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pasien">Pasien</SelectItem>
                  <SelectItem value="petugas">Petugas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Thumbnail */}
            <div>
              <Label className="mb-2">Thumbnail</Label>
              <Input
                ref={thumbnailRef}
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                required
              />

              {previewThumb && (
                <div className="relative w-48 h-48 mt-3 rounded-lg overflow-hidden border">
                  <Image
                    src={previewThumb}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />

                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 p-1 rounded-full text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Article detail images */}
            <div>
              <Label className="mb-2">Artikel Gambar Detail</Label>
              <Input
                ref={imagesRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
              />

              {previewImages.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {previewImages.map((url, i) => (
                    <div
                      key={i}
                      className="relative w-24 h-24 rounded-lg border overflow-hidden"
                    >
                      <Image
                        src={url}
                        alt={"Preview-" + i}
                        fill
                        className="object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 p-1 rounded-full text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Video */}
            <div>
              <Label className="mb-2">Video URL</Label>
              <Input
                name="videoUrl"
                placeholder="Masukkan URL video"
                value={form.videoUrl}
                onChange={handleChange}
              />

              {form.videoUrl && (
                <>
                  {form.videoUrl.includes("youtube") ||
                  form.videoUrl.includes("youtu.be") ? (
                    <iframe
                      src={getEmbedUrl(form.videoUrl)}
                      className="mt-3 w-full max-w-md rounded-lg border aspect-video"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={form.videoUrl}
                      controls
                      className="mt-3 w-full max-w-md rounded-lg border"
                    />
                  )}
                </>
              )}
            </div>

            <Button type="submit" className="cursor-pointer" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Artikel"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

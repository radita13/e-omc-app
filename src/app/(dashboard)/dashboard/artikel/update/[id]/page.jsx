"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { toast } from "sonner";
import { getArticleById, updateArticle } from "@/services/adminArticle.Service";

export default function EditArticlePage() {
  const router = useRouter();
  const { id: articleId } = useParams();

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
  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previewNewImages, setPreviewNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { success, data } = await getArticleById(articleId);
      if (!success || !data) return;

      setForm({
        title: data.title,
        description: data.description,
        category: data.category,
        videoUrl: data.videoUrl || "",
      });

      setOldImages(data.images || []);
      setPreviewThumb(data.thumbnailUrl || null);
    };

    load();
  }, [articleId]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnail(file);
    setPreviewThumb(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setPreviewThumb(null);
    thumbnailRef.current.value = "";
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const previews = files.map((f) => URL.createObjectURL(f));

    setNewImages((prev) => [...prev, ...files]);
    setPreviewNewImages((prev) => [...prev, ...previews]);
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewNewImages((prev) => prev.filter((_, i) => i !== index));
    imagesRef.current.value = "";
  };

  const removeOldImage = (id) => {
    setOldImages((prev) => prev.filter((img) => img.id !== id));
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const yt = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/.exec(url);
    return yt?.[1] ? `https://www.youtube.com/embed/${yt[1]}` : url;
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => fd.append(key, value));

      if (thumbnail) fd.append("thumbnailImage", thumbnail);

      newImages.forEach((img) => fd.append("images", img));
      oldImages.forEach((img) => fd.append("keepImages[]", img.id));

      const res = await updateArticle(articleId, fd);

      if (res.success) {
        toast.success("Artikel berhasil diupdate!", { duration: 5000 });
        router.push("/dashboard/artikel");
      }
    } catch (err) {
      console.error(err, "Gagal update artikel");
      toast.error("Gagal update artikel!", { duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Artikel</CardTitle>
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
                placeholder="Masukkan deskripsi artikel"
                value={form.description}
                onChange={handleChange}
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

            {/* Old images */}
            {oldImages.length > 0 && (
              <div>
                <Label className="mb-2">Gambar Lama</Label>
                <div className="mt-3 flex flex-wrap gap-3">
                  {oldImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative w-24 h-24 rounded-lg border overflow-hidden"
                    >
                      <Image
                        src={img.imageUrl}
                        alt="Old"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeOldImage(img.id)}
                        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 p-1 rounded-full text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New image uploads */}
            <div>
              <Label className="mb-2">Artikel Gambar Detail</Label>
              <Input
                ref={imagesRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImagesChange}
              />

              {previewNewImages.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {previewNewImages.map((url, i) => (
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
                        onClick={() => removeNewImage(i)}
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
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

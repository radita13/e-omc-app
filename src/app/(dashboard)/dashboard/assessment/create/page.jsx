"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTemplete } from "@/services/adminAssessment.Service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2} from "lucide-react";
import { toast } from "sonner";

export default function CreateAssessmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // State awal hanya Judul & Deskripsi
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      toast.error("Judul assessment wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      const initialPayload = {
        title: formData.title,
        description: formData.description,
        questions: [],
        interpretations: [
          {
            gradeLevel: 0,
            interpretationText: "Grade 0: Kondisi normal/sehat.",
          },
          {
            gradeLevel: 1,
            interpretationText: "Grade 1: Gejala ringan.",
          },
          {
            gradeLevel: 2,
            interpretationText: "Grade 2: Gejala sedang.",
          },
          {
            gradeLevel: 3,
            interpretationText: "Grade 3: Kondisi berat.",
          },
          {
            gradeLevel: 4,
            interpretationText: "Grade 4: Kondisi gawat/kritis.",
          },
        ],
      };

      const res = await createTemplete(initialPayload);

      if (res.success) {
        toast.success("Assessment berhasil dibuat!");
        router.push(`/dashboard/assessment/edit/${res.data.id}`);
      } else {
        toast.error(res.error || "Gagal membuat assessment");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col items-start gap-5">
        <Button onClick={() => router.back()} className="pl-0 cursor-pointer">
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Button>
        <h1 className="text-2xl font-bold">Buat Assessment Baru</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Assessment template
            </CardTitle>
            <CardDescription>
              Silahkan isi judul dan deskripsi terlebih dahulu. Setelah itu klik
              simpan, maka Anda akan diarahkan ke halaman edit untuk menyusun
              pertanyaan assessment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>
                Judul Assessment <span className="text-red-500">*</span>
              </Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Contoh: Asesmen Mandiri Oral Mukositis Pada Pasien Kanker"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Deskripsi singkat untuk pasien..."
                rows={4}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Simpan
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getTemplateById,
  updateDraftTemplate,
  publishTemplate,
} from "@/services/adminAssessment.Service";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Plus,
  Save,
  Trash2,
  UploadCloud,
  Loader2,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function EditAssessmentPage() {
  const { Id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // State Utama: Menampung seluruh struktur JSON
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [],
    interpretations: [],
  });

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      if (!Id) return;
      setLoading(true);
      try {
        const res = await getTemplateById(Id);
        if (res.success) {
          const normalizedData = {
            ...res.data,
            questions: res.data.questions.map((q, index) => ({
              ...q,
              q_id: index + 1,
              options: q.options.map((opt) => ({
                ...opt,
                next_q_id: opt.nextQuestionId
                  ? res.data.questions.find(
                      (tq) => tq.id === opt.nextQuestionId
                    )?.q_id ||
                    res.data.questions.findIndex(
                      (tq) => tq.id === opt.nextQuestionId
                    ) + 1
                  : null,
              })),
            })),
          };
          setFormData(normalizedData);
        } else {
          toast.error(res.error);
          router.push("/dashboard/assessment");
        }
      } catch (error) {
        toast.error("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [Id, router]);

  // -- HANDLERS PERUBAHAN DATA --

  // Handle Judul & Deskripsi
  const handleBasicChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- PERTANYAAN (QUESTIONS) ---
  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          q_id: formData.questions.length + 1,
          questionText: "",
          aspect: "Umum",
          questionType: "radio",
          isFirstQuestion: formData.questions.length === 0,
          options: [
            { optionText: "Ya", gradeValue: 1, next_q_id: null },
            { optionText: "Tidak", gradeValue: 0, next_q_id: null },
          ],
        },
      ],
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = [...formData.questions];
    newQuestions.splice(index, 1);
    const reindexed = newQuestions.map((q, i) => ({ ...q, q_id: i + 1 }));
    setFormData({ ...formData, questions: reindexed });
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index][field] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  // --- OPSI JAWABAN (OPTIONS) ---
  const addOption = (qIndex) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIndex].options.push({
      optionText: "",
      gradeValue: 0,
      next_q_id: null,
    });
    setFormData({ ...formData, questions: newQuestions });
  };

  const removeOption = (qIndex, optIndex) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIndex].options.splice(optIndex, 1);
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateOption = (qIndex, optIndex, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIndex].options[optIndex][field] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  // --- INTERPRETASI (GRADES) ---
  const updateInterpretation = (index, value) => {
    const newInterps = [...formData.interpretations];
    newInterps[index].interpretationText = value;
    setFormData({ ...formData, interpretations: newInterps });
  };

  // --- SAVE & PUBLISH ACTIONS ---
  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      // Pastikan q_id urut sebelum kirim
      const payload = {
        ...formData,
        questions: formData.questions.map((q, i) => ({ ...q, q_id: i + 1 })),
      };

      const res = await updateDraftTemplate(Id, payload);
      if (res.success) {
        toast.success("Draft berhasil disimpan!");
      } else {
        toast.error(res.error || "Gagal menyimpan draft");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menyimpan");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    await handleSaveDraft();

    if (
      confirm("Apakah Anda yakin ingin menayangkan (Publish) assessment ini?")
    ) {
      setSaving(true);
      try {
        const res = await publishTemplate(Id);
        if (res.success) {
          toast.success("Assessment berhasil ditayangkan!");
          router.push("/dashboard/assessment");
        } else {
          toast.error(res.error);
        }
      } catch (error) {
        toast.error("Gagal publish");
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* HEADER & NAVIGASI */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Button onClick={() => router.back()} className="pl-0 cursor-pointer">
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Button>
        <div className="flex gap-3 flex-wrap">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleSaveDraft}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Simpan Draft
          </Button>
          <Button
            onClick={handlePublish}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 cursor-pointer"
          >
            <UploadCloud className="mr-2 h-4 w-4" /> Publish Sekarang
          </Button>
        </div>
      </div>

      {/* 1. INFORMASI DASAR */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Assessment</CardTitle>
          <CardDescription>
            Judul dan deskripsi yang akan dilihat pasien.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Judul Assessment</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleBasicChange}
              placeholder="Contoh: Asesmen Mandiri Oral Mukositis"
            />
          </div>
          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleBasicChange}
              placeholder="Deskripsi singkat tentang kuesioner ini..."
            />
          </div>
        </CardContent>
      </Card>

      {/* 2. DAFTAR PERTANYAAN (BUILDER) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-xl font-bold">Daftar Pertanyaan</h2>
          <Button className="cursor-pointer" onClick={addQuestion} size="sm">
            <Plus className="mr-2 h-4 w-4" /> Tambah Pertanyaan
          </Button>
        </div>

        {formData.questions.map((q, qIdx) => (
          <Card key={qIdx} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-white">
                    Q{qIdx + 1}
                  </Badge>
                  <span className="text-xs text-gray-400 font-mono">
                    ID Referensi: {qIdx + 1}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeQuestion(qIdx)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Input Pertanyaan */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-3 space-y-2">
                  <Label>Teks Pertanyaan</Label>
                  <Input
                    value={q.questionText}
                    onChange={(e) =>
                      updateQuestion(qIdx, "questionText", e.target.value)
                    }
                    placeholder="Masukkan pertanyaan..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Aspek / Kategori</Label>
                  <Input
                    value={q.aspect}
                    onChange={(e) =>
                      updateQuestion(qIdx, "aspect", e.target.value)
                    }
                    placeholder="Misal: Nyeri"
                  />
                </div>
              </div>

              {/* Tabel Opsi Jawaban */}
              <div className="border rounded-md p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                  <Label className="text-gray-600">
                    Opsi Jawaban & Logika Alur
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-blue-600"
                    onClick={() => addOption(qIdx)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Tambah Opsi
                  </Button>
                </div>

                <div className="space-y-3">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className="flex flex-col md:flex-row gap-4 items-end md:items-center bg-white p-3 rounded border"
                    >
                      <div className="md:flex-2 w-full">
                        <span className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">
                          Teks Jawaban
                        </span>
                        <Input
                          className="h-9"
                          value={opt.optionText}
                          onChange={(e) =>
                            updateOption(
                              qIdx,
                              oIdx,
                              "optionText",
                              e.target.value
                            )
                          }
                          placeholder="Ya / Tidak"
                        />
                      </div>

                      <div className="w-full md:w-20 shrink-0">
                        <span className="text-[10px] text-gray-400 uppercase font-bold mb-1 block md:text-center text-start">
                          Grade
                        </span>
                        <Input
                          className="h-9 text-center"
                          type="number"
                          value={opt.gradeValue}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);

                            updateOption(
                              qIdx,
                              oIdx,
                              "gradeValue",
                              isNaN(val) ? 0 : val
                            );
                          }}
                        />
                      </div>

                      <div className="w-full md:flex-1">
                        <span className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">
                          Lanjut Ke (Next Question)
                        </span>
                        <Select
                          value={
                            opt.next_q_id ? opt.next_q_id.toString() : "null"
                          }
                          onValueChange={(val) =>
                            updateOption(
                              qIdx,
                              oIdx,
                              "next_q_id",
                              val === "null" ? null : parseInt(val)
                            )
                          }
                        >
                          <SelectTrigger className="h-9 w-full">
                            <SelectValue placeholder="Pilih alur..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="null"
                              className="text-green-600 font-semibold"
                            >
                              ✅ Selesai (Stop)
                            </SelectItem>
                            {formData.questions.map(
                              (targetQ, targetIdx) =>
                                targetIdx !== qIdx && (
                                  <SelectItem
                                    key={targetIdx}
                                    value={(targetIdx + 1).toString()}
                                  >
                                    <span className="truncate block max-w-[250px]">
                                      Q{targetIdx + 1}:{" "}
                                      {targetQ.questionText.substring(0, 30)}
                                      ...
                                    </span>
                                  </SelectItem>
                                )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="shrink-0">
                        <span className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">
                          Action
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-400 hover:text-red-600 h-9 w-9"
                          onClick={() => removeOption(qIdx, oIdx)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. INTERPRETASI (GRADES) */}
      <Card>
        <CardHeader>
          <CardTitle>Interpretasi Hasil (Grade WHO)</CardTitle>
          <CardDescription>
            Edit teks penjelasan untuk setiap tingkatan grade (0-4).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.interpretations.map((interp, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-24 pt-2">
                <Badge
                  variant="outline"
                  className="w-full justify-center py-1 font-bold bg-slate-100"
                >
                  Grade {interp.gradeLevel}
                </Badge>
              </div>
              <Textarea
                rows={2}
                value={interp.interpretationText}
                onChange={(e) => updateInterpretation(idx, e.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

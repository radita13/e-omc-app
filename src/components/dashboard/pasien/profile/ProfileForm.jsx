"use client";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { getMyProfile, updateMyProfile } from "@/services/user.Service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { toast } from "sonner";

export default function ProfileForm() {
  const user = useAuthStore((state) => state.user);
  const hasFetched = useRef(false);
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    no_hp: "",
    diagnosis: "",
    medicalRecordNumber: "",
    chemoType: "",
    radioType: "",
  });

  const [initialForm, setInitialForm] = useState(null);

  const [profileLoading, setProfileLoading] = useState(false);
  const [biodataLoading, setBiodataLoading] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!user || hasFetched.current) return;

    hasFetched.current = true;
    setInitialLoading(true);

    (async () => {
      try {
        const result = await getMyProfile();
        if (result.success) {
          const loadedForm = {
            username: result.data.username || "",
            fullName: result.data.profile?.fullName || "",
            email: result.data.email || "",
            no_hp: result.data.no_hp || "",
            diagnosis: result.data.profile?.diagnosis || "",
            medicalRecordNumber: result.data.profile?.medicalRecordNumber || "",
            chemoType: result.data.profile?.chemoType || "",
            radioType: result.data.profile?.radioType || "",
          };
          setForm(loadedForm);
          setInitialForm(loadedForm);
        } else {
          toast.error(result.error || "Gagal mengambil data profil.");
        }
      } catch (err) {
        toast.error(err?.message || "Terjadi kesalahan sistem.");
      } finally {
        setInitialLoading(false);
      }
    })();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "no_hp") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setForm((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isProfileChanged =
    Boolean(initialForm) &&
    (form.username !== initialForm.username ||
      form.no_hp !== initialForm.no_hp);

  const isBiodataChanged =
    Boolean(initialForm) &&
    (form.fullName !== initialForm.fullName ||
      form.medicalRecordNumber !== initialForm.medicalRecordNumber ||
      form.diagnosis !== initialForm.diagnosis ||
      form.chemoType !== initialForm.chemoType ||
      form.radioType !== initialForm.radioType);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);

    const dataToSubmit = {
      username: form.username,
      no_hp: form.no_hp,
    };
    const result = await updateMyProfile(dataToSubmit);

    if (result.success) {
      toast.success("Profile berhasil disimpan!");
      setInitialForm((prev) => ({
        ...prev,
        username: form.username,
        no_hp: form.no_hp,
      }));
    } else {
      const errorMsg =
        (result.errors && Object.values(result.errors)[0]) ||
        result.error ||
        "Gagal memperbarui profile.";
      toast.error(errorMsg);
    }
    setProfileLoading(false);
  };

  const handleBiodataSubmit = async (e) => {
    e.preventDefault();
    setBiodataLoading(true);

    const dataToSubmit = {
      fullName: form.fullName,
      diagnosis: form.diagnosis,
      medicalRecordNumber: form.medicalRecordNumber,
      chemoType: form.chemoType,
      radioType: form.radioType,
    };
    const result = await updateMyProfile(dataToSubmit);

    if (result.success) {
      toast.success("Biodata asesmen berhasil disimpan!");
      setInitialForm((prev) => ({
        ...prev,
        fullName: form.fullName,
        diagnosis: form.diagnosis,
        medicalRecordNumber: form.medicalRecordNumber,
        chemoType: form.chemoType,
        radioType: form.radioType,
      }));
    } else {
      const errorMsg =
        (result.errors && Object.values(result.errors)[0]) ||
        result.error ||
        "Gagal memperbarui biodata.";
      toast.error(errorMsg);
    }
    setBiodataLoading(false);
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <>
      <Tabs defaultValue="profile">
        <TabsList className="border border-gray-950 py-5">
          <TabsTrigger
            value="profile"
            className="text-base p-4 data-[state=active]:bg-slate-950 data-[state=active]:text-white cursor-pointer"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="biodata-asesmen"
            className="text-base p-4 data-[state=active]:bg-slate-950 data-[state=active]:text-white cursor-pointer"
          >
            Biodata Asesmen
          </TabsTrigger>
        </TabsList>

        {/* Profile Section */}
        <TabsContent value="profile">
          <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white mx-auto">
            <form onSubmit={handleProfileSubmit}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Profile</CardTitle>
                <CardDescription>
                  Kelola profile kamu dibawah ini.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 mt-5">
                  <Image
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                      form.username?.trim() || "User"
                    )}`}
                    alt="Avatar"
                    width={16}
                    height={16}
                    className="w-16 h-16 rounded-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Joko"
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={form.email}
                    readOnly
                    disabled
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="no_hp">No.Hp</Label>
                  <Input
                    id="no_hp"
                    name="no_hp"
                    placeholder="0812xxx"
                    value={form.no_hp}
                    onChange={handleChange}
                    type="tel"
                    autoComplete="tel"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={profileLoading || !isProfileChanged}
                    className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer text-white min-w-[140px]"
                  >
                    {profileLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Simpan Profile"
                    )}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </TabsContent>

        {/* Biodata Assessment Section */}
        <TabsContent value="biodata-asesmen">
          <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white mx-auto">
            <form onSubmit={handleBiodataSubmit}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Biodata Asesmen
                </CardTitle>
                <CardDescription>
                  Kelola biodata asesmen kamu dibawah ini.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2 mt-5">
                  <Label htmlFor="fullName">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Joko Prasetyo"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="space-y-2 mt-5">
                  <Label htmlFor="medicalRecordNumber">
                    Nomor Rekam Medis <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="medicalRecordNumber"
                    name="medicalRecordNumber"
                    value={form.medicalRecordNumber}
                    onChange={handleChange}
                    placeholder="Contoh: RM123456, RM-2025-001234, dsb."
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diagnosis">
                    Diagnosis <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="diagnosis"
                    name="diagnosis"
                    value={form.diagnosis}
                    onChange={handleChange}
                    placeholder="Contoh: Oral Mucositis Grade II (komplikasi terapi) + kanker orofaring, Kanker Paru-paru, dsb."
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chemoType">Jenis Kemoterapi</Label>
                  <Input
                    id="chemoType"
                    name="chemoType"
                    value={form.chemoType}
                    onChange={handleChange}
                    placeholder="Contoh: 5-FU + Cisplatin (CF regimen), Docetaxel + Cisplatin, dsb."
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="radioType">Jenis Radioterapi</Label>
                  <Input
                    id="radioType"
                    name="radioType"
                    value={form.radioType}
                    onChange={handleChange}
                    placeholder="Contoh: VMAT 66 Gy / 33 fraksi, 3D-CRT 60 Gy / 30 fraksi, dsb."
                    autoComplete="off"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={biodataLoading || !isBiodataChanged}
                    className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer text-white min-w-[140px]"
                  >
                    {biodataLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Simpan Biodata"
                    )}
                  </Button>
                </div>
              </CardContent>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

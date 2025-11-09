"use client";
import { startTransition, useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { getMyProfile, updateMyProfile } from "@/services/userService";
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

export default function ProfileForm() {
  const user = useAuthStore((state) => state.user);
  const hasFetched = useRef(false);
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    diagnosis: "",
    medicalRecordNumber: "",
    chemoType: "",
    radioType: "",
  });

  // State khusus untuk profile tab
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");

  // State khusus untuk biodata assessment tab
  const [biodataLoading, setBiodataLoading] = useState(false);
  const [biodataError, setBiodataError] = useState("");
  const [biodataSuccess, setBiodataSuccess] = useState("");

  // State loading awal (Get User Profile)
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!user || hasFetched.current) return;

    hasFetched.current = true;
    setInitialLoading(true);

    startTransition(() => {
      setProfileSuccess("");
      setProfileError("");
      setBiodataSuccess("");
      setBiodataError("");
    });

    (async () => {
      try {
        const result = await getMyProfile();
        if (result.success) {
          setForm({
            username: result.data.username || "",
            fullName: result.data.profile?.fullName || "",
            email: result.data.email || "",
            diagnosis: result.data.profile?.diagnosis || "",
            medicalRecordNumber:
              result.data.profile?.medicalRecordNumber || "",
            chemoType: result.data.profile?.chemoType || "",
            radioType: result.data.profile?.radioType || "",
          });
        } else {
          setProfileError(result.error || "Gagal mengambil profile");
          setBiodataError(result.error || "Gagal mengambil profile");
        }
      } catch (err) {
        setProfileError(err?.message || "Terjadi kesalahan");
        setBiodataError(err?.message || "Terjadi kesalahan");
      } finally {
        setInitialLoading(false);
      }
    })();
  }, [user]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler profile submit
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError("");
    setProfileSuccess("");

    const dataToSubmit = {
      username: form.username,
    };
    const result = await updateMyProfile(dataToSubmit);

    if (result.success) {
      setProfileSuccess("Perubahan berhasil disimpan!");
      useAuthStore.setState({ user: { ...user, username: result.data.username } });
    } else {
      setProfileError(result.error);
    }
    setProfileLoading(false);
  };

  // Handler biodata assessment submit
  const handleBiodataSubmit = async (e) => {
    e.preventDefault();
    setBiodataLoading(true);
    setBiodataError("");
    setBiodataSuccess("");

    const dataToSubmit = {
      fullName: form.fullName,
      diagnosis: form.diagnosis,
      medicalRecordNumber: form.medicalRecordNumber,
      chemoType: form.chemoType,
      radioType: form.radioType,
    };
    const result = await updateMyProfile(dataToSubmit);

    if (result.success) {
      setBiodataSuccess("Perubahan berhasil disimpan!");
    } else {
      setBiodataError(result.error);
    }
    setBiodataLoading(false);
  };

  // Tampilkan loading awal jika belum selesai
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Handle Menu Tabs*/}
      <Tabs defaultValue="profile">
        <TabsList className="border border-gray-950">
          <TabsTrigger value="profile" className="text-base p-3">
            Profile
          </TabsTrigger>
          <TabsTrigger value="biodata-assessment" className="text-base p-3">
            Biodata Assessment
          </TabsTrigger>
        </TabsList>

        {/* Profile Section */}
        <TabsContent value="profile">
          <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white mx-auto">
            <form onSubmit={handleProfileSubmit}>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Kelola data profile kamu.</CardDescription>
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
                  <Label htmlFor="name">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
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
                  />
                  <p className="text-xs text-gray-500">
                    Email tidak dapat diubah.
                  </p>
                </div>

                {profileError && (
                  <p className="text-sm text-red-500">{profileError}</p>
                )}
                {profileSuccess && (
                  <p className="text-sm text-green-500">{profileSuccess}</p>
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={profileLoading}
                    className="bg-cyan-600 hover:bg-cyan-700"
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
        <TabsContent value="biodata-assessment">
          <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white mx-auto">
            <form onSubmit={handleBiodataSubmit}>
              <CardHeader>
                <CardTitle>Biodata Assessment</CardTitle>
                <CardDescription>
                  Kelola data biodata assessment kamu.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2 mt-5">
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2 mt-5">
                  <Label htmlFor="medicalRecordNumber">Nomor Rekam Medis</Label>
                  <Input
                    id="medicalRecordNumber"
                    name="medicalRecordNumber"
                    value={form.medicalRecordNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Input
                    id="diagnosis"
                    name="diagnosis"
                    value={form.diagnosis}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chemoType">Jenis Chemo</Label>
                  <Input
                    id="chemoType"
                    name="chemoType"
                    value={form.chemoType}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="radioType">Jenis Radio</Label>
                  <Input
                    id="radioType"
                    name="radioType"
                    value={form.radioType}
                    onChange={handleChange}
                  />
                </div>

                {biodataError && (
                  <p className="text-sm text-red-500">{biodataError}</p>
                )}
                {biodataSuccess && (
                  <p className="text-sm text-green-500">{biodataSuccess}</p>
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={biodataLoading}
                    className="bg-cyan-600 hover:bg-cyan-700"
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

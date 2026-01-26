"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { registerUser } from "@/services/auth.Service";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    no_hp: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "no_hp") {
      const numericValue = value.replace(/[^0-9]/g, "");

      setForm({ ...form, [name]: numericValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const result = await registerUser(form);

      if (result.success) {
        toast.success("Registrasi Berhasil!", {
          description: "Selamat datang di e-OMc! Silakan masuk.",
          duration: 5000,
        });

        const randomValues = new Uint8Array(20);
        crypto.getRandomValues(randomValues);
        const uniqueToken = Array.from(randomValues)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

        sessionStorage.setItem("registerSuccessToken", uniqueToken);
        router.push(`/auth/success?token=${uniqueToken}`);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ global: result.error || "Terjadi kesalahan." });
        }
      }
    } catch (err) {
      console.error(err);
      setErrors({ global: "Terjadi kesalahan sistem. Silakan coba lagi." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={70}
          height={70}
          className="mx-auto"
        />
        <CardTitle className="font-bold text-xl text-center">
          Buat Akun Baru
        </CardTitle>
        <CardDescription className="text-center">
          Daftar untuk memulai menggetahui kondisi mukositis oral Anda.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Joko"
                onChange={handleChange}
                autoComplete="username"
                required
              />
              {errors.username && (
                <span className="text-xs text-red-500">{errors.username}</span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="joko@gmail.com"
                onChange={handleChange}
                autoComplete="email"
                required
              />
              {errors.email && (
                <span className="text-xs text-red-500">{errors.email}</span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="no_hp">No.Hp</Label>
              <Input
                id="no_hp"
                name="no_hp"
                type="tel"
                pattern="[0-9]*"
                inputMode="numeric"
                placeholder="0812xxx"
                value={form.no_hp}
                onChange={handleChange}
                required
              />
              {errors.no_hp && (
                <span className="text-xs text-red-500">{errors.no_hp}</span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-xs text-red-500">{errors.password}</span>
              )}
            </div>
          </div>
          {errors.global && (
            <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded text-center">
              <span className="text-xs text-red-600 font-medium">
                {errors.global}
              </span>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full mt-4 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Loading..." : "Daftar"}
          </Button>
          <div className="flex justify-center items-center gap-1 text-sm">
            <p>Sudah punya akun?</p>
            <Link
              href="/auth/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Masuk
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

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
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const isPhoneNumber = /^[0-9]+$/.test(identifier);

      let emailPaylod = null;
      let noHpPayload = null;

      if (isPhoneNumber) {
        noHpPayload = identifier;
      } else {
        emailPaylod = identifier;
      }

      const result = await login(emailPaylod, noHpPayload, password);

      if (result.success) {
        toast.success("Login Berhasil!", {
          description: "Selamat datang kembali di e-OMc!",
          duration: 5000,
        });

        router.push("/");
      } else {
        if (result.errors && typeof result.errors === "object") {
          const newErrors = {};

          if (result.errors.no_hp) newErrors.identifier = result.errors.no_hp;
          if (result.errors.email) newErrors.identifier = result.errors.email;

          if (result.errors.password)
            newErrors.password = result.errors.password;

          setErrors(newErrors);
        } else {
          setErrors({ global: result.error || "Login Gagal" });
        }
      }
    } catch (err) {
      console.error(err);
      setErrors({ global: "Terjadi kesalahan. Silakan coba lagi." });
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
          Selamat Datang Kembali!
        </CardTitle>
        <CardDescription className="text-center">
          Masuk untuk melanjutkan
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="identifier">Email/No.Hp</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="0812xxx | joko@gmail.com"
                onChange={(e) => setIdentifier(e.target.value)}
                value={identifier}
                required
              />
              {errors.identifier && (
                <span className="text-xs text-red-500 font-medium">
                  {errors.identifier}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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
                <span className="text-xs text-red-500 font-medium">
                  {errors.password}
                </span>
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
            {loading ? "Loading..." : "Masuk"}
          </Button>
          <div className="flex justify-center items-center gap-1 text-sm">
            <p>Belum punya akun?</p>
            <Link
              href="/auth/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Daftar
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

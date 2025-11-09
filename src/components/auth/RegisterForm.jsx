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
import { registerUser } from "@/services/authService";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password.length < 6) {
      setError("Password minimal harus 6 karakter.");
      setLoading(false);
      return;
    }

    try {
      const result = await registerUser(form);

      if (result.success) {
        const randomValues = new Uint8Array(20);
        crypto.getRandomValues(randomValues);
        const uniqueToken = Array.from(randomValues)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

        sessionStorage.setItem("registerSuccessToken", uniqueToken);
        router.push(`/auth/success?token=${uniqueToken}`);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
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
          Daftar untuk memulai perjalanan Anda bersama kami.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                type="text"
                placeholder=""
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder=""
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
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

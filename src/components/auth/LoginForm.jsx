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
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        router.push("/");
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
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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

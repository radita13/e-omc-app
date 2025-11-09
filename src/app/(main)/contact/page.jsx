"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <section className="min-h-[calc(100vh-64px)] bg-gray-50 py-16">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Hubungi Kami</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Punya pertanyaan tentang platform e-OMC, kemitraan, atau butuh
            dukungan teknis? Kami siap membantu.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 items-start bg-white shadow-lg p-5 rounded-2xl">
          <Card className="bg-cyan-700 text-white p-8 shadow-lg rounded-2xl border-none h-full relative overflow-hidden">
            <CardContent className="p-0 z-10 relative">
              <h3 className="text-xl font-semibold mb-3">Informasi Kontak</h3>
              <p className="text-cyan-100 mb-6">
                Anda dapat menghubungi kami melalui email.
              </p>

              <ul className="space-y-4 text-white">
                <li className="flex items-center gap-3 break-all">
                  <Mail className="w-5 h-5 shrink-0" />
                  <span>elektronikoralmukositis@gmail.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <span>Puskesmas Berbah, Daerah Istimewa Yogyakarta</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <span>Stikes Notokusumo Yogyakarta</span>
                </li>
              </ul>

              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl z-0" />
            </CardContent>
          </Card>

          <div className="p-8 md:col-span-2">
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm text-gray-600">
                    Nama Anda
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Nama Lengkap"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm text-gray-600">
                    Email Anda
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@anda.com"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="text-sm text-gray-600">
                  Subjek
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Misal: Pertanyaan Teknis"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm text-gray-600">
                  Pesan
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tuliskan pesan Anda di sini..."
                  className="mt-1 h-32"
                />
              </div>

              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-md">
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

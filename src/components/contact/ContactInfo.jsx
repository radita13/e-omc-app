"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
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
  );
}

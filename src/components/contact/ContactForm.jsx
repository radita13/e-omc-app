"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ContactForm() {
  return (
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
  );
}

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake } from "lucide-react";

export default function AcknowledgementSection() {
  return (
    <section className="bg-gradient-to-b from-cyan-800 to-cyan-900 text-white py-20">
      <div className="container mx-auto sm:px-15 px-4 text-center">
        {/* Ikon Apresiasi */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-cyan-700 rounded-full shadow-lg">
            <HeartHandshake className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Judul */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
          Acknowledgements
        </h2>

        {/* Kotak Logo dengan background putih */}


        {/* Card Ucapan Terima Kasih */}
        <Card className="bg-cyan-700 border-cyan-600 text-white mx-auto max-w-3xl shadow-xl">
          <CardContent className="p-8">
            <div className="bg-white rounded-2xl shadow-xl px-8 inline-block mb-8">
              <div className="flex justify-center items-center sm:gap-10 gap-0 flex-wrap">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                  <Image
                    src="/images/partner/Logo-bima.png"
                    alt="Logo BIMA"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative w-28 h-28 sm:w-48 sm:h-32">
                  <Image
                    src="/images/partner/Logo-kementrian.png"
                    alt="Logo Kemendikbudristek"
                    fill
                    className="object-contain shrink-0"
                  />
                </div>
              </div>
            </div>
            <p className="text-lg sm:text-xl leading-relaxed text-center">
              <span className="block mb-4">
                Tim PKM menyampaikan rasa terima kasih yang sebesar-besarnya
                kepada
              </span>
              <span className="font-semibold text-cyan-200">
                BIMA - Kemendikbudristek
              </span>
              <span className="block mt-2">
                atas dukungan dana hibah Program Kreativitas Mahasiswa (PKM)
                tahun 2025 yang telah diberikan.
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Kutipan */}
        <p className="mt-8 text-sm text-cyan-200 italic max-w-2xl mx-auto">
          “Dukungan ini menjadi semangat bagi kami untuk terus berinovasi
          memberikan dampak nyata bagi masyarakat.”
        </p>
      </div>
    </section>
  );
}

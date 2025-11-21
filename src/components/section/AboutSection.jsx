import { BookOpenText, Check, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-15">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left Column - Image */}
          <div className="md:w-1/2 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-xl mx-auto w-full flex justify-center">
              <Image
                src="/images/illustration/about.png"
                width={600}
                height={600}
                alt="Tentang Kami"
                className="w-full h-auto max-w-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-emerald-600/20 to-transparent" />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="sm:text-4xl text-3xl font-bold text-gray-900">
              Tentang <span className="text-emerald-600">e-OMc</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              e-OMc adalah platform digital inovatif yang didedikasikan untuk
              transformasi perawatan mukositis oral. Kami hadir untuk
              menjembatani kebutuhan pasien dan tenaga kesehatan dalam
              penanganan kondisi ini.
            </p>

            <div className="space-y-4">
              {/* <div className="flex items-start space-x-4">
                <div className="shrink-0 mt-1">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-100 text-emerald-600">
                    <Check />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Konsultasi Online
                  </h3>
                  <p className="text-gray-600">
                    Konsultasi dengan tenaga kesehatan profesional kapan saja
                    dan di mana saja.
                  </p>
                </div>
              </div> */}

              <div className="flex items-start space-x-4">
                <div className="shrink-0 mt-1">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-100 text-emerald-600">
                    <ShieldCheck />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Pemantauan Berkala
                  </h3>
                  <p className="text-gray-600">
                    Pantau perkembangan kondisi oral mukositis Anda dengan mudah
                    melalui platform kami.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="shrink-0 mt-1">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-100 text-emerald-600">
                    <BookOpenText />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Edukasi Pasien
                  </h3>
                  <p className="text-gray-600">
                    Akses berbagai materi edukasi tentang perawatan mukositis
                    oral.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

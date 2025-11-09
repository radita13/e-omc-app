import { CheckSquare, Video, HeartHandshake, Wallet } from "lucide-react";

const features = [
  {
    icon: <CheckSquare className="h-8 w-8 text-cyan-600" />,
    title: "Asesmen Mandiri",
    description: "Lakukan asesmen mandiri kapan saja, di mana saja.",
  },
  {
    icon: <Video className="h-8 w-8 text-cyan-600" />,
    title: "Video Edukasi",
    description: "Pelajari cara merawat mulut melalui video interaktif.",
  },
  {
    icon: <HeartHandshake className="h-8 w-8 text-cyan-600" />,
    title: "Panduan Perawatan",
    description: "Dapatkan rekomendasi perawatan berdasarkan hasil asesmen.",
  },
  {
    icon: <Wallet className="h-8 w-8 text-cyan-600" />,
    title: "Hemat Biaya",
    description: "Mengurangi biaya kunjungan dengan deteksi & perawatan dini.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-15">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

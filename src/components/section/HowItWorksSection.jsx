function StepCard({ number, title, description }) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
          {number}
        </div>
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Bagaimana e-OMc Bekerja?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hanya 3 langkah mudah untuk memulai
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <StepCard
            number="01"
            title="Daftar Akun"
            description="Buat akun di e-OMc"
          />
          <StepCard
            number="02"
            title="Lakukan Asesmen"
            description="Jawab kuesioner asesmen mandiri di e-OMc"
          />
          <StepCard
            number="03"
            title="Dapatkan Hasil"
            description="Lihat skor dan rekomendasi perawatan"
          />
        </div>
      </div>
    </section>
  );
}

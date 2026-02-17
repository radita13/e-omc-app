"use client";

export default function VideoSection() {
  return (
    <section className="pb-20 pt-10 bg-white">
      <div className="container mx-auto px-4 sm:px-15 max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-800">
          Video Animasi
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10 max-w-4xl mx-auto">
          Tonton penjelasan singkat mengenai video animasi e-OMC dan bagaimana
          platform ini membantu pasien dalam memahami dan merawat mukositis oral
          dengan lebih mudah dan efektif.
        </p>

        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src="https://player.cloudinary.com/embed/?cloud_name=dakh6bkz8&public_id=Video_Animasi_V2_psertk"
            title="Video Animasi e-OMC"
            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg border border-gray-200"
            border="0"
            allow="accelerometer; gyroscope; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Kontak",
};

export default function ContactPage() {
  return (
    <section className="min-h-[calc(100vh-64px)] bg-gray-50 py-16">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Hubungi Kami</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Punya pertanyaan tentang platform e-OMC, kemitraan, atau dukungan
            teknis? Kami siap membantu.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 bg-white shadow-lg p-5 rounded-2xl">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

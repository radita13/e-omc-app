"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Apa itu Oral Mukositis?",
    answer:
      "Oral mukositis adalah luka atau sariawan di dalam mulut yang sering muncul saat menjalani kemoterapi atau radioterapi.",
  },
  {
    question: "Kapan saya harus melakukan asesmen mandiri?",
    answer:
      "Anda disarankan melakukan asesmen mandiri secara rutin, terutama jika Anda mulai merasakan gejala awal seperti nyeri, kemerahan, atau kesulitan makan.",
  },
  {
    question: "Apakah asesmen ini menggantikan konsultasi dokter?",
    answer:
      "Tidak. Asesmen ini adalah alat bantu untuk deteksi dini. Anda harus tetap berkonsultasi dengan petugas kesehatan Anda mengenai kondisi Anda.",
  },
];

export default function FaqSection() {
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        Frequently Asked Questions (FAQ)
      </h2>
      <div className="max-w-7xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg md:text-xl text-left cursor-pointer hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

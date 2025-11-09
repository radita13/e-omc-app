"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";

const membersTeam = [
  {
    name: "Ni Ketut Kardiyudiani. M.Kep., Sp.Kep.MB.,PhDNS",
    image: "/images/team/image1.png",
  },
  {
    name: "Rudi Haryono, S.Kep., Ns.,M.Kep",
    image: "/images/team/image2.png",
  },
  {
    name: "apt.Pramitha Esha ND, M.Sc., PhD",
    image: "/images/team/image3.png",
  },
];

export default function TeamSection() {
  return (
    <section className="w-full bg-white py-15">
      <div className="max-w-7xl mx-auto sm:px-15 px-4 text-center">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Tim PMP
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Peningkatan Kompetensi Caring dengan e-OMC (Elektronik - Oral
          Mukositis) sebagai deteksi dini oral mukositis pasien kanker
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {membersTeam.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow duration-300 py-0 relative "
            >
              <div className="relative w-full h-[450px]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-[70%_30%] "
                />
              </div>
              {/* Overlay teks di dalam gambar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-lg text-center w-[90%] max-w-[320px] shadow-sm">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

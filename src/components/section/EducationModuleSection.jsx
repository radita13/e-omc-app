import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, BookOpen, FileImage } from "lucide-react";

const modules = [
  {
    icon: <PlayCircle className="h-10 w-10 text-white" />,
    title: "Video Interaktif",
    description: "Cara mencuci mulut, menyikat gigi, dan mendeteksi mandiri.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-white" />,
    title: "E-Book Panduan",
    description:
      "Panduan lengkap caring & oral mukositis tersaji dalam bentuk artikel. ",
  },
  {
    icon: <FileImage className="h-10 w-10 text-white" />,
    title: "Interpretasi Klinis",
    description:
      "Interpretasi klinis mukositis (grade 0-4) yang dijelaskan secara ringkas dan mudah dipahami.",
  },
];

export default function EducationModuleSection() {
  return (
    <section className="bg-cyan-800 text-white py-20">
      <div className="container mx-auto sm:px-15 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Modul Edukasi Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((module) => (
            <Card
              key={module.title}
              className="bg-cyan-700 border-cyan-600 text-white"
            >
              <CardHeader>
                <div className="mb-4">{module.icon}</div>
                <CardTitle>{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{module.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

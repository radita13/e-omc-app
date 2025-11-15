import Link from "next/link";
import { BookCheck } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PetugasPanduanCard() {
  return (
    <Card className="mb-16 bg-gray-50 shadow-lg border-cyan-600 border-2">
      <div className="grid md:grid-cols-3 items-center">
        <div className="md:col-span-2 p-8">
          <CardHeader className="p-0">
            <CardTitle className="text-3xl font-bold">
              Panduan Klinis Oral Mukositis
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Tinjauan komprehensif mengenai patofisiologi, dampak, dan
              penatalaksanaan mukositis oral berbasis bukti ilmiah.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 mt-6">
            <Link href="/artikel/petugas/panduan-klinis">
              <Button className="bg-cyan-600 hover:bg-cyan-700 cursor-pointer">
                <BookCheck className="mr-2 h-5 w-5" />
                Baca Panduan Sekarang
              </Button>
            </Link>
          </CardContent>
        </div>

        <div className="hidden md:flex justify-center p-8">
          <BookCheck className="h-32 w-32 text-cyan-200" />
        </div>
      </div>
    </Card>
  );
}

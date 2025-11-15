"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton({ href }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <Button asChild variant="link" className="p-0 text-cyan-600">
        <Link href={href} className="flex items-center gap-2">
          <ArrowLeft className="sm:size-10 size-8" />
        </Link>
      </Button>
    </div>
  );
}

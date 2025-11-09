import { guideData } from "@/lib/data/professionalGuide";
import GuideKlinisLayout from "@/components/guide/GuideKlinisLayout";

export default function Page() {
  return (
    <div className="container mx-auto sm:px-10 px-4 py-10">
      <GuideKlinisLayout guideData={guideData} />
    </div>
  );
}

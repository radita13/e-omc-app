import { getArticles } from "@/services/article.Service";
import PetugasHeader from "@/components/articles/petugas/PetugasHeader";
import PetugasPanduanCard from "@/components/articles/petugas/PetugasPanduanCard";
import PetugasArticleCard from "@/components/articles/petugas/PetugasArticleCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Artikel Edukasi Petugas",
};

export default async function ArtikelPetugasPage() {
  const result = await getArticles("petugas");
  const articles = result.success ? result.data : [];

  return (
    <div className="container mx-auto sm:px-15 px-4 py-16">
      <PetugasHeader />

      <PetugasPanduanCard />

      <PetugasArticleCard
        articles={articles}
        error={!result.success ? result.error : null}
      />
    </div>
  );
}

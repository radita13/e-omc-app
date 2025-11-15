import PatientArticleCard from "../pasien/PatientArticleCard";

export default function PatientArticleList({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <p className="col-span-3 text-center text-gray-500">
        Belum ada artikel edukasi untuk pasien.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-15">
      {articles.map((article) => (
        <PatientArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

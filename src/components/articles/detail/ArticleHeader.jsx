export default function ArticleHeader({ title, description }) {
  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center">{title}</h1>

      <p className="text-lg text-gray-600 text-center mb-12">{description}</p>
    </>
  );
}

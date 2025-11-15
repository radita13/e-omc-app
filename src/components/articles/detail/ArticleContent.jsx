import ArticleSlider from "@/components/shared/ArticleSlider";
import ArticleVideo from "@/components/shared/ArticleVideo";

export default function ArticleContent({ images, videoUrl, title }) {
  return (
    <>
      <ArticleSlider images={images} title={title} />
      <ArticleVideo videoUrl={videoUrl} />
    </>
  );
}

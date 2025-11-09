"use client";

export default function ArticleVideo({ videoUrl }) {
  if (!videoUrl) return null;

  const isYoutube =
    videoUrl.includes("youtube") || videoUrl.includes("youtu.be");

  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
  const match = videoUrl.match(youtubeRegex);
  const embedUrl = match?.[1]
    ? `https://www.youtube.com/embed/${match[1]}`
    : videoUrl;

  return (
    <section className="mt-10 flex justify-center w-full">
      {isYoutube ? (
        <iframe
          src={embedUrl}
          loading="lazy"
          className="w-full aspect-video rounded-xl shadow"
          allowFullScreen
        />
      ) : (
        <video
          src={videoUrl}
          controls
          className="w-full aspect-video rounded-xl shadow"
        />
      )}
    </section>
  );
}

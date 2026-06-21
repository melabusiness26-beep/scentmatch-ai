/**
 * Trailer-Bereich. Wandelt YouTube-Links in ein eingebettetes Video um.
 * Bei anderen URLs wird ein einfacher "Trailer ansehen"-Link gezeigt.
 */
function youtubeId(url: string): string | null {
  const m =
    url.match(/[?&]v=([^&]+)/) ||
    url.match(/youtu\.be\/([^?]+)/) ||
    url.match(/embed\/([^?]+)/);
  return m ? m[1] : null;
}

export default function TrailerEmbed({ url, title }: { url: string; title: string }) {
  const id = youtubeId(url);

  if (!id) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
        ▶ Trailer ansehen
      </a>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-line">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={`${title} – Trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="h-full w-full"
      />
    </div>
  );
}

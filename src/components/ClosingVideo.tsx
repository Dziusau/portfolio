type Props = { src: string; title?: string };

export default function ClosingVideo({ src, title = 'Project video' }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-6 mt-12">
      <div className="aspect-video w-full rounded-sm overflow-hidden bg-ink-2">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

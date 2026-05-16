type Props = { before: string; after: string };

export default function BeforeAfter({ before, after }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <figure>
        <img src={before} alt="Before — blockout" loading="lazy" className="w-full aspect-[16/10] object-cover rounded-sm" />
        <figcaption className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mt-2">Before · blockout</figcaption>
      </figure>
      <figure>
        <img src={after} alt="After — polished" loading="lazy" className="w-full aspect-[16/10] object-cover rounded-sm" />
        <figcaption className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mt-2">After · polished</figcaption>
      </figure>
    </div>
  );
}

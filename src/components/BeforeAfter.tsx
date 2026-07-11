import ZoomableImage from './ZoomableImage';

type Props = { before: string; after: string };

export default function BeforeAfter({ before, after }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      <figure>
        <ZoomableImage src={before} alt="Before" className="w-full aspect-[16/10] object-cover rounded-sm" />
        <figcaption className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mt-2">Before</figcaption>
      </figure>
      <figure>
        <ZoomableImage src={after} alt="After" className="w-full aspect-[16/10] object-cover rounded-sm" />
        <figcaption className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mt-2">After</figcaption>
      </figure>
    </div>
  );
}

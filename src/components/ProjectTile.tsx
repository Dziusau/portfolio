import { Link } from 'react-router-dom';
import type { Project } from '../data/types';

type Props = { project: Project };

export default function ProjectTile({ project }: Props) {
  const { slug, number, title, thumbnail, meta } = project;
  const metaLine = meta.game;
  return (
    <Link
      to={`/projects/${slug}`}
      className="group relative block aspect-[16/10] overflow-hidden rounded-sm bg-ink-2"
      aria-label={title}
    >
      <img
        src={thumbnail}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="absolute top-3 left-3 font-mono text-[10px] tracking-wider2 text-white/80 z-10">
        {number}
      </span>

      <div
        className={
          'absolute inset-0 flex flex-col justify-end p-4 z-10 ' +
          'bg-gradient-to-t from-black/80 via-black/40 to-transparent ' +
          'opacity-100 lg:opacity-0 lg:group-hover:opacity-100 ' +
          'motion-safe:transition-opacity motion-safe:duration-200'
        }
      >
        <div className="text-white font-semibold leading-tight">{title}</div>
        <div className="font-mono text-[10px] text-white/70 mt-1 tracking-wider2 uppercase">
          {metaLine}
        </div>
        <div className="font-mono text-[10px] text-white/60 mt-2 hidden lg:block">↗ Open project</div>
      </div>
    </Link>
  );
}

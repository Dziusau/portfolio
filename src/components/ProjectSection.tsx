import type { ProjectSection as S } from '../data/types';
import BeforeAfter from './BeforeAfter';
import ZoomableImage from './ZoomableImage';

type Props = { section: S };

export default function ProjectSection({ section }: Props) {
  const { kind, label, title, body, map, media, beforeAfter } = section;
  // In logic sections the copy sits between the top-down map and the supporting
  // media; everywhere else it introduces the section above the imagery.
  const bodyBetweenImages = kind === 'logic';
  const bodyEl = body && (
    <p className="text-base leading-relaxed text-muted max-w-3xl whitespace-pre-line">{body}</p>
  );
  return (
    <section className="grid lg:grid-cols-[120px_1fr] gap-4 lg:gap-12 py-10 border-t border-ink-2">
      <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet lg:pt-1">
        {label}
      </div>

      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">{title}</h2>
        {!bodyBetweenImages && bodyEl}

        {map && (
          <figure className="mt-6">
            <ZoomableImage
              src={map}
              alt={`Top-down map — ${title}`}
              className="w-full max-w-2xl aspect-square object-contain rounded-sm bg-ink-2"
            />
          </figure>
        )}

        {bodyBetweenImages && bodyEl && <div className={map ? 'mt-6' : undefined}>{bodyEl}</div>}

        {media && media.length > 0 && (
          <div
            className={
              'mt-4 grid gap-2 ' +
              (media.length === 1 ? 'grid-cols-1' : media.length === 2 ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2')
            }
          >
            {media.map((src, i) => (
              <ZoomableImage
                key={src}
                src={src}
                alt={`${title} — image ${i + 1}`}
                className="w-full aspect-[16/10] object-cover rounded-sm bg-ink-2"
              />
            ))}
          </div>
        )}

        {beforeAfter &&
          beforeAfter.map((ba, i) => <BeforeAfter key={i} before={ba.before} after={ba.after} />)}
      </div>
    </section>
  );
}

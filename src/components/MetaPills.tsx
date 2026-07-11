import type { ProjectMeta } from '../data/types';

type Props = { meta: ProjectMeta };

export default function MetaPills({ meta }: Props) {
  const pills = [meta.game, meta.studio, meta.role];
  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((label) => (
        <span
          key={label}
          className="font-mono text-[10px] uppercase tracking-wider2 px-3 py-1 rounded-full border border-ink-3 text-muted"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

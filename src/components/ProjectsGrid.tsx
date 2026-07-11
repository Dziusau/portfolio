import { projects } from '../data/projects';
import ProjectTile from './ProjectTile';

export default function ProjectsGrid() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 pb-12 md:pb-16">
      <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-6">
        → Selected projects
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {projects.map((p) => (
          <ProjectTile key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

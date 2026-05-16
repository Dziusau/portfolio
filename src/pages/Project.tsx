import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { findProjectBySlug, getNextProject } from '../lib/projectNav';
import MetaPills from '../components/MetaPills';
import ProjectSection from '../components/ProjectSection';
import ClosingVideo from '../components/ClosingVideo';
import NotFound from './NotFound';

export default function Project() {
  const { slug = '' } = useParams();
  const project = findProjectBySlug(projects, slug);
  if (!project) return <NotFound />;

  const next = getNextProject(projects, slug);

  return (
    <article>
      <div className="w-full aspect-[16/9] md:aspect-[16/7] bg-ink-2">
        <img src={project.hero.src} alt={project.title} className="w-full h-full object-cover" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-10 md:pt-14">
        <MetaPills meta={project.meta} />
        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          {project.title}
        </h1>
        {project.tagline && (
          <p className="mt-3 font-mono text-xs uppercase tracking-wider2 text-quiet">
            {project.tagline}
          </p>
        )}
        <p className="mt-6 text-base md:text-lg leading-relaxed text-muted max-w-3xl">
          {project.intro}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        {project.sections.map((s, i) => (
          <ProjectSection key={`${s.label}-${i}`} section={s} />
        ))}
      </div>

      {project.closingVideo && (
        <ClosingVideo src={project.closingVideo} title={`${project.title} — gameplay`} />
      )}

      <nav className="max-w-6xl mx-auto px-6 mt-16 flex justify-between font-mono text-xs uppercase tracking-wider2 text-quiet">
        <Link to="/#projects" className="hover:text-white">← Back to projects</Link>
        {next && (
          <Link to={`/projects/${next.slug}`} className="hover:text-white">
            Next: {next.title} →
          </Link>
        )}
      </nav>
    </article>
  );
}

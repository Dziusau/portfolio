import { about } from '../data/about';

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-6">
        → About
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <p className="text-white text-lg leading-relaxed max-w-2xl">{about.bio}</p>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-3">Tools</div>
          <ul className="text-sm text-muted leading-7">
            {about.tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <a
            href={about.cvUrl}
            download
            className="inline-block mt-6 px-4 py-2 bg-white text-ink-0 font-semibold text-sm rounded-full hover:bg-white/90"
          >
            CV ↓
          </a>
        </div>
      </div>
    </section>
  );
}

import { about } from '../data/about';

export default function Footer() {
  const { email, linkedin, artstation, vimeo } = about.contacts;
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-2 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3 text-sm text-muted">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-3">Contact</div>
          <a href={`mailto:${email}`} className="block hover:text-white">{email}</a>
          <a href={linkedin} target="_blank" rel="noreferrer" className="block hover:text-white">LinkedIn</a>
        </div>

        {(artstation || vimeo) && (
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-3">Elsewhere</div>
            {artstation && <a href={artstation} target="_blank" rel="noreferrer" className="block hover:text-white">ArtStation</a>}
            {vimeo && <a href={vimeo} target="_blank" rel="noreferrer" className="block hover:text-white">Vimeo</a>}
          </div>
        )}

        <div className="md:text-right">
          <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-3">Site</div>
          <p>© {year} Aleksandr Dyusov</p>
          <p className="text-quiet">Built with React + Tailwind</p>
        </div>
      </div>
    </footer>
  );
}

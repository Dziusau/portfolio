import { Link } from 'react-router-dom';
import { about } from '../data/about';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-ink-0/80 backdrop-blur border-b border-ink-2">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          aria-label="Aleksandr Dyusov — home"
          className="inline-flex items-center justify-center w-7 h-7 border border-white/30 text-[11px] font-bold tracking-tight text-white hover:border-white"
        >
          A
        </Link>

        <nav className="flex items-center gap-2 text-xs">
          <a
            href={`mailto:${about.contacts.email}`}
            className="px-3 py-1 rounded-full border border-ink-3 text-muted hover:text-white hover:border-ink-4"
          >
            Email
          </a>
          <a
            href={about.contacts.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1 rounded-full border border-ink-3 text-muted hover:text-white hover:border-ink-4"
          >
            LinkedIn
          </a>
          <a
            href={about.cvUrl}
            download
            className="px-3 py-1 rounded-full bg-white text-ink-0 font-semibold hover:bg-white/90"
          >
            CV ↓
          </a>
        </nav>
      </div>
    </header>
  );
}

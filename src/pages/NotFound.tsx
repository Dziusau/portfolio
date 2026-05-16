import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="font-mono text-[10px] uppercase tracking-wider2 text-quiet mb-4">
        404 · lost in the dunes
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        This page does not exist.
      </h1>
      <Link to="/" className="inline-block mt-6 text-white underline">
        ← Back to portfolio
      </Link>
    </section>
  );
}

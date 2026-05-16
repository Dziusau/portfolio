import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="p-8">
      <p className="text-muted">Page not found.</p>
      <Link to="/" className="underline mt-2 inline-block">← Back home</Link>
    </div>
  );
}

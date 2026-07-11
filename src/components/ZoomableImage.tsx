import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
};

export default function ZoomableImage({ src, alt, className, loading = 'lazy' }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading={loading}
        onClick={() => setOpen(true)}
        className={(className ? className + ' ' : '') + 'cursor-zoom-in'}
      />

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 font-mono text-xs uppercase tracking-wider2 text-quiet hover:text-white"
            >
              ✕ Esc
            </button>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain cursor-zoom-out"
            />
          </div>,
          document.body,
        )}
    </>
  );
}

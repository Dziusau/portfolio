export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 min-h-[40vh] flex flex-col justify-center">
      <h1 className="font-extrabold tracking-tight leading-none text-white text-[clamp(40px,7vw,80px)]">
        Aleksandr Dyusov
      </h1>
      <p className="mt-4 text-sm text-muted">
        <span className="font-mono text-white tracking-wider2 uppercase">Level &amp; Scenario Designer</span>
        <span className="px-2">·</span>
        World of Tanks, Wargaming
      </p>
    </section>
  );
}

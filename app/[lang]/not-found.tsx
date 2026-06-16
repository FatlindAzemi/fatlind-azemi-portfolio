import Link from "next/link";

// Plain server component: no locale awareness needed here (the proxy already
// redirected to /de or /en before this can render). Keep copy bilingual-safe.
export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-background text-foreground">
      <p className="eyebrow mb-6">404</p>
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-[0.95]">
        Page not found
      </h1>
      <p className="text-white/50 text-base md:text-lg max-w-md mb-10">
        The page you&apos;re looking for drifted off into the data stream.
      </p>
      <Link
        href="/"
        className="btn-glow btn-glow-primary"
      >
        Back home
      </Link>
    </section>
  );
}

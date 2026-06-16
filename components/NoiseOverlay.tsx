"use client";

interface NoiseOverlayProps {
  className?: string;
  opacity?: number;
}

/**
 * Subtle fixed film-grain noise overlay.
 *
 * Rendered as an inline SVG turbulence filter so no external asset is needed.
 * feTurbulence is deterministic, so the SVG is safe to server-render and needs
 * no mounted-guard (no hydration mismatch). Pointer-events disabled and hidden
 * from assistive tech.
 */
export default function NoiseOverlay({
  className = "",
  opacity = 0.035,
}: NoiseOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 w-screen h-screen pointer-events-none ${className}`}
      style={{ opacity, zIndex: 9999 }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}

"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollTimelineConfig {
  /** ScrollTrigger start offset. */
  start?: string;
  /** ScrollTrigger end offset. */
  end?: string;
  /** Scrub smoothing (true = 0, number = smoothing seconds). */
  scrub?: boolean | number;
  /** Pin the trigger element during the timeline. */
  pin?: boolean;
  /** Show debugging markers. */
  markers?: boolean;
  /** Trigger element reference. */
  trigger: RefObject<HTMLElement | null>;
  /**
   * Build the timeline. The timeline is already configured with a ScrollTrigger
   * scrubbing the animation to scroll progress.
   */
  builder: (timeline: gsap.core.Timeline, trigger: HTMLElement) => void;
}

/**
 * Create a GSAP timeline scrubbed to a ScrollTrigger.
 *
 * The timeline is automatically killed on unmount or dependency change to avoid
 * memory leaks and double triggers in React Strict Mode.
 */
export function useScrollTimeline(
  config: ScrollTimelineConfig,
  deps: React.DependencyList = []
): void {
  const savedConfig = useRef(config);
  savedConfig.current = config;

  useEffect(() => {
    if (typeof window === "undefined" || !config.trigger.current) return;

    const trigger = config.trigger.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: config.start ?? "top bottom",
        end: config.end ?? "bottom top",
        scrub: config.scrub ?? 1,
        pin: config.pin ?? false,
        markers: config.markers ?? false,
      },
    });

    config.builder(tl, trigger);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

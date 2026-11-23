import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Whether scroll reveals should run. Off for prefers-reduced-motion, and off
 * in automated browsers (navigator.webdriver): the build-time prerender
 * snapshots the DOM, and a reveal's hidden start state (opacity 0) would
 * otherwise be baked into the static HTML for content below the fold.
 */
function revealsEnabled() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (navigator.webdriver) return false;
  return true;
}

/**
 * Gentle fade-and-rise for a section as it scrolls into view. Attach the
 * returned ref to the section; every descendant marked `data-reveal` animates,
 * in DOM order with a short stagger. Runs once (no reverse on scroll-up) and
 * only animates opacity/transform, so it never moves the layout.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !revealsEnabled()) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.09,
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return ref;
}

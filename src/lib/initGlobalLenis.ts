import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

declare global {
  interface Window {
    __mwLenis?: Lenis;
  }
}

export const initGlobalLenis = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    return null;
  }

  gsap.registerPlugin(ScrollTrigger);

  if (window.__mwLenis) {
    return window.__mwLenis;
  }

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
  window.__mwLenis = lenis;

  return lenis;
};

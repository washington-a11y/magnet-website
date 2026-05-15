import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * splitWords — wraps each word in a clip container so GSAP can
 * slide it up from below the mask ("text emerge" effect).
 *
 * Returns a cleanup function that restores the original innerHTML.
 *
 * Usage:
 *   const cleanup = splitWords(el);
 *   gsap.from(el.querySelectorAll(".split-word"), { y: "110%", ... });
 *   // on unmount: cleanup();
 */
export function splitWords(el: HTMLElement): () => void {
  const original = el.innerHTML;
  const text = el.textContent ?? "";

  el.innerHTML = text
    .split(" ")
    .map(
      (word) =>
        `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;line-height:inherit">` +
        `<span class="split-word" style="display:inline-block">${word}</span>` +
        `</span>`
    )
    .join(" ");

  return () => {
    el.innerHTML = original;
  };
}

/**
 * animateHeading — splits a heading into words and scroll-triggers
 * a staggered clip-emerge animation.
 *
 * @param el        The heading element to animate
 * @param options   Overrides for the ScrollTrigger config
 * @returns cleanup function (restore original html + kill ScrollTrigger)
 */
export function animateHeading(
  el: HTMLElement,
  options: {
    start?: string;
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
  } = {}
): () => void {
  const {
    start    = "top 88%",
    duration = 0.75,
    stagger  = 0.07,
    delay    = 0,
    ease     = "power4.out",
  } = options;

  const restore = splitWords(el);
  const words = el.querySelectorAll<HTMLElement>(".split-word");

  gsap.set(words, { y: "110%" });

  const st = ScrollTrigger.create({
    trigger: el,
    start,
    onEnter: () =>
      gsap.to(words, {
        y: "0%",
        duration,
        stagger,
        delay,
        ease,
        overwrite: "auto",
      }),
    onLeaveBack: () =>
      gsap.to(words, {
        y: "110%",
        duration: duration * 0.6,
        stagger: stagger * 0.5,
        ease: "power3.in",
        overwrite: "auto",
      }),
  });

  return () => {
    st.kill();
    restore();
  };
}

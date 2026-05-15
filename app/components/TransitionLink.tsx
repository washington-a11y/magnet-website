"use client";

import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { usePageTransition } from "./TransitionContext";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * TransitionLink — drop-in replacement for <a> on internal routes.
 *
 * Intercepts clicks, plays the exit animation (curtain slides in),
 * then lets Next.js router.push() do the navigation.
 * External links, hash links, and modifier-key clicks are passed through.
 */
const TransitionLink = forwardRef<HTMLAnchorElement, Props>(function TransitionLink(
  { href, onClick, children, ...props },
  ref
) {
  const { navigate } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Pass through: external, hash, mailto, modifier keys
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      href.startsWith("http") ||
      href.startsWith("#") ||
      href.startsWith("mailto")
    ) {
      onClick?.(e);
      return;
    }

    e.preventDefault();
    onClick?.(e);
    navigate(href);
  };

  return (
    <a ref={ref} href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
});

export default TransitionLink;

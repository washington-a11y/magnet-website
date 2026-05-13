"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WorkItemHero({
  heroImg,
  projectName,
}: {
  heroImg: string;
  projectName: string;
}) {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 1.2,
        ease: "power3.out",
        clearProps: "opacity,scale",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="project-hero w-full bg-[#f9faff] px-[32px] pt-[32px]">
      <div
        ref={imgRef}
        className="project-hero-image relative w-full h-[640px] rounded-[8px] overflow-hidden"
      >
        <img
          src={heroImg}
          alt={projectName}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
}

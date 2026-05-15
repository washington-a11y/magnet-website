"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imgVectorM  = "/assets/74eedc4876e73c3efff47e73a1ab172fcf2345f0.svg";
const imgVectorA  = "/assets/832b31364304dc024a9d95606cc195f0c6d867fa.svg";
const imgVectorG  = "/assets/f396358826920d0fcfe97c1734fcc79e717e1ab6.svg";
const imgVectorN  = "/assets/09c6e3847c2a9da11f17d5976e22d9e379752999.svg";
const imgVectorE  = "/assets/d376bbfaf87b16b9f1819c6e1f2cbaa6e67ff3a7.svg";
const imgVectorT  = "/assets/c7d13a0a8c7c53f021e0ca1578dd61043a8ad36b.svg";
const imgArrow    = "/assets/714abcd3e8cb1f8571b281786c0effc8828750fa.svg";
const imgPlusIcon = "/assets/34a5f835f54ad0f8263cebeded849b7f8f78548d.svg";

const FOOTER_MARQUEE =
  "BRANDING, WEB, UI/UX, STRATEGY, DESIGN, CORPORATE IDENTITY, PROTOTYPES, KEYNOTE PRESENTATIONS, ADVERTISING, COPYWRITING, CONTENT GENERATION, DIGITAL, OUTDOOR, PRODUCT NAMING, PRODUCT DEVELOPMENT, PACKAGING, BROCHURES, CATALOGUES, FLYERS, DESIGN, PHOTOGRAPHY, ART DIRECTION, PHOTO RETOUCHING, ILLUSTRATION, DIRECT MAIL, EXHIBITIONS + TRADE SHOWS, EVENTS, SIGNAGE.";

const NAV_LINKS = ["Home", "Work", "Services", "About", "Contact us"];
const SOCIAL = [
  { name: "Dribbble", href: "#" },
  { name: "Behance",  href: "#" },
  { name: "LinkedIn", href: "#" },
];

export default function Footer() {
  const footerRef  = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Marquee ──
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: "-50%",
          duration: 80,
          ease: "none",
          repeat: -1,
        });
      }

      // ── Footer logo letters fan in ──
      gsap.from(".footer-logo-letter", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // ── Underline hover — same mechanic as NavScroll ──
      const links = gsap.utils.toArray<HTMLElement>(".footer-anim-link");
      links.forEach((link) => {
        const line = link.querySelector<HTMLElement>(".footer-underline");
        if (!line) return;

        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

        const enter = () =>
          gsap.to(line, { scaleX: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        const leave = () =>
          gsap.to(line, {
            scaleX: 0,
            duration: 0.25,
            ease: "power2.in",
            transformOrigin: "right center",
            overwrite: "auto",
            onComplete: () => gsap.set(line, { transformOrigin: "left center" }),
          });

        link.addEventListener("mouseenter", enter);
        link.addEventListener("mouseleave", leave);
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative flex flex-col gap-[64px] w-full bg-[#111921] px-[32px] py-[64px]"
    >
      {/* ── Marquee strip ── */}
      <div className="w-full overflow-hidden py-[10px]">
        <div ref={marqueeRef} className="flex w-max">
          {[FOOTER_MARQUEE, FOOTER_MARQUEE].map((text, i) => (
            <p
              key={i}
              className="font-['Swis721_Ex_BT',sans-serif] font-bold text-[61px] text-[#fafafa] tracking-[-0.99px] whitespace-nowrap mr-[64px]"
            >
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* ── Footer columns ── */}
      <div className="flex gap-[32px] items-start w-full">

        {/* Newsletter */}
        <div
          className="flex flex-col gap-[32px] border-b border-[rgba(250,250,250,0.3)] pb-[10px]"
          style={{ width: "383px" }}
        >
          <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[24px] text-[#fafafa] leading-[1.05]">
            Subscribe to our newsletter
          </p>
          <div className="border-b border-[rgba(250,250,250,0.3)] pb-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[14px] text-[#a0a3a6] tracking-[0.28px] outline-none placeholder:text-[#a0a3a6]"
            />
          </div>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-[8px] flex-1">
          {NAV_LINKS.map((link) => (
            <div key={link} className="flex items-center gap-[8px]">
              <a
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="footer-anim-link relative inline-block font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[16px] text-[#fafafa] uppercase leading-[1.5] pb-[1px]"
              >
                {link}
                <span className="footer-underline absolute bottom-0 left-0 w-full h-[1px] bg-[#fafafa] block" />
              </a>
              {link === "Services" && (
                <img src={imgPlusIcon} alt="" className="w-[16px] h-[16px]" />
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="flex-1">
          <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[19px] text-[rgba(250,250,250,0.5)] leading-[1.2] mb-2">
            Contact us
          </p>
          <a
            href="mailto:sales@magnetstudio.ca"
            className="footer-anim-link relative inline-block font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[19px] text-[#fafafa] leading-[1.2] pb-[1px]"
          >
            sales@magnetstudio.ca
            <span className="footer-underline absolute bottom-0 left-0 w-full h-[1px] bg-[#fafafa] block" />
          </a>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-[21px] w-[459px]">
          <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[19px] text-[rgba(250,250,250,0.5)] leading-[1.2]">
            Social links
          </p>
          {SOCIAL.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              className="footer-anim-link relative inline-flex items-center gap-1 pb-[1px] w-fit"
            >
              <span className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[19px] text-[#fafafa] leading-[31px]">
                {name}
              </span>
              <img
                src={imgArrow}
                alt=""
                className="w-[30px] h-[30px]"
              />
              <span className="footer-underline absolute bottom-0 left-0 w-full h-[1px] bg-[#fafafa] block" />
            </a>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex flex-col gap-[16px] w-full">
        <div className="flex flex-col gap-[40px]">
          <hr className="border-[rgba(250,250,250,0.15)] w-full" />
          <div className="flex items-center justify-between">
            <p className="font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[16px] text-[#fafafa] leading-[1.2]">
              © 2026 MAGNETSTUDIO
            </p>
            <div className="flex gap-[40px]">
              {["Terms of use", "Privacy policy"].map((t) => (
                <a
                  key={t}
                  href="#"
                  className="footer-anim-link relative inline-block font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[16px] text-[#fafafa] uppercase leading-[1.5] pb-[1px]"
                >
                  {t}
                  <span className="footer-underline absolute bottom-0 left-0 w-full h-[1px] bg-[#fafafa] block" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer logo */}
        <div
          ref={logoRef}
          className="relative w-full shrink-0 overflow-hidden"
          style={{ aspectRatio: "1229 / 165" }}
        >
          {[
            { letter: "M", img: imgVectorM, style: { inset: "2.1% 81.04% 2.5% 0" } },
            { letter: "A", img: imgVectorA, style: { inset: "2.5% 63.09% 1.93% 20.03%" } },
            { letter: "G", img: imgVectorG, style: { inset: "0 46.8% 0 36.36%" } },
            { letter: "N", img: imgVectorN, style: { inset: "2.5% 30.12% 2.5% 54.39%" } },
            { letter: "E", img: imgVectorE, style: { inset: "2.5% 15.44% 2.47% 71.1%" } },
            { letter: "T", img: imgVectorT, style: { inset: "2.5% 0 1.93% 86.19%" } },
          ].map(({ letter, img, style }) => (
            <div key={letter} className="footer-logo-letter absolute" style={style}>
              <img src={img} alt={letter} className="absolute inset-0 w-full h-full" style={{ maxWidth: "none" }} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

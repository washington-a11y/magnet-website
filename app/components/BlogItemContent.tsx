"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlogPostContent } from "../data/posts";

gsap.registerPlugin(ScrollTrigger);

const SHARE_PLATFORMS = [
  {
    id: "x",
    label: "Share on X",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.751 2h2.78l-6.07 6.94L19.5 18h-5.59l-4.38-5.727L4.28 18H1.498l6.49-7.417L1 2h5.733l3.958 5.231L15.751 2Zm-.976 14.4h1.54L5.31 3.578H3.659L14.775 16.4Z" fill="#fafafa"/>
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "Share on LinkedIn",
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.477 3a1.477 1.477 0 1 1 0 2.954A1.477 1.477 0 0 1 4.477 3ZM3 7.5h2.954V17H3V7.5ZM8 7.5h2.83v1.3h.04C11.27 7.9 12.39 7.3 13.7 7.3c2.98 0 3.53 1.96 3.53 4.51V17H14.28v-4.59c0-1.1-.02-2.5-1.53-2.5-1.54 0-1.77 1.2-1.77 2.43V17H8V7.5Z" fill="#fafafa"/>
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Share on Facebook",
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 2H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h7.58v-6.1H8.08V9.5h2.5V7.41c0-2.48 1.52-3.83 3.73-3.83 1.06 0 1.97.08 2.24.11v2.6h-1.54c-1.2 0-1.44.57-1.44 1.41V9.5h2.87l-.37 2.4h-2.5V18H17a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" fill="#fafafa"/>
      </svg>
    ),
  },
  {
    id: "copy",
    label: "Copy link",
    getUrl: (url: string) => url,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.586 4.586a2 2 0 1 1 2.828 2.828l-3 3a2 2 0 0 1-2.828 0 1 1 0 0 0-1.414 1.414 4 4 0 0 0 5.656 0l3-3a4 4 0 0 0-5.656-5.656l-1.5 1.5a1 1 0 1 0 1.414 1.414l1.5-1.5Zm-5 5a2 2 0 0 1 2.828 0 1 1 0 1 0 1.414-1.414 4 4 0 0 0-5.656 0l-3 3a4 4 0 1 0 5.656 5.656l1.5-1.5a1 1 0 1 0-1.414-1.414l-1.5 1.5a2 2 0 1 1-2.828-2.828l3-3Z" fill="#fafafa"/>
      </svg>
    ),
  },
];

function ShareBar() {
  function handleShare(platform: typeof SHARE_PLATFORMS[0]) {
    const url  = typeof window !== "undefined" ? window.location.href : "";
    const title = typeof document !== "undefined" ? document.title : "";

    if (platform.id === "copy") {
      navigator.clipboard.writeText(url).then(() => {
        const btn = document.querySelector(`[data-share="copy"]`);
        if (btn) {
          btn.textContent = "Copied!";
          setTimeout(() => { btn.textContent = ""; }, 2000);
        }
      });
      return;
    }

    window.open(platform.getUrl(url, title), "_blank", "width=600,height=500,noopener,noreferrer");
  }

  return (
    <div className="post-share flex flex-col gap-[8px] items-center w-full">
      <p className="post-share-title font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[24px] text-[#111921] leading-[1.05] text-center">
        Share this article
      </p>
      <div className="post-share-icons flex gap-[16px] items-center justify-center h-[40px]">
        {SHARE_PLATFORMS.map((platform) => (
          <div key={platform.id} className="relative group">
            {/* Tooltip */}
            <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#111921] text-[#fafafa] text-[12px] font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] tracking-[0.24px] whitespace-nowrap px-[10px] py-[5px] rounded-[4px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {platform.label}
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#111921]" />
            </div>

            <button
              data-share={platform.id}
              aria-label={platform.label}
              onClick={() => handleShare(platform)}
              className="post-share-icon bg-[#111921] w-[40px] h-[40px] rounded-[4px] flex items-center justify-center hover:bg-[#2a2a2a] transition-colors duration-200 cursor-pointer"
            >
              {platform.icon}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogItemContent({ content }: { content: BlogPostContent }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".post-quote", {
        y: 32, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: ".post-quote", start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.from(".post-body", {
        y: 24, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: ".post-body", start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.from(".post-subscribe", {
        y: 24, opacity: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: ".post-subscribe", start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.from(".post-share", {
        y: 24, opacity: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: ".post-share", start: "top 88%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="post-content-section w-full bg-[#f9faff] px-[32px] py-[64px] flex justify-center"
    >
      <div className="post-content-inner flex flex-col gap-[32px] w-full max-w-[800px]">

        {/* Quote */}
        <div className="post-quote bg-[#f9faff] rounded-[16px] px-[16px] py-[32px] flex flex-col gap-[10px] items-center text-center w-full">
          <p className="post-quote-text font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[42px] text-[#111921] leading-[1.2] w-[588px]">
            "{content.quote.text}"
          </p>
          <p className="post-quote-attribution font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[14px] text-[#111921] tracking-[0.28px] leading-[1.5]">
            {content.quote.attribution}
          </p>
        </div>

        {/* Body — first part */}
        <div
          className="post-body font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[18px] text-[#111921] tracking-[0.36px] leading-[1.5] flex flex-col gap-[16px]"
          dangerouslySetInnerHTML={{ __html: content.bodyHtml }}
        />

        {/* Subscribe */}
        <div className="post-subscribe bg-[#c6d0fd] rounded-[16px] p-[32px] flex flex-col gap-[16px] w-full">
          <p className="post-subscribe-title font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] font-medium text-[24px] text-[#111921] leading-[1.05]">
            Subscribe to our newsletter
          </p>
          <div className="post-subscribe-form bg-white border border-[#cfd1d3] rounded-[8px] h-[50px] flex items-center justify-between pl-[16px] pr-[4px] py-[16px]">
            <span className="post-subscribe-placeholder font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[14px] text-[#111921] tracking-[0.28px] opacity-45">
              Your email address
            </span>
            <div className="post-subscribe-btn bg-[#111921] w-[40px] h-[40px] rounded-[4px] flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" fill="#fafafa"/>
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" fill="#fafafa"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Body — second part */}
        <div
          className="post-body font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[18px] text-[#111921] tracking-[0.36px] leading-[1.5] flex flex-col gap-[16px]"
          dangerouslySetInnerHTML={{ __html: content.bodyHtml2 }}
        />

        {/* Callout / Conclusion */}
        <div className="post-callout border-t border-[rgba(65,71,77,0.3)] py-[32px] flex flex-col gap-[16px]">
          <div
            className="post-callout-body font-['Neue_Haas_Grotesk_Text_Pro',sans-serif] text-[18px] text-[#111921] tracking-[0.36px] leading-[1.5] flex flex-col gap-[16px]"
            dangerouslySetInnerHTML={{ __html: content.conclusionHtml }}
          />
        </div>

        {/* Share */}
        <ShareBar />

      </div>
    </section>
  );
}

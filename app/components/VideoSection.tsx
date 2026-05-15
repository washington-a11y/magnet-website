"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function EyesIllustration({
  leftPupilRef,
  rightPupilRef,
}: {
  leftPupilRef: React.RefObject<SVGGElement>;
  rightPupilRef: React.RefObject<SVGGElement>;
}) {
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      overflow="visible"
      viewBox="0 0 87 74.6781"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <g id="Group_1709">
        <g id="Group_1710">
          <path
            id="Vector_235"
            d="M11.9402 68.7315C10.7801 64.3195 9.62006 59.9075 8.81923 56.8242C8.0184 53.741 7.61198 52.1202 6.65741 47.8233C5.70283 43.5263 4.21242 36.6023 3.31912 32.0875C2.42582 27.5728 2.1748 25.6771 2.06064 24.115C1.68007 18.907 3.15155 15.8491 4.7399 13.7428C5.75839 12.3922 7.05424 11.5556 8.97887 11.0665C12.2123 10.2448 14.7243 10.3745 15.8823 10.3506C20.2041 10.2613 23.1439 11.1966 25.0359 12.8684C26.6217 14.2695 29.0197 17.2725 30.393 18.9527C32.0221 20.946 32.6331 22.8765 33.6297 25.4039C34.0569 26.4874 34.4234 27.1264 35.0957 29.6661C35.7679 32.2057 36.7601 36.6163 37.3101 39.0052C37.9151 41.6329 38.122 42.4271 38.3897 43.8343C38.7647 45.8052 39.0811 49.4134 39.1374 53.7605C39.1989 58.5069 38.7881 59.6664 38.0987 61.7981C37.198 64.5832 34.7426 67.0797 31.5025 69.9849C29.8921 71.4288 27.6547 71.9188 23.131 72.5464C20.3758 72.9286 18.9481 72.4143 17.4659 71.8326C16.7977 71.3897 16.2427 71.044 15.7974 70.8722C15.5722 70.7911 15.3485 70.7223 15.066 70.6514"
            stroke="#FAFAFA" strokeWidth="4" strokeLinecap="round"
          />
          <g ref={leftPupilRef}>
            <path d="M18.4025 30.1918C21.3494 32.2139 21.7832 36.5432 22.0305 38.6031C22.6142 43.4647 22.9552 45.9507 22.8228 47.7974C22.7785 48.4143 22.628 48.9732 22.3291 49.5033C21.6677 50.6765 18.9693 51.6818 17.1111 52.2881C15.1051 52.9426 11.2816 50.4839 8.66511 47.1338C6.49381 44.3538 5.66335 41.2107 5.13215 38.9873C4.04334 34.43 5.54873 31.346 6.41509 29.0002C6.56151 28.6038 6.77118 28.4331 7.01553 28.227C7.25987 28.0208 7.58816 27.8094 7.97871 27.875C8.5338 27.9683 9.0388 28.2217 9.51205 28.606C11.5581 27.6191 15.965 28.5193 18.4025 30.1918Z" fill="#FAFAFA"/>
            <path d="M8.23297 29.7182C8.26679 29.6494 8.50025 29.397 8.95382 28.9777C9.11094 28.8324 9.29865 28.709 9.51205 28.606M12.0019 41.0993C12.3493 41.0863 12.6359 41.1732 12.8063 41.3466C12.9766 41.5199 13.0291 41.7721 13.1463 41.8164C13.4403 41.7017 13.8387 41.9854 14.0815 41.6206C14.3968 41.1466 14.9497 39.4181 15.251 39.6973C15.6478 40.0649 12.5149 49.6203 14.8265 46.6521C15.2248 46.1406 15.9351 44.8767 15.8004 43.3927C15.4422 39.4446 15.2575 38.467 14.2382 36.4655C12.5046 33.0617 11.2135 29.9879 9.51205 28.606M9.51205 28.606C11.5581 27.6191 15.965 28.5193 18.4025 30.1918C21.3494 32.2139 21.7832 36.5432 22.0305 38.6031C22.6142 43.4647 22.9552 45.9507 22.8228 47.7974C22.7785 48.4143 22.628 48.9732 22.3291 49.5033C21.6677 50.6765 18.9693 51.6818 17.1111 52.2881C15.1051 52.9426 11.2816 50.4839 8.66511 47.1338C6.49381 44.3538 5.66335 41.2107 5.13215 38.9873C4.04334 34.43 5.54873 31.346 6.41509 29.0002C6.56151 28.6038 6.77118 28.4331 7.01553 28.227C7.25987 28.0208 7.58816 27.8094 7.97871 27.875C8.5338 27.9683 9.0388 28.2217 9.51205 28.606Z" stroke="#FAFAFA" strokeWidth="4" strokeLinecap="round"/>
          </g>
        </g>

        <path
          id="Vector_235_2"
          d="M57.7968 60.3868C56.6367 55.9748 55.4766 51.5627 54.6758 48.4795C53.875 45.3962 53.4685 43.7755 52.514 39.4786C51.5594 35.1816 50.069 28.2576 49.1757 23.7428C48.2824 19.228 48.0314 17.3324 47.9172 15.7702C47.5366 10.5623 49.0081 7.50436 50.5965 5.39806C51.615 4.04745 52.9108 3.21082 54.8354 2.72176C58.0689 1.90012 60.5809 2.02973 61.7388 2.00583C66.0606 1.9166 69.0005 2.85191 70.8925 4.52363C72.4782 5.92479 74.8763 8.92777 76.2495 10.6079C77.8787 12.6013 78.4897 14.5317 79.4863 17.0592C79.9135 18.1427 80.28 18.7817 80.9522 21.3213C81.6245 23.861 82.6166 28.2715 83.1667 30.6604C83.7717 33.2882 83.9785 34.0824 84.2463 35.4895C84.6213 37.4605 84.9377 41.0687 84.994 45.4157C85.0554 50.1622 84.6447 51.3216 83.9553 53.4534C83.0546 56.2385 80.5991 58.735 77.3591 61.6401C75.7487 63.0841 73.5113 63.5741 68.9875 64.2017C66.2324 64.5839 64.8047 64.0696 63.3225 63.4879C62.6543 63.0449 62.0993 62.6992 61.6539 62.5275C61.4287 62.4463 61.2051 62.3775 60.9226 62.3066"
          stroke="#FAFAFA" strokeWidth="4" strokeLinecap="round"
        />
        <g ref={rightPupilRef}>
          <path d="M64.2591 21.8471C67.206 23.8692 67.6398 28.1985 67.8871 30.2583C68.4708 35.12 68.8117 37.6059 68.6793 39.4526C68.6351 40.0695 68.4845 40.6285 68.1857 41.1586C67.5243 42.3318 64.8258 43.3371 62.9677 43.9434C60.9616 44.5979 57.1382 42.1392 54.5217 38.7891C52.3504 36.0091 51.5199 32.866 50.9887 30.6426C49.8999 26.0853 51.4053 23.0013 52.2717 20.6555C52.4181 20.2591 52.6277 20.0884 52.8721 19.8822C53.1164 19.6761 53.4447 19.4647 53.8353 19.5303C54.3904 19.6235 54.8954 19.877 55.3686 20.2613C57.4146 19.2744 61.8215 20.1745 64.2591 21.8471Z" fill="#FAFAFA"/>
          <path d="M54.0895 21.3735C54.1234 21.3047 54.3568 21.0523 54.8104 20.633C54.9675 20.4877 55.1552 20.3643 55.3686 20.2613M57.8585 32.7546C58.2059 32.7416 58.4925 32.8285 58.6628 33.0018C58.8332 33.1752 58.8856 33.4274 59.0029 33.4716C59.2968 33.357 59.6953 33.6407 59.938 33.2758C60.2534 32.8019 60.8062 31.0734 61.1076 31.3526C61.5043 31.7202 58.3714 41.2756 60.683 38.3074C61.0814 37.7958 61.7916 36.532 61.657 35.048C61.2988 31.0999 61.1141 30.1223 60.0947 28.1208C58.3612 24.7169 57.0701 21.6431 55.3686 20.2613M55.3686 20.2613C57.4146 19.2744 61.8215 20.1745 64.2591 21.8471C67.206 23.8692 67.6398 28.1985 67.8871 30.2583C68.4708 35.12 68.8117 37.6059 68.6793 39.4526C68.6351 40.0695 68.4845 40.6285 68.1857 41.1586C67.5243 42.3318 64.8258 43.3371 62.9677 43.9434C60.9616 44.5979 57.1382 42.1392 54.5217 38.7891C52.3504 36.0091 51.5199 32.866 50.9887 30.6426C49.8999 26.0853 51.4053 23.0013 52.2717 20.6555C52.4181 20.2591 52.6277 20.0884 52.8721 19.8822C53.1164 19.6761 53.4447 19.4647 53.8353 19.5303C54.3904 19.6235 54.8954 19.877 55.3686 20.2613Z" stroke="#FAFAFA" strokeWidth="4" strokeLinecap="round"/>
        </g>
      </g>
    </svg>
  );
}

export default function VideoSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const videoRef      = useRef<HTMLDivElement>(null);
  const subheadRef    = useRef<HTMLParagraphElement>(null);
  const eyesRef       = useRef<HTMLDivElement>(null);
  const leftPupilRef  = useRef<SVGGElement>(null);
  const rightPupilRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. Video reveal on scroll-in ──
      gsap.from(videoRef.current, {
        scale: 0.94,
        borderRadius: "48px",
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // ── 2. Subheadline stagger ──
      gsap.from(".video-headline-word", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: subheadRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // ── 3. Eyes hidden by default ──
      gsap.set(eyesRef.current, { opacity: 0, scale: 0.88, transformOrigin: "center center" });

      // ── 4. Blink timeline — runs on loop, paused until hover ──
      const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 1.34, paused: true });
      blinkTl
        .to(eyesRef.current, {
          scaleY: 0.05,
          duration: 0.08,
          ease: "power2.in",
          transformOrigin: "center 55%",
        })
        .to(eyesRef.current, {
          scaleY: 1,
          duration: 0.08,
          ease: "power2.out",
          transformOrigin: "center 55%",
        });

      // ── 5. Pupils drift down on scroll (only when visible) ──
      const pupils = [leftPupilRef.current, rightPupilRef.current].filter(Boolean);
      if (pupils.length) {
        gsap.to(pupils, {
          y: 5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 2,
          },
        });
      }

      // ── 6. Hover: show / hide eyes + toggle blink ──
      const videoEl = videoRef.current;
      if (!videoEl) return;

      const onEnter = () => {
        gsap.to(eyesRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
        blinkTl.play();
      };

      const onLeave = () => {
        gsap.to(eyesRef.current, {
          opacity: 0,
          scale: 0.88,
          duration: 0.35,
          ease: "power2.in",
          overwrite: "auto",
          onComplete: () => blinkTl.pause(0),
        });
      };

      videoEl.addEventListener("mouseenter", onEnter);
      videoEl.addEventListener("mouseleave", onLeave);

      // Cleanup handled by ctx.revert() which kills tweens;
      // remove listeners manually too
      return () => {
        videoEl.removeEventListener("mouseenter", onEnter);
        videoEl.removeEventListener("mouseleave", onLeave);
      };

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center gap-8 w-full bg-[#111921] px-[32px] py-[32px] z-10"
    >
      {/* Floating sub-headline */}
      <p
        ref={subheadRef}
        className="absolute top-[160px] left-1/2 -translate-x-1/2 text-center text-[#fafafa] text-[31px] leading-snug z-10 pointer-events-none whitespace-nowrap"
      >
        <span className="video-headline-word font-['Neue_Haas_Grotesk_Text_Pro',sans-serif]">Building</span>{" "}
        <span className="video-headline-word font-['Gyst_Variable',sans-serif] italic">Brands</span>
        <br />
        <span className="video-headline-word font-['Neue_Haas_Grotesk_Text_Pro',sans-serif]">For The Modern World</span>
        <br />
        <span className="video-headline-word font-['Gyst_Variable',sans-serif] italic">Since 2018</span>
      </p>

      {/* Main video */}
      <div
        ref={videoRef}
        className="relative rounded-[8px] overflow-hidden w-full cursor-none"
        style={{ maxWidth: "1270px", height: "858px", margin: "0 auto" }}
      >
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/_videos/v1/71f9263fd7a931f583808277e6961a0fa4cd3351" />
        </video>

        {/* Eye illustration — shown on hover */}
        <div
          ref={eyesRef}
          className="absolute pointer-events-none z-10"
          style={{
            width: "340px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <EyesIllustration leftPupilRef={leftPupilRef} rightPupilRef={rightPupilRef} />
        </div>
      </div>
    </section>
  );
}

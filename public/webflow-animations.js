/* ============================================================
   MAGNET STUDIO — Webflow GSAP Animations
   Targets: Home v2 page
   Dependencies: GSAP 3.12.5, ScrollTrigger, Lenis 1.3.23
   ============================================================ */
(function () {
  'use strict';

  /* ── Script loader ── */
  function loadScript(src) {
    return new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = resolve; // fail silently
      document.head.appendChild(s);
    });
  }

  /* ── Main init ── */
  function init() {
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    var Lenis = window.Lenis;
    if (!gsap || !ScrollTrigger || !Lenis) return;

    gsap.registerPlugin(ScrollTrigger);

    /* ──────────────────────────────────────────────
       1. LENIS SMOOTH SCROLL
    ────────────────────────────────────────────── */
    var lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // After all fonts + images have loaded, recalculate scroll height so
    // Lenis and ScrollTrigger agree on the full document length.
    // This fixes the "can't scroll to the bottom" issue caused by late-loading
    // assets changing the page height after init.
    window.addEventListener('load', function () {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    /* ──────────────────────────────────────────────
       2. HERO REVEAL
          Webflow classes: .herosection, .menu-item,
          .logo-letter, .new-header (H1), .video-promo
    ────────────────────────────────────────────── */
    var heroSection = document.querySelector('.herosection');
    if (heroSection) {
      var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Nav links fade down
      var menuItems = heroSection.querySelectorAll('.menu-item');
      if (menuItems.length) {
        tl.from(menuItems, { y: -20, opacity: 0, duration: 0.6, stagger: 0.08 });
      }

      // Logo letters fan in
      var logoLetters = heroSection.querySelectorAll('.logo-letter');
      if (logoLetters.length) {
        tl.from(logoLetters, { y: 40, opacity: 0, duration: 0.8, stagger: 0.06 }, '-=0.3');
      }

      // Hero headlines slide up
      var heroHeadings = heroSection.querySelectorAll('.new-header');
      if (heroHeadings.length) {
        tl.from(heroHeadings, { y: 60, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.4');
      }

      // Video scale + fade
      var heroVideo = heroSection.querySelector('.video-promo');
      if (heroVideo) {
        tl.from(heroVideo, { scale: 0.9, opacity: 0, duration: 0.9 }, '-=0.7');
      }
    }

    /* ──────────────────────────────────────────────
       2b. NAV LINK HOVER — sliding underline (matches Next.js demo)
           Targets all .menu-item links: hero nav + sticky nav
    ────────────────────────────────────────────── */
    document.querySelectorAll('.menu-item').forEach(function (link) {
      // Ensure the link is a positioning context
      link.style.position = 'relative';

      // Inject underline span
      var line = document.createElement('span');
      line.style.cssText = [
        'position:absolute',
        'bottom:-2px',
        'left:0',
        'width:100%',
        'height:1px',
        'background:currentColor',
        'display:block',
        'pointer-events:none'
      ].join(';');
      gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
      link.appendChild(line);

      link.addEventListener('mouseenter', function () {
        gsap.to(line, { scaleX: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      });
      link.addEventListener('mouseleave', function () {
        gsap.to(line, {
          scaleX: 0,
          duration: 0.25,
          ease: 'power2.in',
          transformOrigin: 'right center',
          overwrite: 'auto',
          onComplete: function () { gsap.set(line, { transformOrigin: 'left center' }); }
        });
      });
    });


    /* ──────────────────────────────────────────────
       3. HERO VIDEO SCROLL EXPAND
          As user scrolls, surrounding content fades out
          and the video scales to fill the full viewport
    ────────────────────────────────────────────── */
    var videoExpand = heroSection ? heroSection.querySelector('.video-promo') : null;
    if (videoExpand) {
      var vw = window.innerWidth;
      var vh = window.innerHeight;
      var r  = videoExpand.getBoundingClientRect();

      // Scale just enough to cover the viewport width
      var scaleNeeded = vw / r.width;

      // Translate video center to viewport center
      var tx = (vw / 2) - (r.left + r.width / 2);
      var ty = (vh / 2) - (r.top + r.height / 2);

      var fadeable = [
        heroSection.querySelector('.menutop-hero'),
        heroSection.querySelector('.logo-big'),
        heroSection.querySelector('.hero-wrapper'),
      ].filter(Boolean);

      var heroScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '+=800',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      // Surrounding content fades out
      if (fadeable.length) {
        heroScrollTl.to(fadeable, {
          autoAlpha: 0,
          duration: 0.4,
          ease: 'power2.in',
        }, 0);
      }

      // Video grows to fill the viewport
      heroScrollTl.to(videoExpand, {
        scale: scaleNeeded,
        x: tx,
        y: ty,
        borderRadius: 0,
        duration: 1,
        ease: 'power2.inOut',
      }, 0);
    }

    /* ──────────────────────────────────────────────
       4. FLAG WAVE (hero)
          Requires: flag image class "hero-flag"
    ────────────────────────────────────────────── */
    var heroFlag = document.querySelector('.canada');
    if (heroFlag) {
      // Primary wave — skew + slight horizontal compress
      gsap.to(heroFlag, {
        skewX: 7,
        scaleX: 0.94,
        duration: 0.9,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        transformOrigin: 'left center',
      });
      // Offset rotation for natural ripple feel
      gsap.to(heroFlag, {
        rotation: 2.5,
        duration: 1.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        transformOrigin: 'left center',
        delay: 0.2,
      });
    }

    /* ──────────────────────────────────────────────
       4. MARQUEES — override CSS, replace with GSAP
          Standard:  .marquee (wrapper) → .marquee-text (track)
          Partner:   .marquee-content (wrapper) → .marquee-left (track)
    ────────────────────────────────────────────── */
    var cssOverride = document.createElement('style');
    cssOverride.textContent = '.marquee-text { animation: none !important; transform: none; } .marquee-left { animation: none !important; }';
    document.head.appendChild(cssOverride);

    // Standard marquees — skip .marquee-left (it's a track not a wrapper)
    document.querySelectorAll('.marquee').forEach(function (wrap, wrapIndex) {
      if (wrap.classList.contains('marquee-left')) return;

      var track = wrap.querySelector('.marquee-text');
      if (!track) return;

      // Client logo strip gets a faster speed; footer text stays slow
      var duration = wrap.closest('.clientssection') ? 25 : 55;

      requestAnimationFrame(function () {
        var halfW = track.scrollWidth / 2;
        if (!halfW) return;
        var dir = wrapIndex % 2 === 0 ? -halfW : halfW;
        gsap.fromTo(track,
          { x: wrapIndex % 2 === 0 ? 0 : -halfW },
          { x: dir + 'px', duration: duration, ease: 'none', repeat: -1 }
        );
      });
    });

    // Partner images marquee — .marquee-left is the scrolling track itself
    var partnerTrack = document.querySelector('.marquee-left');
    if (partnerTrack) {
      // Duplicate content for a seamless infinite loop
      partnerTrack.innerHTML += partnerTrack.innerHTML;

      requestAnimationFrame(function () {
        var halfW = partnerTrack.scrollWidth / 2;
        if (!halfW) return;
        gsap.fromTo(partnerTrack,
          { x: 0 },
          { x: -halfW + 'px', duration: 35, ease: 'none', repeat: -1 }
        );
      });
    }

    /* ──────────────────────────────────────────────
       4. WORK SECTION — pinned scroll reveal + 3D card flip
          Requires: wrapper class "WorkSection"
                    slogan class "work-headline"
                    cards class "project-item"
                    card inner class "card-inner"
    ────────────────────────────────────────────── */
    var workSection  = document.querySelector('.worksection');
    var workCards    = gsap.utils.toArray('.project-item');

    var isMobile = window.innerWidth < 768;

    if (workSection && workCards.length) {
      if (isMobile) {
        /* ── MOBILE: no pin — simple scroll reveals ── */
        gsap.set('.slogan', { autoAlpha: 0, y: 20 });
        gsap.to('.slogan', {
          autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: workSection,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
        workCards.forEach(function (card, i) {
          var img = card.querySelector('.project-img');
          var startY = i % 2 === 0 ? -50 : 50;

          gsap.fromTo(card,
            { autoAlpha: 0, y: startY },
            {
              autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Inner image parallax — image drifts upward as card scrolls through viewport
          if (img) {
            gsap.fromTo(img,
              { y: 30 },
              {
                y: -30,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.5,
                },
              }
            );
          }
        });

      } else {
        /* ── DESKTOP: pinned timeline ── */
        gsap.set(workCards, { autoAlpha: 0 });
        gsap.set('.slogan', { autoAlpha: 0, y: 30 });

        // Single scrubbed timeline owns the slogan fully — no competing trigger
        var workTl = gsap.timeline({
          scrollTrigger: {
            trigger: workSection,
            start: 'top top',
            end: '+=2400',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        // Slogan reveals at start of pin, then fades out — all within the scrub
        workTl.to('.slogan', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' });
        workTl.to('.slogan', { autoAlpha: 0, y: -40, duration: 1, ease: 'power2.in' });

        // Cards reveal from alternating depth positions + image inner parallax
        workCards.forEach(function (card, i) {
          var img    = card.querySelector('.project-img');
          var startY = i % 2 === 0 ? -60 : 60;

          gsap.set(card, { y: startY }); // staggered start depth

          // Reveal: card slides to y:0 and fades in
          workTl.to(card, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '>');

          // Image drifts inside the card throughout the pin (runs parallel to reveal)
          if (img) {
            gsap.set(img, { y: 25 });
            workTl.to(img, { y: -25, ease: 'none', duration: 1.5 }, '<');
          }
        });
      }
    }

    // Hover reveal — image scales up, description overlay slides in
    workCards.forEach(function (card) {
      var img  = card.querySelector('.project-img');
      var desc = card.querySelector('.project-item-desc');
      if (desc) gsap.set(desc, { autoAlpha: 0, y: 16 });

      card.addEventListener('mouseenter', function () {
        if (img)  gsap.to(img,  { scale: 1.06, duration: 0.4, ease: 'power2.out' });
        if (desc) gsap.to(desc, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', function () {
        if (img)  gsap.to(img,  { scale: 1, duration: 0.4, ease: 'power2.out' });
        if (desc) gsap.to(desc, { autoAlpha: 0, y: 16, duration: 0.25, ease: 'power2.in' });
      });
    });

    /* ──────────────────────────────────────────────
       5. WHAT WE DO SECTION
          Header clipPath draw-in + service rows stagger + image parallax
          Webflow classes: .services-header, .services-item, .servicelist-item_image
    ────────────────────────────────────────────── */
    var whatWeDoTitle = document.querySelector('.services-header');
    if (whatWeDoTitle) {
      gsap.from(whatWeDoTitle, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: whatWeDoTitle,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    gsap.utils.toArray('.services-item').forEach(function (row, i) {
      gsap.from(row, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: row,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Image parallax
      var img = row.querySelector('.servicelist-item_image');
      if (img) {
        gsap.to(img, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    });

    /* ──────────────────────────────────────────────
       6. CTA SECTION
          Headline zoom-in + button bounce + illustrations float
          Requires: section class "cta-section"
                    headline (any h1/h2 inside it)
                    button class "cta-btn"
                    deco illustrations class "cta-deco"
    ────────────────────────────────────────────── */
    var ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
      var ctaHeadline = ctaSection.querySelector('h1, h2, .cta-header');
      var ctaBtn      = ctaSection.querySelector('.cta-button');

      if (ctaHeadline) {
        gsap.from(ctaHeadline, {
          opacity: 0,
          scale: 0.92,
          y: 30,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaSection,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      if (ctaBtn) {
        gsap.from(ctaBtn, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: 'back.out(1.7)',
          delay: 0.4,
          scrollTrigger: {
            trigger: ctaSection,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });

        // Button hover micro-interaction
        ctaBtn.addEventListener('mouseenter', function () {
          gsap.to(ctaBtn, { scale: 1.04, duration: 0.2 });
        });
        ctaBtn.addEventListener('mouseleave', function () {
          gsap.to(ctaBtn, { scale: 1, duration: 0.2 });
        });
      }

      // Floating deco illustrations
      gsap.utils.toArray('.cta-deco').forEach(function (el, i) {
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10,
          rotate: i % 2 === 0 ? 3 : -3,
          duration: 2.5 + i * 0.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    }

    /* ──────────────────────────────────────────────
       6. CLIENTS / PARTNER SECTION
          .star fade+rotate in
          .new-header handled by section 9 heading reveals
          .partner-p fade+slide up
          .stats-number stagger + counter animation
    ────────────────────────────────────────────── */
    var partnerContent = document.querySelector('.partner-content');
    if (partnerContent) {

      // Star icon — entrance then continuous spin/float like the flag
      var starEl = partnerContent.querySelector('.star');
      if (starEl) {
        gsap.from(starEl, {
          autoAlpha: 0,
          rotate: -45,
          scale: 0.6,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: partnerContent,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
        // Continuous rotation oscillation
        gsap.to(starEl, {
          rotation: 20,
          duration: 2.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          transformOrigin: 'center center',
        });
        // Offset scale pulse for organic feel
        gsap.to(starEl, {
          scale: 1.12,
          duration: 1.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 0.4,
          transformOrigin: 'center center',
        });
      }

      // Body copy fade up
      var partnerP = partnerContent.querySelector('.partner-p');
      if (partnerP) {
        gsap.from(partnerP, {
          autoAlpha: 0,
          y: 24,
          duration: 0.7,
          ease: 'power2.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: partnerContent,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Stats — stagger in + counter
      var statsNums = partnerContent.querySelectorAll('.stats-number');
      if (statsNums.length) {
        gsap.from(statsNums, {
          autoAlpha: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: partnerContent.querySelector('.stats-wrapper') || partnerContent,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        statsNums.forEach(function (el) {
          var original = el.textContent.trim();
          var finalNum = parseFloat(original.replace(/[^0-9.]/g, ''));
          var suffix   = original.replace(/^[\d.]+/, ''); // everything after the number
          if (!finalNum) return;
          gsap.fromTo(
            el,
            { textContent: '0' + suffix },
            {
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: function () {
                var progress = this.progress();
                var v = Math.round(finalNum * progress);
                el.textContent = v + suffix;
              },
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }

    /* ──────────────────────────────────────────────
       7. BLOG SECTION — "What's new"
          Header handled by section 8 (.new-header)
          Cards: .blog-item — stagger fade+slide in
    ────────────────────────────────────────────── */
    var blogItems = gsap.utils.toArray('.blog-item');
    if (blogItems.length) {
      gsap.from(blogItems, {
        autoAlpha: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: blogItems[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Image zoom on hover
      blogItems.forEach(function (card) {
        var img = card.querySelector('.blogitem-img');
        if (!img) return;
        card.addEventListener('mouseenter', function () {
          gsap.to(img, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', function () {
          gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' });
        });
      });
    }

    /* ──────────────────────────────────────────────
       8. STAT COUNTERS
    ────────────────────────────────────────────── */
    function animateCounter(el) {
      var original = el.textContent.trim();
      var finalNum = parseFloat(original.replace(/[^0-9.]/g, ''));
      var suffix   = original.replace(/[0-9.]/g, '');
      if (!finalNum) return;

      gsap.fromTo(
        el,
        { textContent: '0' },
        {
          textContent: finalNum,
          duration: 1.8,
          ease: 'power2.out',
          snap: { textContent: finalNum % 1 === 0 ? 1 : 0.1 },
          onUpdate: function () {
            var v = parseFloat(this.targets()[0].textContent || '0');
            el.textContent = (finalNum % 1 === 0 ? Math.round(v) : v.toFixed(1)) + suffix;
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    gsap.utils.toArray('.project-stats-item-title').forEach(animateCounter);

    document.querySelectorAll('div').forEach(function (el) {
      if (el.children.length > 0) return;
      if (/^[\d]+[+%]$/.test(el.textContent.trim())) {
        animateCounter(el);
      }
    });

    /* ──────────────────────────────────────────────
       8. SECTION HEADING REVEALS
    ────────────────────────────────────────────── */
    gsap.utils.toArray('.new-header, .header-sized, .caption-header').forEach(function (el) {
      if (el.closest('.herosection')) return;  // skip hero headings
      if (el.closest('.cta-section')) return;  // skip CTA heading — animated separately
      gsap.from(el, {
        autoAlpha: 0, y: 32, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
          toggleActions: 'play none none none',
        }
      });
    });

    /* ──────────────────────────────────────────────
       9. BENEFITS SECTION — icon+text items stagger
    ────────────────────────────────────────────── */
    var benefitItems = gsap.utils.toArray('.benefits-icon-wtext');
    if (benefitItems.length) {
      gsap.from(benefitItems, {
        autoAlpha: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: benefitItems[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    }

    /* ──────────────────────────────────────────────
       10. AWARDS SECTION — items stagger
    ────────────────────────────────────────────── */
    var awardItems = gsap.utils.toArray('.awards-item');
    if (awardItems.length) {
      gsap.from(awardItems, {
        autoAlpha: 0, y: 30, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: {
          trigger: awardItems[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    }

    /* ──────────────────────────────────────────────
       11. CASE STUDY / RESULTS SECTION
    ────────────────────────────────────────────── */
    var csContent = document.querySelector('.cs-item-content');
    if (csContent) {
      gsap.from(csContent, {
        autoAlpha: 0, y: 40, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: csContent,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });
    }

    var csImage = document.querySelector('.cs-image');
    if (csImage) {
      gsap.from(csImage, {
        autoAlpha: 0, scale: 0.96, duration: 0.9, ease: 'power2.out',
        scrollTrigger: {
          trigger: csImage,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });
    }

    var statsGrid = document.querySelector('.project-stats.grid');
    if (statsGrid) {
      var statItems = gsap.utils.toArray(statsGrid.querySelectorAll('.project-stats-item'));
      gsap.from(statItems, {
        autoAlpha: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: statsGrid,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    }

    /* ──────────────────────────────────────────────
       12. DISPLAY-XL (results marquee) — subtle reveal
    ────────────────────────────────────────────── */
    var firstDisplayXL = document.querySelector('.display-xl');
    if (firstDisplayXL) {
      gsap.from(document.querySelectorAll('.display-xl'), {
        autoAlpha: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: {
          trigger: firstDisplayXL,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    }

    /* ──────────────────────────────────────────────
       13. FOOTER
           .footergrid columns stagger in
           .footer-logo-big .logo-letter fan in
           .sociallink hover slide
           .legal-wrapper fade in
    ────────────────────────────────────────────── */
    var footerSection = document.querySelector('.footersection');
    if (footerSection) {

      // Footer grid columns stagger
      var footerCols = footerSection.querySelectorAll('.footer-column');
      if (footerCols.length) {
        gsap.from(footerCols, {
          autoAlpha: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerSection.querySelector('.footergrid') || footerSection,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Footer MAGNET logo letters fan in — scoped so hero letters aren't affected
      var footerLogoLetters = footerSection.querySelectorAll('.footer-logo-big .logo-letter');
      if (footerLogoLetters.length) {
        gsap.from(footerLogoLetters, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerSection.querySelector('.footer-logo-big'),
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Social links — icon nudges up on hover
      footerSection.querySelectorAll('.sociallink').forEach(function (link) {
        var icon = link.querySelector('img');
        if (!icon) return;
        link.addEventListener('mouseenter', function () {
          gsap.to(icon, { y: -4, duration: 0.2, ease: 'power2.out' });
        });
        link.addEventListener('mouseleave', function () {
          gsap.to(icon, { y: 0, duration: 0.25, ease: 'power2.out' });
        });
      });

      // Legal wrapper fade in
      var legalWrapper = footerSection.querySelector('.legal-wrapper');
      if (legalWrapper) {
        gsap.from(legalWrapper, {
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: legalWrapper,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        });
      }
    }

    /* ══════════════════════════════════════════════
       ABOUT PAGE SECTIONS
       These only run if the relevant elements exist,
       so the script is safe to load on every page.
    ══════════════════════════════════════════════ */

    /* ──────────────────────────────────────────────
       A1. OUR APPROACH SECTION
           .approach-section  wrapper
           .approach-header   heading
           .approach-body     paragraph + link
           .approach-step     3 process columns
           .approach-deco     floating illustration
    ────────────────────────────────────────────── */
    var approachSection = document.querySelector('.approach-section, .approach');
    if (approachSection) {

      // Heading slides up
      gsap.from('.approach-header', {
        autoAlpha: 0, y: 32, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.approach-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Body + link
      gsap.from('.approach-body', {
        autoAlpha: 0, y: 24, duration: 0.7, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.approach-body',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Steps stagger in
      var approachSteps = gsap.utils.toArray('.approach-step');
      if (approachSteps.length) {
        gsap.from(approachSteps, {
          autoAlpha: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: {
            trigger: approachSteps[0],
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Decorative illustration — infinite float
      var approachDeco = document.querySelector('.approach-deco');
      if (approachDeco) {
        gsap.to(approachDeco, {
          y: -12, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1,
        });
      }
    }

    /* ──────────────────────────────────────────────
       A2. ABOUT STATS SECTION
           .about-stats        wrapper
           .about-photo        full-width team photo
           .about-stats-header heading row
           .about-quote        italic quote
           .about-stat-card    3 stat cards
    ────────────────────────────────────────────── */
    var aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {

      // Team photo parallax
      var aboutPhoto = aboutStats.querySelector('.about-photo');
      if (aboutPhoto) {
        gsap.to(aboutPhoto, {
          y: -40, ease: 'none',
          scrollTrigger: {
            trigger: aboutPhoto,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Heading row
      gsap.from('.about-stats-header', {
        autoAlpha: 0, y: 32, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-stats-header',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });

      // Italic quote
      gsap.from('.about-quote', {
        autoAlpha: 0, y: 24, duration: 0.7, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-quote',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });

      // Stat cards stagger
      var statCards = gsap.utils.toArray('.about-stat-card');
      if (statCards.length) {
        gsap.from(statCards, {
          autoAlpha: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-stats-grid',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }

    /* ══════════════════════════════════════════════
       WORK PAGE SECTIONS
       Only run when .works-section exists (work page).
    ══════════════════════════════════════════════ */

    /* ──────────────────────────────────────────────
       W1. WORK PAGE — heading + filter pills + cards
           .works-section    wrapper
           .works-heading    h2
           .works-filters    pills container
           .work-filter-pill individual filter pills
           .works-grid       3-col masonry grid
           .work-card        individual project card
           .work-card-image  image wrapper inside card
           .work-card-overlay hover overlay
    ────────────────────────────────────────────── */
    var worksSection = document.querySelector('.works-section');
    if (worksSection) {

      // Hide overlays immediately — visible only on hover
      gsap.set('.work-card-overlay', { autoAlpha: 0 });

      // Heading reveal on scroll
      var worksHeading = worksSection.querySelector('.works-heading');
      if (worksHeading) {
        gsap.from(worksHeading, {
          autoAlpha: 0, y: 24, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: worksHeading,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Re-animate after each Finsweet filter change using MutationObserver
      var listWrapper = worksSection.querySelector('[fs-list-element="list"]') ||
                        worksSection.querySelector('.works-grid');
      var observer = null;

      // Animate a set of cards — disconnects observer first so GSAP's inline
      // style changes don't re-trigger the observer (infinite loop fix)
      function animateCards(cards) {
        if (!cards || !cards.length) return;
        if (observer) observer.disconnect();
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: 'power2.out',
            onComplete: function () {
              gsap.set(cards, { clearProps: 'opacity,y' });
              // Reconnect after GSAP has cleared all inline styles
              if (observer && listWrapper) {
                observer.observe(listWrapper, { subtree: false, attributes: true, attributeFilter: ['style'] });
              }
            }
          }
        );
      }

      // Initial page-load card reveal
      var workPageCards = gsap.utils.toArray('.work-card');
      animateCards(workPageCards);

      // Wire up observer after initial animation
      if (listWrapper) {
        var filterTimer = null;
        observer = new MutationObserver(function () {
          clearTimeout(filterTimer);
          filterTimer = setTimeout(function () {
            var nowVisible = [...listWrapper.querySelectorAll('.work-card')].filter(function (c) {
              return getComputedStyle(c).display !== 'none';
            });
            animateCards(nowVisible);
          }, 50);
        });
        // Observer is connected inside animateCards' onComplete — starts after initial reveal
      }

      // Active pill state — mirrors the Next.js active filter style
      // Adds/removes .is-active on the label when a radio is selected
      var filterForm = worksSection.querySelector('[fs-list-element="filters"]');
      if (filterForm) {
        var allPills   = filterForm.querySelectorAll('.work-filter-pill');
        var clearBtn   = worksSection.querySelector('[fs-list-element="clear"]');

        // Set active class on a pill, remove from all others
        function setActivePill(activePill) {
          allPills.forEach(function (p) { p.classList.remove('is-active'); });
          if (clearBtn) clearBtn.classList.remove('is-active');
          if (activePill) activePill.classList.add('is-active');
        }

        // Listen for radio changes inside the form
        filterForm.addEventListener('change', function (e) {
          if (e.target.type !== 'radio') return;
          var label = e.target.closest('.work-filter-pill');
          setActivePill(label);
        });

        // Clear / All button resets active state back to clear button
        if (clearBtn) {
          clearBtn.addEventListener('click', function () {
            setActivePill(null);
            clearBtn.classList.add('is-active');
          });

          // On load: clear is-active from all pills first (Webflow Designer leaves combo classes on elements)
          // then mark only the clear/All button as active
          allPills.forEach(function (p) { p.classList.remove('is-active'); });
          clearBtn.classList.add('is-active');
        }
      }

      // Hover: image scale + overlay reveal per card
      workPageCards.forEach(function (card) {
        var img     = card.querySelector('.work-card-image');
        var overlay = card.querySelector('.work-card-overlay');

        card.addEventListener('mouseenter', function () {
          if (img)     gsap.to(img,     { scale: 1.05, duration: 0.4, ease: 'power2.out' });
          if (overlay) gsap.to(overlay, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', function () {
          if (img)     gsap.to(img,     { scale: 1,    duration: 0.4, ease: 'power2.out' });
          if (overlay) gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' });
        });
      });
    }

    /* ──────────────────────────────────────────────
       B2. DESIGN SHIFT BLOG PAGE
           .blog-header          header row (logo + desc)
           .blog-header-logo     logo — slides from left
           .blog-header-desc     description — slides from right
           .blog-featured        featured post wrapper
           .blog-featured-image  featured image — scale in
           .blog-featured-card   overlay card — slides up
           .blog-grid            card grid wrapper
           .blog-card            each card — stagger up
           .blog-card-image      image wrapper inside card (hover scale)
    ────────────────────────────────────────────── */
    var blogSection = document.querySelector('.blog-section');
    if (blogSection) {

      // Header: logo from left, desc from right
      var blogLogo = blogSection.querySelector('.blog-header-logo');
      var blogDesc = blogSection.querySelector('.blog-header-desc');
      var headerAnchor = blogLogo || blogSection;
      if (blogLogo) {
        gsap.from(blogLogo, {
          x: -40, autoAlpha: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerAnchor, start: 'top 82%', toggleActions: 'play none none reverse' },
        });
      }
      if (blogDesc) {
        gsap.from(blogDesc, {
          x: 40, autoAlpha: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerAnchor, start: 'top 82%', toggleActions: 'play none none reverse' },
        });
      }

      // Featured post: image scales in, card slides up
      var blogFeatured = document.querySelector('.blog-featured');
      if (blogFeatured) {
        var featImg  = blogFeatured.querySelector('.blog-featured-image');
        var featCard = blogFeatured.querySelector('.blog-featured-card');
        if (featImg) {
          gsap.from(featImg, {
            scale: 1.04, autoAlpha: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: blogFeatured, start: 'top 85%', toggleActions: 'play none none reverse' },
          });
        }
        if (featCard) {
          gsap.from(featCard, {
            y: 32, autoAlpha: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: blogFeatured, start: 'top 80%', toggleActions: 'play none none reverse' },
          });
        }
      }

      // Card grid: stagger up
      var blogCards = gsap.utils.toArray('.blog-card');
      if (blogCards.length) {
        var blogGrid = document.querySelector('.blog-grid');
        gsap.from(blogCards, {
          y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: {
            trigger: blogGrid || blogCards[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        // Card hover: image scale
        blogCards.forEach(function (card) {
          var img = card.querySelector('.blog-card-image');
          if (!img) return;
          card.addEventListener('mouseenter', function () {
            gsap.to(img, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
          });
          card.addEventListener('mouseleave', function () {
            gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' });
          });
        });
      }
    }

    /* ──────────────────────────────────────────────
       B3. BLOG POST PAGE
           .post-hero            page identifier + hero wrapper
           .post-hero-image      hero image  (scale+fade on load)
           .post-hero-card       overlay title card (slide up on load)
           .post-quote           quote block (fade+slide up)
           .post-body            rich text blocks (fade+slide up)
           .post-subscribe       newsletter form (fade+slide up)
           .post-callout         conclusion block (fade+slide up)
           .post-share           share row (fade+slide up)
           .post-related-heading "Related articles" heading
           .post-related-grid    related cards wrapper
           .post-related-card    each related card (stagger up)
           .post-related-image   image inside card (hover scale)
    ────────────────────────────────────────────── */
    var postHero = document.querySelector('.post-hero');
    if (postHero) {

      // Hero image — scale + fade on load
      var postHeroImg = postHero.querySelector('.post-hero-image');
      if (postHeroImg) {
        gsap.from(postHeroImg, {
          scale: 1.04, autoAlpha: 0, duration: 1.2, ease: 'power3.out',
          clearProps: 'opacity,scale',
        });
      }

      // Hero card — slide up on load
      var postHeroCard = postHero.querySelector('.post-hero-card');
      if (postHeroCard) {
        gsap.from(postHeroCard, {
          y: 32, autoAlpha: 0, duration: 0.8, delay: 0.3, ease: 'power2.out',
          clearProps: 'opacity,y',
        });
      }

      // Quote block
      var postQuote = document.querySelector('.post-quote');
      if (postQuote) {
        gsap.from(postQuote, {
          y: 32, autoAlpha: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: postQuote, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }

      // Body blocks stagger
      var postBodies = gsap.utils.toArray('.post-body');
      if (postBodies.length) {
        postBodies.forEach(function (block) {
          gsap.from(block, {
            y: 24, autoAlpha: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: block, start: 'top 85%', toggleActions: 'play none none reverse' },
          });
        });
      }

      // Subscribe block
      var postSubscribe = document.querySelector('.post-subscribe');
      if (postSubscribe) {
        gsap.from(postSubscribe, {
          y: 24, autoAlpha: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: postSubscribe, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }

      // Callout / conclusion
      var postCallout = document.querySelector('.post-callout');
      if (postCallout) {
        gsap.from(postCallout, {
          y: 24, autoAlpha: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: postCallout, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }

      // Share row
      var postShare = document.querySelector('.post-share');
      if (postShare) {
        gsap.from(postShare, {
          y: 24, autoAlpha: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: postShare, start: 'top 88%', toggleActions: 'play none none reverse' },
        });
      }

      // Related heading
      var postRelatedHeading = document.querySelector('.post-related-heading');
      if (postRelatedHeading) {
        gsap.from(postRelatedHeading, {
          y: 24, autoAlpha: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: postRelatedHeading, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }

      // Related cards stagger + hover
      var postRelatedCards = gsap.utils.toArray('.post-related-card');
      if (postRelatedCards.length) {
        var postRelatedGrid = document.querySelector('.post-related-grid');
        gsap.from(postRelatedCards, {
          y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: {
            trigger: postRelatedGrid || postRelatedCards[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        postRelatedCards.forEach(function (card) {
          var img = card.querySelector('.post-related-image');
          if (!img) return;
          card.addEventListener('mouseenter', function () {
            gsap.to(img, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
          });
          card.addEventListener('mouseleave', function () {
            gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' });
          });
        });
      }
    }

    /* ──────────────────────────────────────────────
       W2. WORK ITEM PAGE — hero, overview, gallery, related
           .project-hero            full-width hero section
           .project-hero-image      image wrapper (fade+scale in)
           .project-overview-left   left col  (slide from left)
           .project-overview-right  right col (slide from right)
           .project-gallery-block   each gallery image (fade+slide up)
           .related-heading         "Related Projects" heading
           .related-card            each related card
           .related-card-image      image wrapper inside card
           .related-card-overlay    hover overlay
    ────────────────────────────────────────────── */
    var projectHero = document.querySelector('.project-hero');
    if (projectHero) {

      // Hero image — fade + scale in on load
      var heroImg = projectHero.querySelector('.project-hero-image');
      if (heroImg) {
        gsap.from(heroImg, {
          opacity: 0,
          scale: 1.04,
          duration: 1.2,
          ease: 'power3.out',
          clearProps: 'opacity,scale',
        });
      }

      // Overview columns slide in from opposite sides
      var overviewLeft  = document.querySelector('.project-overview-left');
      var overviewRight = document.querySelector('.project-overview-right');
      if (overviewLeft) {
        gsap.from(overviewLeft, {
          x: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: overviewLeft, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
      }
      if (overviewRight) {
        gsap.from(overviewRight, {
          x: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: overviewRight, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
      }

      // Gallery blocks fade + slide up on scroll
      gsap.utils.toArray('.project-gallery-block').forEach(function (el) {
        gsap.from(el, {
          opacity: 0, y: 48, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });

      // Related section heading
      var relatedHeading = document.querySelector('.related-heading');
      if (relatedHeading) {
        gsap.from(relatedHeading, {
          opacity: 0, y: 24, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: relatedHeading, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }

      // Related cards stagger in
      var relatedCards = gsap.utils.toArray('.related-card');
      if (relatedCards.length) {
        gsap.from(relatedCards, {
          opacity: 0, y: 40, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: '.related-grid', start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }

      // Hide related overlays — visible only on hover
      gsap.set('.related-card-overlay', { autoAlpha: 0 });

      // Related card hover
      relatedCards.forEach(function (card) {
        var img     = card.querySelector('.related-card-image');
        var overlay = card.querySelector('.related-card-overlay');
        card.addEventListener('mouseenter', function () {
          if (img)     gsap.to(img,     { scale: 1.05, duration: 0.4, ease: 'power2.out' });
          if (overlay) gsap.to(overlay, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', function () {
          if (img)     gsap.to(img,     { scale: 1,    duration: 0.4, ease: 'power2.out' });
          if (overlay) gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' });
        });
      });
    }

    /* ──────────────────────────────────────────────
       14. SCROLL-UP NAV — hide on scroll-down, show on scroll-up
           On pages with no hero (work page + work item page)
           the nav is always visible and no scroll listener needed.
    ────────────────────────────────────────────── */
    var wNav = document.querySelector('.w-nav');
    if (wNav) {
      // Force display:block even if Webflow set display:none (with or without !important)
      // and ensure fixed positioning matches the Next.js sticky nav.
      wNav.style.setProperty('display',   'block',  'important');
      wNav.style.setProperty('position',  'fixed',  'important');
      wNav.style.setProperty('top',       '0',      'important');
      wNav.style.setProperty('left',      '0',      'important');
      wNav.style.setProperty('right',     '0',      'important');

      // Work page + work-item page have no scroll-hide hero — nav always visible
      if (worksSection || projectHero || blogSection || postHero) {
        gsap.set(wNav, { yPercent: 0 });
        // No scroll listener needed — nav stays put
      } else {
        // All other pages: start hidden above viewport, reveal on scroll-up
        gsap.set(wNav, { yPercent: -110 });
        var navHidden = true;

        lenis.on('scroll', function (e) {
          var y         = e.scroll;
          var goingDown = e.direction === 1;

          if (y < 80) {
            // Near top — keep hidden (hero nav is visible)
            if (!navHidden) {
              gsap.to(wNav, { yPercent: -110, duration: 0.35, ease: 'power3.in', overwrite: 'auto' });
              navHidden = true;
            }
          } else if (!goingDown && navHidden) {
            // Scrolling up — slide in
            gsap.to(wNav, { yPercent: 0, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
            navHidden = false;
          } else if (goingDown && !navHidden) {
            // Scrolling down — slide out
            gsap.to(wNav, { yPercent: -110, duration: 0.35, ease: 'power3.in', overwrite: 'auto' });
            navHidden = true;
          }
        });
      }
    }

  } // end init()

  /* ── Load chain: GSAP → ScrollTrigger → Lenis → init ── */
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js')
    .then(function () {
      return loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');
    })
    .then(function () {
      return loadScript('https://cdn.jsdelivr.net/npm/lenis@1.3.23/dist/lenis.min.js');
    })
    .then(function () {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    });

})();

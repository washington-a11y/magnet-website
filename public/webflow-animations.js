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

      // Scale needed to cover the full viewport
      var scaleNeeded = Math.max(vw / r.width, vh / r.height);

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

    if (workSection && workCards.length) {
      // Hide cards initially — will be revealed by pinned timeline
      gsap.set(workCards, { autoAlpha: 0 });

      // Pinned timeline: slogan fades out → cards appear one by one
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

      // Slogan fades out first
      workTl.to('.slogan', {
        autoAlpha: 0,
        y: -40,
        duration: 1,
        ease: 'power2.in',
      });

      // Cards reveal one by one
      workCards.forEach(function (card) {
        workTl.to(card, { autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, '>');
      });

      // Alternating parallax on cards
      workCards.forEach(function (card, i) {
        gsap.to(card, {
          y: i % 2 === 0 ? -50 : 50,
          ease: 'none',
          scrollTrigger: {
            trigger: workSection,
            start: 'top bottom',
            end: '+=2400',
            scrub: 1.5,
          },
        });
      });
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

    /* ──────────────────────────────────────────────
       14. SCROLL-UP NAV — hide on scroll-down, show on scroll-up
    ────────────────────────────────────────────── */
    var wNav = document.querySelector('.w-nav');
    if (wNav) {
      var navHidden = false;
      // Only reveal the sticky nav once the user has scrolled past the hero section
      var heroEl     = document.querySelector('.herosection');
      var heroBottom = heroEl ? heroEl.offsetTop + heroEl.offsetHeight : window.innerHeight;

      // Use Lenis scroll event — gives us e.direction (1=down, -1=up) and e.scroll
      lenis.on('scroll', function (e) {
        var y         = e.scroll;
        var goingDown = e.direction === 1;

        if (y < heroBottom) {
          // Still inside the hero — hide the sticky nav
          if (navHidden) {
            gsap.to(wNav, { y: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
            navHidden = false;
          }
          // Force hidden while in hero (nav is part of the hero itself)
          gsap.set(wNav, { y: -(wNav.offsetHeight + 4) });
          navHidden = true;
        } else if (goingDown && !navHidden) {
          // Past hero, scrolling down → slide nav out
          gsap.to(wNav, { y: -(wNav.offsetHeight + 4), duration: 0.28, ease: 'power2.in', overwrite: 'auto' });
          navHidden = true;
        } else if (!goingDown && navHidden) {
          // Past hero, scrolling up → slide nav in
          gsap.to(wNav, { y: 0, duration: 0.38, ease: 'power2.out', overwrite: 'auto' });
          navHidden = false;
        }
      });
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

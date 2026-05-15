/* ============================================================
   MAGNET STUDIO — Webflow GSAP Animations  v4
   Targets: All Magnet pages
   Dependencies: GSAP 3.12.5, ScrollTrigger, Lenis 1.3.23

   v4 changes
   ──────────
   • Added splitWords() + animateHeading() utilities (word-split
     clip-emerge, same as Next.js HeadingAnimator)
   • Global .animated-header scanner — any element with that class
     gets the clip-emerge animation; per-element overrides via
     data-animate-start / data-animate-stagger / data-animate-duration
   • Removed redundant plain opacity/y reveals for headings that now
     use .animated-header (CTA, partner headline, section 8 fallback)
   • Section 8 fallback still runs for .new-header / .header-sized
     elements that do NOT carry .animated-header
   ============================================================ */
(function () {
  'use strict';

  /* ── Script loader ── */
  function loadScript(src) {
    return new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = resolve;
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
       UTILITIES — word-split clip-emerge
    ────────────────────────────────────────────── */

    /**
     * splitWords — wraps each word in an overflow:hidden clip container.
     * Returns a cleanup fn that restores the original innerHTML.
     */
    function splitWords(el) {
      var original = el.innerHTML;
      var text = el.textContent || '';
      el.innerHTML = text.split(' ').map(function (word) {
        return (
          '<span style="display:inline-block;overflow:hidden;vertical-align:bottom;line-height:inherit">' +
          '<span class="split-word" style="display:inline-block">' + word + '</span>' +
          '</span>'
        );
      }).join(' ');
      return function () { el.innerHTML = original; };
    }

    /**
     * animateHeading — splits heading into words and scroll-triggers
     * a staggered clip-emerge animation.
     *
     * Per-element data-attribute overrides (set in Webflow Designer):
     *   data-animate-start      e.g. "top 80%"   (default "top 88%")
     *   data-animate-stagger    e.g. "0.1"        (default 0.07)
     *   data-animate-duration   e.g. "0.9"        (default 0.75)
     *   data-animate-delay      e.g. "0.2"        (default 0)
     */
    function animateHeading(el, opts) {
      opts = opts || {};
      var start    = opts.start    || el.dataset.animateStart    || 'top 88%';
      var duration = opts.duration !== undefined ? opts.duration : (el.dataset.animateDuration ? parseFloat(el.dataset.animateDuration) : 0.75);
      var stagger  = opts.stagger  !== undefined ? opts.stagger  : (el.dataset.animateStagger  ? parseFloat(el.dataset.animateStagger)  : 0.07);
      var delay    = opts.delay    !== undefined ? opts.delay    : (el.dataset.animateDelay    ? parseFloat(el.dataset.animateDelay)    : 0);
      var ease     = opts.ease     || 'power4.out';

      var restore = splitWords(el);
      var words   = el.querySelectorAll('.split-word');
      gsap.set(words, { y: '110%' });

      var st = ScrollTrigger.create({
        trigger: el,
        start: start,
        onEnter: function () {
          gsap.to(words, {
            y: '0%', duration: duration, stagger: stagger,
            delay: delay, ease: ease, overwrite: 'auto',
          });
        },
        onLeaveBack: function () {
          gsap.to(words, {
            y: '110%', duration: duration * 0.6, stagger: stagger * 0.5,
            ease: 'power3.in', overwrite: 'auto',
          });
        },
      });

      return function () { st.kill(); restore(); };
    }

    /* ──────────────────────────────────────────────
       1. LENIS SMOOTH SCROLL
    ────────────────────────────────────────────── */
    var lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      wrapper: window,
      content: document.documentElement,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.addEventListener('refresh', function () { lenis.resize(); });

    window.addEventListener('load', function () {
      lenis.resize();
      ScrollTrigger.refresh();
    });

    window.addEventListener('resize', function () {
      clearTimeout(window._lenisResizeTimer);
      window._lenisResizeTimer = setTimeout(function () {
        lenis.resize();
        ScrollTrigger.refresh();
      }, 200);
    });

    setTimeout(function () { lenis.resize(); ScrollTrigger.refresh(); }, 1000);
    setTimeout(function () { lenis.resize(); ScrollTrigger.refresh(); }, 3000);

    if (typeof ResizeObserver !== 'undefined') {
      var _lenisPrevHeight = document.body.scrollHeight;
      var _lenisRO = new ResizeObserver(function () {
        var newHeight = document.body.scrollHeight;
        if (newHeight !== _lenisPrevHeight) {
          _lenisPrevHeight = newHeight;
          lenis.resize();
          ScrollTrigger.refresh();
        }
      });
      _lenisRO.observe(document.body);
    }

    /* ──────────────────────────────────────────────
       2. HERO REVEAL
          Webflow classes: .herosection, .menu-item,
          .logo-letter, .new-header (H1), .video-promo
    ────────────────────────────────────────────── */
    var heroSection = document.querySelector('.herosection');
    if (heroSection) {
      var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      var menuItems = heroSection.querySelectorAll('.menu-item');
      if (menuItems.length) {
        tl.from(menuItems, { y: -20, opacity: 0, duration: 0.6, stagger: 0.08 });
      }

      var logoLetters = heroSection.querySelectorAll('.logo-letter');
      if (logoLetters.length) {
        tl.from(logoLetters, { y: 40, opacity: 0, duration: 0.8, stagger: 0.06 }, '-=0.3');
      }

      // Hero H1 — clip-emerge word by word (same as animated-header, runs on load not scroll)
      var heroHeadings = heroSection.querySelectorAll('.new-header');
      if (heroHeadings.length) {
        heroHeadings.forEach(function (h) {
          var restore = splitWords(h);
          var words   = h.querySelectorAll('.split-word');
          gsap.set(words, { y: '110%' });
          tl.to(words, {
            y: '0%', duration: 0.75, stagger: 0.07, ease: 'power4.out',
          }, '-=0.4');
          // No cleanup needed — hero persists for life of the page
          void restore; // keep reference to avoid lint warning
        });
      }

      var heroVideo = heroSection.querySelector('.video-promo');
      if (heroVideo) {
        tl.from(heroVideo, { scale: 0.9, opacity: 0, duration: 0.9 }, '-=0.6');
      }
    }

    /* ──────────────────────────────────────────────
       2b. NAV LINK HOVER — sliding underline
    ────────────────────────────────────────────── */
    document.querySelectorAll('.menu-item').forEach(function (link) {
      link.style.position = 'relative';

      var line = document.createElement('span');
      line.style.cssText = [
        'position:absolute',
        'bottom:-2px',
        'left:0',
        'width:100%',
        'height:1px',
        'background:currentColor',
        'display:block',
        'pointer-events:none',
      ].join(';');
      gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
      link.appendChild(line);

      link.addEventListener('mouseenter', function () {
        gsap.to(line, { scaleX: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
      });
      link.addEventListener('mouseleave', function () {
        gsap.to(line, {
          scaleX: 0, duration: 0.25, ease: 'power2.in',
          transformOrigin: 'right center', overwrite: 'auto',
          onComplete: function () { gsap.set(line, { transformOrigin: 'left center' }); },
        });
      });
    });

    /* ──────────────────────────────────────────────
       3. HERO VIDEO SCROLL EXPAND
    ────────────────────────────────────────────── */
    var videoExpand = heroSection ? heroSection.querySelector('.video-promo') : null;
    if (videoExpand) {
      var vw = window.innerWidth;
      var vh = window.innerHeight;
      var r  = videoExpand.getBoundingClientRect();
      var scaleNeeded = vw / r.width;
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

      if (fadeable.length) {
        heroScrollTl.to(fadeable, { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, 0);
      }

      heroScrollTl.to(videoExpand, {
        scale: scaleNeeded, x: tx, y: ty, borderRadius: 0,
        duration: 1, ease: 'power2.inOut',
      }, 0);
    }

    /* ──────────────────────────────────────────────
       4. FLAG WAVE
    ────────────────────────────────────────────── */
    var heroFlag = document.querySelector('.canada');
    if (heroFlag) {
      gsap.to(heroFlag, {
        skewX: 7, scaleX: 0.94, duration: 0.9, ease: 'sine.inOut',
        yoyo: true, repeat: -1, transformOrigin: 'left center',
      });
      gsap.to(heroFlag, {
        rotation: 2.5, duration: 1.4, ease: 'sine.inOut',
        yoyo: true, repeat: -1, transformOrigin: 'left center', delay: 0.2,
      });
    }

    /* ──────────────────────────────────────────────
       5. MARQUEES
    ────────────────────────────────────────────── */
    var cssOverride = document.createElement('style');
    cssOverride.textContent = '.marquee-text { animation: none !important; transform: none; } .marquee-left { animation: none !important; }';
    document.head.appendChild(cssOverride);

    document.querySelectorAll('.marquee').forEach(function (wrap, wrapIndex) {
      if (wrap.classList.contains('marquee-left')) return;
      var track = wrap.querySelector('.marquee-text');
      if (!track) return;
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

    var partnerTrack = document.querySelector('.marquee-left');
    if (partnerTrack) {
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
       6. WORK SECTION — pinned scroll reveal + 3D card flip
    ────────────────────────────────────────────── */
    var workSection = document.querySelector('.worksection');
    var workCards   = gsap.utils.toArray('.project-item');
    var isMobile    = window.innerWidth < 768;

    if (workSection && workCards.length) {
      if (isMobile) {
        gsap.set('.slogan', { autoAlpha: 0, y: 20 });
        gsap.to('.slogan', {
          autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: workSection, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
        workCards.forEach(function (card, i) {
          var img = card.querySelector('.project-img');
          gsap.fromTo(card,
            { autoAlpha: 0, y: i % 2 === 0 ? -50 : 50 },
            {
              autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
            }
          );
          if (img) {
            gsap.fromTo(img, { y: 30 }, {
              y: -30, ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
            });
          }
        });
      } else {
        gsap.set(workCards, { autoAlpha: 0 });
        gsap.set('.slogan', { autoAlpha: 0, y: 30 });

        var workTl = gsap.timeline({
          scrollTrigger: {
            trigger: workSection, start: 'top top', end: '+=2400',
            pin: true, scrub: 1.2, anticipatePin: 1,
          },
        });

        workTl.to('.slogan', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' });
        workTl.to('.slogan', { autoAlpha: 0, y: -40, duration: 1, ease: 'power2.in' });

        workCards.forEach(function (card, i) {
          var img    = card.querySelector('.project-img');
          var startY = i % 2 === 0 ? -60 : 60;
          gsap.set(card, { y: startY });
          workTl.to(card, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '>');
          if (img) {
            gsap.set(img, { y: 25 });
            workTl.to(img, { y: -25, ease: 'none', duration: 1.5 }, '<');
          }
        });
      }
    }

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
       7. WHAT WE DO SECTION
    ────────────────────────────────────────────── */
    var whatWeDoTitle = document.querySelector('.services-header');
    if (whatWeDoTitle) {
      gsap.from(whatWeDoTitle, {
        clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'power3.inOut',
        scrollTrigger: { trigger: whatWeDoTitle, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    }

    gsap.utils.toArray('.services-item').forEach(function (row, i) {
      gsap.from(row, {
        opacity: 0, y: 50, duration: 0.8, ease: 'power2.out', delay: i * 0.1,
        scrollTrigger: { trigger: row, start: 'top 80%', toggleActions: 'play none none reverse' },
      });

      var img = row.querySelector('.servicelist-item_image');
      if (img) {
        gsap.to(img, {
          y: -30, ease: 'none',
          scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        });
      }
    });

    /* ──────────────────────────────────────────────
       8. CTA SECTION
          The headline should carry .animated-header in Webflow —
          the global scanner (section 10) handles the word-split
          animation automatically.  We only wire up the button + decos here.
    ────────────────────────────────────────────── */
    var ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
      var ctaBtn = ctaSection.querySelector('.cta-button');

      if (ctaBtn) {
        gsap.from(ctaBtn, {
          opacity: 0, scale: 0.8, duration: 0.6, ease: 'back.out(1.7)', delay: 0.4,
          scrollTrigger: { trigger: ctaSection, start: 'top 75%', toggleActions: 'play none none reverse' },
        });

        ctaBtn.addEventListener('mouseenter', function () { gsap.to(ctaBtn, { scale: 1.04, duration: 0.2 }); });
        ctaBtn.addEventListener('mouseleave', function () { gsap.to(ctaBtn, { scale: 1,    duration: 0.2 }); });
      }

      gsap.utils.toArray('.cta-deco').forEach(function (el, i) {
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10, rotate: i % 2 === 0 ? 3 : -3,
          duration: 2.5 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1,
        });
      });
    }

    /* ──────────────────────────────────────────────
       9. CLIENTS / PARTNER SECTION
          Partner headline should carry .animated-header in Webflow.
          Stats counter + star + body copy handled here.
    ────────────────────────────────────────────── */
    var partnerContent = document.querySelector('.partner-content');
    if (partnerContent) {

      var starEl = partnerContent.querySelector('.star');
      if (starEl) {
        gsap.from(starEl, {
          autoAlpha: 0, rotate: -45, scale: 0.6, duration: 0.8, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: partnerContent, start: 'top 80%', toggleActions: 'play none none none' },
        });
        gsap.to(starEl, {
          rotation: 20, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1,
          transformOrigin: 'center center',
        });
        gsap.to(starEl, {
          scale: 1.12, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1,
          delay: 0.4, transformOrigin: 'center center',
        });
      }

      var partnerP = partnerContent.querySelector('.partner-p');
      if (partnerP) {
        gsap.from(partnerP, {
          autoAlpha: 0, y: 24, duration: 0.7, ease: 'power2.out', delay: 0.15,
          scrollTrigger: { trigger: partnerContent, start: 'top 80%', toggleActions: 'play none none none' },
        });
      }

      var statsNums = partnerContent.querySelectorAll('.stats-number');
      if (statsNums.length) {
        gsap.from(statsNums, {
          autoAlpha: 0, y: 30, duration: 0.6, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: {
            trigger: partnerContent.querySelector('.stats-wrapper') || partnerContent,
            start: 'top 85%', toggleActions: 'play none none none',
          },
        });

        statsNums.forEach(function (el) {
          var original = el.textContent.trim();
          var finalNum = parseFloat(original.replace(/[^0-9.]/g, ''));
          var suffix   = original.replace(/^[\d.]+/, '');
          if (!finalNum) return;
          gsap.fromTo(el, { textContent: '0' + suffix }, {
            duration: 1.8, ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(finalNum * this.progress()) + suffix;
            },
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          });
        });
      }
    }

    /* ──────────────────────────────────────────────
       10. GLOBAL .animated-header — word-split clip-emerge
           Add this class to any heading in the Webflow Designer.
           Optional data attributes for per-element tuning:
             data-animate-start      (default "top 88%")
             data-animate-stagger    (default 0.07)
             data-animate-duration   (default 0.75)
             data-animate-delay      (default 0)
    ────────────────────────────────────────────── */
    document.querySelectorAll('.animated-header').forEach(function (el) {
      // Skip hero headings — they are handled by the hero timeline (section 2)
      if (el.closest('.herosection')) return;
      animateHeading(el);
    });

    /* ──────────────────────────────────────────────
       11. SECTION HEADING REVEALS (fallback)
           Runs only on .new-header / .header-sized / .caption-header
           that do NOT carry .animated-header, so there's no double-animation.
    ────────────────────────────────────────────── */
    gsap.utils.toArray('.new-header, .header-sized, .caption-header').forEach(function (el) {
      if (el.closest('.herosection')) return;   // hero headings handled above
      if (el.closest('.cta-section')) return;   // cta uses animated-header
      if (el.classList.contains('animated-header')) return; // already handled
      gsap.from(el, {
        autoAlpha: 0, y: 32, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
      });
    });

    /* ──────────────────────────────────────────────
       12. BLOG SECTION — "What's new"
    ────────────────────────────────────────────── */
    var blogItems = gsap.utils.toArray('.blog-item');
    if (blogItems.length) {
      gsap.from(blogItems, {
        autoAlpha: 0, y: 40, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: blogItems[0], start: 'top 85%', toggleActions: 'play none none none' },
      });

      blogItems.forEach(function (card) {
        var img = card.querySelector('.blogitem-img');
        if (!img) return;
        card.addEventListener('mouseenter', function () { gsap.to(img, { scale: 1.05, duration: 0.4, ease: 'power2.out' }); });
        card.addEventListener('mouseleave', function () { gsap.to(img, { scale: 1,    duration: 0.4, ease: 'power2.out' }); });
      });
    }

    /* ──────────────────────────────────────────────
       13. STAT COUNTERS
    ────────────────────────────────────────────── */
    function animateCounter(el) {
      var original = el.textContent.trim();
      var finalNum = parseFloat(original.replace(/[^0-9.]/g, ''));
      var suffix   = original.replace(/[0-9.]/g, '');
      if (!finalNum) return;

      gsap.fromTo(el, { textContent: '0' }, {
        textContent: finalNum, duration: 1.8, ease: 'power2.out',
        snap: { textContent: finalNum % 1 === 0 ? 1 : 0.1 },
        onUpdate: function () {
          var v = parseFloat(this.targets()[0].textContent || '0');
          el.textContent = (finalNum % 1 === 0 ? Math.round(v) : v.toFixed(1)) + suffix;
        },
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }

    gsap.utils.toArray('.project-stats-item-title').forEach(animateCounter);

    document.querySelectorAll('div').forEach(function (el) {
      if (el.children.length > 0) return;
      if (/^[\d]+[+%]$/.test(el.textContent.trim())) animateCounter(el);
    });

    /* ──────────────────────────────────────────────
       14. BENEFITS SECTION
    ────────────────────────────────────────────── */
    var benefitItems = gsap.utils.toArray('.benefits-icon-wtext');
    if (benefitItems.length) {
      gsap.from(benefitItems, {
        autoAlpha: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: benefitItems[0], start: 'top 85%', toggleActions: 'play none none none' },
      });
    }

    /* ──────────────────────────────────────────────
       15. AWARDS SECTION
    ────────────────────────────────────────────── */
    var awardItems = gsap.utils.toArray('.awards-item');
    if (awardItems.length) {
      gsap.from(awardItems, {
        autoAlpha: 0, y: 30, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: awardItems[0], start: 'top 85%', toggleActions: 'play none none none' },
      });
    }

    /* ──────────────────────────────────────────────
       16. RESULTS SECTION
    ────────────────────────────────────────────── */
    var csContent = document.querySelector('.cs-item-content');
    if (csContent) {
      gsap.from(csContent, {
        autoAlpha: 0, y: 40, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: csContent, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }

    var csImage = document.querySelector('.cs-image');
    if (csImage) {
      gsap.from(csImage, {
        autoAlpha: 0, scale: 0.96, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: csImage, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }

    var statsGrid = document.querySelector('.project-stats.grid');
    if (statsGrid) {
      var statItems = gsap.utils.toArray(statsGrid.querySelectorAll('.project-stats-item'));
      gsap.from(statItems, {
        autoAlpha: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: statsGrid, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }

    var firstDisplayXL = document.querySelector('.display-xl');
    if (firstDisplayXL) {
      gsap.from(document.querySelectorAll('.display-xl'), {
        autoAlpha: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: firstDisplayXL, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }

    /* ──────────────────────────────────────────────
       17. FOOTER
    ────────────────────────────────────────────── */
    var footerSection = document.querySelector('.footersection');
    if (footerSection) {

      var footerCols = footerSection.querySelectorAll('.footer-column');
      if (footerCols.length) {
        gsap.from(footerCols, {
          autoAlpha: 0, y: -30, duration: 0.7, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: {
            trigger: footerSection.querySelector('.footergrid') || footerSection,
            start: 'top 85%', toggleActions: 'play none none none',
          },
        });
      }

      var footerLogoLetters = footerSection.querySelectorAll('.footer-logo-big .logo-letter');
      if (footerLogoLetters.length) {
        gsap.from(footerLogoLetters, {
          y: -30, opacity: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: {
            trigger: footerSection.querySelector('.footer-logo-big'),
            start: 'top 90%', toggleActions: 'play none none none',
          },
        });
      }

      // Footer link underline — same slide-in/out as nav
      footerSection.querySelectorAll('a').forEach(function (link) {
        link.style.position = 'relative';
        var line = document.createElement('span');
        line.style.cssText = [
          'position:absolute', 'bottom:0', 'left:0',
          'width:100%', 'height:1px', 'background:currentColor',
          'display:block', 'pointer-events:none',
        ].join(';');
        gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
        link.appendChild(line);

        link.addEventListener('mouseenter', function () {
          gsap.to(line, { scaleX: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        });
        link.addEventListener('mouseleave', function () {
          gsap.to(line, {
            scaleX: 0, duration: 0.25, ease: 'power2.in',
            transformOrigin: 'right center', overwrite: 'auto',
            onComplete: function () { gsap.set(line, { transformOrigin: 'left center' }); },
          });
        });
      });

      footerSection.querySelectorAll('.sociallink').forEach(function (link) {
        var icon = link.querySelector('img');
        if (!icon) return;
        link.addEventListener('mouseenter', function () { gsap.to(icon, { y: -4, duration: 0.2, ease: 'power2.out' }); });
        link.addEventListener('mouseleave', function () { gsap.to(icon, { y:  0, duration: 0.25, ease: 'power2.out' }); });
      });

      var legalWrapper = footerSection.querySelector('.legal-wrapper');
      if (legalWrapper) {
        gsap.from(legalWrapper, {
          autoAlpha: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: legalWrapper, start: 'top 95%', toggleActions: 'play none none none' },
        });
      }
    }

    /* ══════════════════════════════════════════════
       ABOUT PAGE
    ══════════════════════════════════════════════ */

    /* ──────────────────────────────────────────────
       A1. OUR APPROACH SECTION
    ────────────────────────────────────────────── */
    var approachSection = document.querySelector('.approach-section, .approach');
    if (approachSection) {

      // .approach-header should have .animated-header in Webflow
      // Global scanner (section 10) handles it — no duplicate needed here

      gsap.from('.approach-body', {
        autoAlpha: 0, y: 24, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.approach-body', start: 'top 80%', toggleActions: 'play none none reverse' },
      });

      var approachSteps = gsap.utils.toArray('.approach-step');
      if (approachSteps.length) {
        gsap.from(approachSteps, {
          autoAlpha: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: approachSteps[0], start: 'top 82%', toggleActions: 'play none none reverse' },
        });
      }

      var approachDeco = document.querySelector('.approach-deco');
      if (approachDeco) {
        gsap.to(approachDeco, { y: -12, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      }
    }

    /* ──────────────────────────────────────────────
       A2. ABOUT STATS SECTION
    ────────────────────────────────────────────── */
    var aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {

      var aboutPhoto = aboutStats.querySelector('.about-photo');
      if (aboutPhoto) {
        gsap.to(aboutPhoto, {
          y: -40, ease: 'none',
          scrollTrigger: { trigger: aboutPhoto, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        });
      }

      // .about-stats-header should have .animated-header in Webflow

      gsap.from('.about-quote', {
        autoAlpha: 0, y: 24, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-quote', start: 'top 82%', toggleActions: 'play none none reverse' },
      });

      var statCards = gsap.utils.toArray('.about-stat-card');
      if (statCards.length) {
        gsap.from(statCards, {
          autoAlpha: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-stats-grid', start: 'top 82%', toggleActions: 'play none none reverse' },
        });
      }
    }

    /* ══════════════════════════════════════════════
       WORK PAGE
    ══════════════════════════════════════════════ */

    /* ──────────────────────────────────────────────
       W1. WORK PAGE — heading + filter pills + cards
           .works-heading should carry .animated-header in Webflow
    ────────────────────────────────────────────── */
    var worksSection = document.querySelector('.works-section');
    if (worksSection) {

      gsap.set('.work-card-overlay', { autoAlpha: 0 });

      var listWrapper = worksSection.querySelector('[fs-list-element="list"]') ||
                        worksSection.querySelector('.works-grid');
      var observer = null;

      function animateCards(cards) {
        if (!cards || !cards.length) return;
        if (observer) observer.disconnect();
        gsap.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
            onComplete: function () {
              gsap.set(cards, { clearProps: 'opacity,y' });
              if (observer && listWrapper) {
                observer.observe(listWrapper, { subtree: false, attributes: true, attributeFilter: ['style'] });
              }
            },
          }
        );
      }

      var workPageCards = gsap.utils.toArray('.work-card');
      animateCards(workPageCards);

      if (listWrapper) {
        var filterTimer = null;
        observer = new MutationObserver(function () {
          clearTimeout(filterTimer);
          filterTimer = setTimeout(function () {
            var nowVisible = [].slice.call(listWrapper.querySelectorAll('.work-card')).filter(function (c) {
              return getComputedStyle(c).display !== 'none';
            });
            animateCards(nowVisible);
          }, 50);
        });
      }

      var filterForm = worksSection.querySelector('[fs-list-element="filters"]');
      if (filterForm) {
        var allPills = filterForm.querySelectorAll('.work-filter-pill');
        var clearBtn = worksSection.querySelector('[fs-list-element="clear"]');

        function setActivePill(activePill) {
          allPills.forEach(function (p) { p.classList.remove('is-active'); });
          if (clearBtn) clearBtn.classList.remove('is-active');
          if (activePill) activePill.classList.add('is-active');
        }

        filterForm.addEventListener('change', function (e) {
          if (e.target.type !== 'radio') return;
          setActivePill(e.target.closest('.work-filter-pill'));
        });

        if (clearBtn) {
          clearBtn.addEventListener('click', function () {
            setActivePill(null);
            clearBtn.classList.add('is-active');
          });
          allPills.forEach(function (p) { p.classList.remove('is-active'); });
          clearBtn.classList.add('is-active');
        }
      }

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

    /* ══════════════════════════════════════════════
       BLOG PAGE
    ══════════════════════════════════════════════ */

    /* ──────────────────────────────────────────────
       B2. DESIGN SHIFT BLOG PAGE
    ────────────────────────────────────────────── */
    var blogSection = document.querySelector('.blog-section');
    if (blogSection) {

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

      var blogCards = gsap.utils.toArray('.blog-card');
      if (blogCards.length) {
        var blogGrid = document.querySelector('.blog-grid');
        gsap.from(blogCards, {
          y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: blogGrid || blogCards[0], start: 'top 85%', toggleActions: 'play none none reverse' },
        });

        blogCards.forEach(function (card) {
          var img = card.querySelector('.blog-card-image');
          if (!img) return;
          card.addEventListener('mouseenter', function () { gsap.to(img, { scale: 1.05, duration: 0.4, ease: 'power2.out' }); });
          card.addEventListener('mouseleave', function () { gsap.to(img, { scale: 1,    duration: 0.4, ease: 'power2.out' }); });
        });
      }
    }

    /* ──────────────────────────────────────────────
       B3. BLOG POST PAGE
    ────────────────────────────────────────────── */
    var postHero = document.querySelector('.post-hero');
    if (postHero) {

      var postHeroImg = postHero.querySelector('.post-hero-image');
      if (postHeroImg) {
        gsap.from(postHeroImg, { scale: 1.04, autoAlpha: 0, duration: 1.2, ease: 'power3.out', clearProps: 'opacity,scale' });
      }

      var postHeroCard = postHero.querySelector('.post-hero-card');
      if (postHeroCard) {
        gsap.from(postHeroCard, { y: 32, autoAlpha: 0, duration: 0.8, delay: 0.3, ease: 'power2.out', clearProps: 'opacity,y' });
      }

      var postQuote = document.querySelector('.post-quote');
      if (postQuote) {
        gsap.from(postQuote, {
          y: 32, autoAlpha: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: postQuote, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }

      gsap.utils.toArray('.post-body').forEach(function (block) {
        gsap.from(block, {
          y: 24, autoAlpha: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: block, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });

      var postSubscribe = document.querySelector('.post-subscribe');
      if (postSubscribe) {
        gsap.from(postSubscribe, {
          y: 24, autoAlpha: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: postSubscribe, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }

      var postCallout = document.querySelector('.post-callout');
      if (postCallout) {
        gsap.from(postCallout, {
          y: 24, autoAlpha: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: postCallout, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }

      var postShare = document.querySelector('.post-share');
      if (postShare) {
        gsap.from(postShare, {
          y: 24, autoAlpha: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: postShare, start: 'top 88%', toggleActions: 'play none none reverse' },
        });
      }

      var postRelatedHeading = document.querySelector('.post-related-heading');
      if (postRelatedHeading) {
        gsap.from(postRelatedHeading, {
          y: 24, autoAlpha: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: postRelatedHeading, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }

      var postRelatedCards = gsap.utils.toArray('.post-related-card');
      if (postRelatedCards.length) {
        var postRelatedGrid = document.querySelector('.post-related-grid');
        gsap.from(postRelatedCards, {
          y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: {
            trigger: postRelatedGrid || postRelatedCards[0],
            start: 'top 85%', toggleActions: 'play none none reverse',
          },
        });

        postRelatedCards.forEach(function (card) {
          var img = card.querySelector('.post-related-image');
          if (!img) return;
          card.addEventListener('mouseenter', function () { gsap.to(img, { scale: 1.05, duration: 0.4, ease: 'power2.out' }); });
          card.addEventListener('mouseleave', function () { gsap.to(img, { scale: 1,    duration: 0.4, ease: 'power2.out' }); });
        });
      }

      // Share buttons
      var sharePlatforms = {
        x:        function (url, title) { return 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title); },
        linkedin: function (url)        { return 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url); },
        facebook: function (url)        { return 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url); },
        copy:     null,
      };
      var shareLabels = { x: 'Share on X', linkedin: 'Share on LinkedIn', facebook: 'Share on Facebook', copy: 'Copy link' };

      document.querySelectorAll('[data-share]').forEach(function (btn) {
        var platform = btn.getAttribute('data-share');
        var tooltip = document.createElement('div');
        tooltip.textContent = shareLabels[platform] || platform;
        tooltip.style.cssText = [
          'position:absolute', 'bottom:calc(100% + 8px)', 'left:50%',
          'transform:translateX(-50%)', 'background:#111921', 'color:#fafafa',
          'font-size:12px', 'white-space:nowrap', 'padding:5px 10px',
          'border-radius:4px', 'pointer-events:none', 'opacity:0',
          'transition:opacity 0.2s', 'z-index:10',
        ].join(';');

        var arrow = document.createElement('div');
        arrow.style.cssText = 'position:absolute;top:100%;left:50%;transform:translateX(-50%);border:4px solid transparent;border-top-color:#111921;';
        tooltip.appendChild(arrow);

        var wrap = document.createElement('div');
        wrap.style.cssText = 'position:relative;display:inline-flex;';
        btn.parentNode.insertBefore(wrap, btn);
        wrap.appendChild(btn);
        wrap.appendChild(tooltip);

        wrap.addEventListener('mouseenter', function () { tooltip.style.opacity = '1'; });
        wrap.addEventListener('mouseleave', function () { tooltip.style.opacity = '0'; });

        btn.style.cursor = 'pointer';
        btn.addEventListener('click', function () {
          var url   = window.location.href;
          var title = document.title;
          if (platform === 'copy') {
            navigator.clipboard.writeText(url).then(function () {
              var orig = tooltip.firstChild.textContent;
              tooltip.firstChild.textContent = 'Copied!';
              setTimeout(function () { tooltip.firstChild.textContent = orig; }, 2000);
            });
            return;
          }
          if (sharePlatforms[platform]) {
            window.open(sharePlatforms[platform](url, title), '_blank', 'width=600,height=500,noopener,noreferrer');
          }
        });
      });
    }

    /* ──────────────────────────────────────────────
       W2. WORK ITEM PAGE
    ────────────────────────────────────────────── */
    var projectHero = document.querySelector('.project-hero');
    if (projectHero) {

      var heroImg = projectHero.querySelector('.project-hero-image');
      if (heroImg) {
        gsap.from(heroImg, { opacity: 0, scale: 1.04, duration: 1.2, ease: 'power3.out', clearProps: 'opacity,scale' });
      }

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

      gsap.utils.toArray('.project-gallery-block').forEach(function (el) {
        gsap.from(el, {
          opacity: 0, y: 48, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });

      var relatedHeading = document.querySelector('.related-heading');
      if (relatedHeading) {
        gsap.from(relatedHeading, {
          opacity: 0, y: 24, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: relatedHeading, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }

      var relatedCards = gsap.utils.toArray('.related-card');
      if (relatedCards.length) {
        gsap.from(relatedCards, {
          opacity: 0, y: 40, duration: 0.6, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: '.related-grid', start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      }

      gsap.set('.related-card-overlay', { autoAlpha: 0 });

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
       18. SCROLL-UP NAV
    ────────────────────────────────────────────── */
    var wNav = document.querySelector('.w-nav');
    if (wNav) {
      wNav.style.setProperty('display',  'block', 'important');
      wNav.style.setProperty('position', 'fixed', 'important');
      wNav.style.setProperty('top',      '0',     'important');
      wNav.style.setProperty('left',     '0',     'important');
      wNav.style.setProperty('right',    '0',     'important');

      if (worksSection || projectHero || blogSection || postHero) {
        gsap.set(wNav, { yPercent: 0 });
      } else {
        gsap.set(wNav, { yPercent: -110 });
        var navHidden = true;

        lenis.on('scroll', function (e) {
          var y         = e.scroll;
          var goingDown = e.direction === 1;

          if (y < 80) {
            if (!navHidden) {
              gsap.to(wNav, { yPercent: -110, duration: 0.35, ease: 'power3.in', overwrite: 'auto' });
              navHidden = true;
            }
          } else if (!goingDown && navHidden) {
            gsap.to(wNav, { yPercent: 0, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
            navHidden = false;
          } else if (goingDown && !navHidden) {
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

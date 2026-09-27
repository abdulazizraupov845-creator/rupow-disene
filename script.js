/* =========================================================
   RAUPOW — ULTRA CINEMATIC EXPERIENCE
   SCRIPT.JS
   VERSION 4.0
========================================================= */

"use strict";

/* =========================================================
   GSAP
========================================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const isMobile = () => window.innerWidth <= 768;


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 300);

    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 1200);

});


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = $(".cursor");
const follower = $(".cursor-follower");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let followerX = mouseX;
let followerY = mouseY;

if (cursor && follower && !isMobile()) {

    window.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.08,
            ease: "power2.out"
        });

    });

    function cursorLoop() {

        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;

        gsap.set(follower, {
            x: followerX,
            y: followerY
        });

        requestAnimationFrame(cursorLoop);
    }

    cursorLoop();

}


/* =========================================================
   CURSOR HOVER EFFECT
========================================================= */

$$("a, button, .service-card, .project-card, .story-card").forEach((element) => {

    element.addEventListener("mouseenter", () => {

        document.body.classList.add("cursor-active");

        if (cursor) {

            gsap.to(cursor, {
                scale: 1.7,
                duration: 0.3,
                ease: "power3.out"
            });

        }

        if (follower) {

            gsap.to(follower, {
                scale: 1.6,
                duration: 0.4,
                ease: "power3.out"
            });

        }

    });

    element.addEventListener("mouseleave", () => {

        document.body.classList.remove("cursor-active");

        if (cursor) {

            gsap.to(cursor, {
                scale: 1,
                duration: 0.35
            });

        }

        if (follower) {

            gsap.to(follower, {
                scale: 1,
                duration: 0.45
            });

        }

    });

});


/* =========================================================
   MOUSE GLOW
========================================================= */

const mouseGlow = document.createElement("div");

mouseGlow.className = "mouse-glow";

document.body.appendChild(mouseGlow);

if (!isMobile()) {

    window.addEventListener("mousemove", (event) => {

        gsap.to(mouseGlow, {
            x: event.clientX,
            y: event.clientY,
            duration: 0.7,
            ease: "power3.out"
        });

    });

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progress = $(".scroll-progress span");

function updateProgress() {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        pageHeight > 0
            ? (scrollTop / pageHeight) * 100
            : 0;

    if (progress) {

        progress.style.width = `${percentage}%`;

    }

}

window.addEventListener("scroll", updateProgress);

updateProgress();


/* =========================================================
   NAVBAR
========================================================= */

const navbar = $(".navbar");

let previousScroll = window.scrollY;

window.addEventListener("scroll", () => {

    const currentScroll = window.scrollY;

    if (!navbar) return;

    if (currentScroll > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

    if (
        currentScroll > previousScroll &&
        currentScroll > 180
    ) {

        gsap.to(navbar, {
            y: -120,
            duration: 0.45,
            ease: "power3.out"
        });

    } else {

        gsap.to(navbar, {
            y: 0,
            duration: 0.5,
            ease: "power3.out"
        });

    }

    previousScroll = currentScroll;

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = $(".menu-toggle");
const mobileMenu = $(".mobile-menu");
const mobileLinks = $$(".mobile-menu a");

let menuOpen = false;

if (menuToggle && mobileMenu) {

    gsap.set(mobileMenu, {
        autoAlpha: 0,
        yPercent: -100
    });

    menuToggle.addEventListener("click", () => {

        menuOpen = !menuOpen;

        menuToggle.classList.toggle(
            "active",
            menuOpen
        );

        if (menuOpen) {

            document.body.style.overflow = "hidden";

            gsap.to(mobileMenu, {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.7,
                ease: "power4.out"
            });

            gsap.fromTo(
                mobileLinks,
                {
                    y: 80,
                    opacity: 0,
                    rotationX: -60
                },
                {
                    y: 0,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.7,
                    stagger: 0.08,
                    ease: "power4.out"
                }
            );

        } else {

            document.body.style.overflow = "";

            gsap.to(mobileMenu, {
                autoAlpha: 0,
                yPercent: -100,
                duration: 0.55,
                ease: "power4.inOut"
            });

        }

    });

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            menuOpen = false;

            menuToggle.classList.remove("active");

            document.body.style.overflow = "";

            gsap.to(mobileMenu, {
                autoAlpha: 0,
                yPercent: -100,
                duration: 0.5
            });

        });

    });

}


/* =========================================================
   HERO INTRO
========================================================= */

const heroTimeline = gsap.timeline();

heroTimeline

    .from(".hero-eyebrow", {
        y: 80,
        opacity: 0,
        rotationX: -70,
        duration: 1.1,
        ease: "power4.out"
    })

    .from(".hero-title .line", {
        yPercent: 140,
        opacity: 0,
        rotateX: -80,
        transformOrigin: "top center",
        duration: 1.25,
        stagger: 0.14,
        ease: "power4.out"
    }, "-=0.7")

    .from(".hero-description", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.7")

    .from(".hero-button", {
        y: 50,
        opacity: 0,
        scale: 0.7,
        duration: 1,
        ease: "back.out(1.8)"
    }, "-=0.6")

    .from(".hero-object", {
        scale: 0.25,
        opacity: 0,
        rotation: -45,
        duration: 1.8,
        ease: "elastic.out(1,0.5)"
    }, "-=1.4");


/* =========================================================
   HERO OBJECT ROTATION
========================================================= */

gsap.to(".object-ring-1", {
    rotation: "+=360",
    duration: 15,
    repeat: -1,
    ease: "none"
});

gsap.to(".object-ring-2", {
    rotation: "-=360",
    duration: 22,
    repeat: -1,
    ease: "none"
});

gsap.to(".object-ring-3", {
    rotation: "+=360",
    duration: 30,
    repeat: -1,
    ease: "none"
});


/* =========================================================
   HERO FLOATING CORE
========================================================= */

gsap.to(".hero-core", {

    y: -30,
    rotation: 12,
    scale: 1.04,

    duration: 3,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});


/* =========================================================
   HERO DOTS
========================================================= */

gsap.to(".dot-one", {

    x: 35,
    y: -45,

    duration: 2.6,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});

gsap.to(".dot-two", {

    x: -30,
    y: 35,

    duration: 3.4,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});

gsap.to(".dot-three", {

    x: 30,
    y: -25,

    duration: 2.3,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});


/* =========================================================
   HERO PARALLAX
========================================================= */

if ($(".hero")) {

    gsap.to(".hero-background", {

        yPercent: 30,

        ease: "none",

        scrollTrigger: {

            trigger: ".hero",

            start: "top top",

            end: "bottom top",

            scrub: 1.5

        }

    });

    gsap.to(".hero-grid", {

        yPercent: -20,
        rotation: 8,

        ease: "none",

        scrollTrigger: {

            trigger: ".hero",

            start: "top top",

            end: "bottom top",

            scrub: 1.5

        }

    });

    gsap.to(".hero-content", {

        y: -190,

        opacity: 0.08,

        scale: 0.92,

        ease: "none",

        scrollTrigger: {

            trigger: ".hero",

            start: "top top",

            end: "bottom top",

            scrub: true

        }

    });

    gsap.to(".hero-object", {

        y: -280,
        rotation: 30,
        scale: 1.3,

        ease: "none",

        scrollTrigger: {

            trigger: ".hero",

            start: "top top",

            end: "bottom top",

            scrub: 1

        }

    });

}


/* =========================================================
   HERO MOUSE 3D
========================================================= */

const hero = $(".hero");

if (hero && !isMobile()) {

    hero.addEventListener("mousemove", (event) => {

        const rect = hero.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width -
            0.5;

        const y =
            (event.clientY - rect.top) /
            rect.height -
            0.5;

        gsap.to(".hero-object", {

            x: x * 40,
            y: y * 40,

            rotationY: x * 15,
            rotationX: y * -15,

            duration: 0.8,

            ease: "power3.out",

            overwrite: true

        });

        gsap.to(".hero-light", {

            x: x * -80,
            y: y * -80,

            duration: 1,

            ease: "power3.out"

        });

    });

}


/* =========================================================
   GENERIC REVEAL
========================================================= */

function revealElements(selector, options = {}) {

    gsap.utils.toArray(selector).forEach((element) => {

        gsap.from(element, {

            y: options.y ?? 100,

            x: options.x ?? 0,

            opacity: 0,

            scale: options.scale ?? 0.95,

            rotation: options.rotation ?? 0,

            duration: options.duration ?? 1.2,

            ease: options.ease ?? "power4.out",

            scrollTrigger: {

                trigger: element,

                start: options.start ?? "top 85%",

                toggleActions:
                    "play none none reverse"

            }

        });

    });

}


/* =========================================================
   INTRO
========================================================= */

revealElements(".intro-label", {
    y: 50
});

revealElements(".intro-title", {
    y: 140,
    scale: 0.85
});

revealElements(".intro-side", {
    x: 120,
    y: 0
});


gsap.to(".intro-title span", {

    y: -35,

    rotation: 3,

    ease: "none",

    scrollTrigger: {

        trigger: ".intro",

        start: "top bottom",

        end: "bottom top",

        scrub: 1

    }

});


/* =========================================================
   ABOUT
========================================================= */

gsap.from(".about-image-inner", {

    clipPath:
        "inset(30% 30% 30% 30% round 100px)",

    scale: 0.65,

    rotation: -12,

    opacity: 0,

    duration: 1.6,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".about-image",

        start: "top 75%"

    }

});


gsap.from(".about-content", {

    x: 160,

    opacity: 0,

    rotationY: -15,

    duration: 1.5,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".about-content",

        start: "top 75%"

    }

});


gsap.to(".about-circle", {

    rotation: 360,

    duration: 18,

    repeat: -1,

    ease: "none"

});


gsap.to(".shape-one", {

    x: 50,
    y: -45,
    rotation: 100,

    duration: 4,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});


gsap.to(".shape-two", {

    x: -35,
    y: 40,
    rotation: -30,

    duration: 3.4,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});


gsap.to(".shape-three", {

    x: 25,
    y: -30,

    duration: 2.5,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});


/* =========================================================
   MARQUEE
========================================================= */

const marqueeTrack = $(".marquee-track");

if (marqueeTrack) {

    const width =
        marqueeTrack.scrollWidth / 2;

    gsap.to(marqueeTrack, {

        x: -width,

        duration: 24,

        repeat: -1,

        ease: "none"

    });

}


/* =========================================================
   SERVICES
========================================================= */

gsap.from(".services-header h2", {

    y: 160,

    opacity: 0,

    rotationX: -80,

    transformOrigin: "center bottom",

    duration: 1.4,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".services-header",

        start: "top 75%"

    }

});


const serviceCards =
    gsap.utils.toArray(".service-card");

serviceCards.forEach((card, index) => {

    gsap.from(card, {

        y: 150,

        opacity: 0,

        rotation:
            index % 2 === 0
                ? -8
                : 8,

        scale: 0.78,

        duration: 1.2,

        delay: index * 0.05,

        ease: "back.out(1.5)",

        scrollTrigger: {

            trigger: card,

            start: "top 88%"

        }

    });

});


/* =========================================================
   SERVICE 3D TILT
========================================================= */

serviceCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (isMobile()) return;

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateY =
            ((x / rect.width) - 0.5) * 18;

        const rotateX =
            ((y / rect.height) - 0.5) * -18;

        gsap.to(card, {

            rotationX: rotateX,

            rotationY: rotateY,

            scale: 1.04,

            z: 30,

            duration: 0.4,

            ease: "power2.out",

            transformPerspective: 1000

        });

    });

    card.addEventListener("mouseleave", () => {

        gsap.to(card, {

            rotationX: 0,

            rotationY: 0,

            scale: 1,

            z: 0,

            duration: 0.7,

            ease: "elastic.out(1,0.5)"

        });

    });

});


/* =========================================================
   VISUAL SECTION
========================================================= */

gsap.from(".visual-orb", {

    scale: 0.2,

    rotation: -180,

    opacity: 0,

    duration: 1.8,

    ease: "elastic.out(1,0.5)",

    scrollTrigger: {

        trigger: ".visual-section",

        start: "top 80%"

    }

});


gsap.to(".visual-orb", {

    rotation: 360,

    scale: 1.15,

    y: -80,

    ease: "none",

    scrollTrigger: {

        trigger: ".visual-section",

        start: "top bottom",

        end: "bottom top",

        scrub: 1.5

    }

});


gsap.to(".visual-grid", {

    rotation: 15,

    yPercent: 20,

    scale: 1.15,

    ease: "none",

    scrollTrigger: {

        trigger: ".visual-section",

        start: "top bottom",

        end: "bottom top",

        scrub: 1

    }

});


gsap.from(".visual-content", {

    y: 150,

    opacity: 0,

    scale: 0.75,

    duration: 1.5,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".visual-section",

        start: "top 70%"

    }

});


/* =========================================================
   PROJECTS
========================================================= */

gsap.from(".projects-header h2", {

    y: 150,

    opacity: 0,

    rotationX: -75,

    duration: 1.4,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".projects-header",

        start: "top 75%"

    }

});


const projectCards =
    gsap.utils.toArray(".project-card");

projectCards.forEach((card, index) => {

    gsap.from(card, {

        y: 170,

        opacity: 0,

        scale: 0.82,

        rotation:
            index % 2 === 0
                ? -6
                : 6,

        duration: 1.2,

        delay: index * 0.12,

        ease: "power4.out",

        scrollTrigger: {

            trigger: card,

            start: "top 88%"

        }

    });

});


/* =========================================================
   PROJECT PARALLAX
========================================================= */

$$(".project-visual").forEach((visual) => {

    gsap.to(visual, {

        backgroundPosition: "50% 70%",

        ease: "none",

        scrollTrigger: {

            trigger: visual,

            start: "top bottom",

            end: "bottom top",

            scrub: 1

        }

    });

});


/* =========================================================
   PROJECT 3D
========================================================= */

projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (isMobile()) return;

        const rect =
            card.getBoundingClientRect();

        const px =
            (event.clientX - rect.left) /
            rect.width;

        const py =
            (event.clientY - rect.top) /
            rect.height;

        gsap.to(card, {

            rotationY: (px - 0.5) * 12,

            rotationX: (py - 0.5) * -12,

            scale: 1.025,

            duration: 0.5,

            ease: "power2.out",

            transformPerspective: 1200

        });

    });

    card.addEventListener("mouseleave", () => {

        gsap.to(card, {

            rotationY: 0,

            rotationX: 0,

            scale: 1,

            duration: 0.8,

            ease: "elastic.out(1,0.5)"

        });

    });

});


/* =========================================================
   PROJECT OBJECTS
========================================================= */

gsap.to(".project-orbit", {

    rotation: "+=360",

    duration: 11,

    repeat: -1,

    ease: "none"

});

gsap.to(".project-ball", {

    y: -35,

    x: 15,

    duration: 2.4,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});

gsap.to(".project-shape", {

    rotation: "+=360",

    duration: 16,

    repeat: -1,

    ease: "none"

});

gsap.to(".project-circle", {

    rotation: "-=360",

    duration: 20,

    repeat: -1,

    ease: "none"

});


/* =========================================================
   STORY HORIZONTAL SECTION
========================================================= */

const storySection = $(".story-section");
const storyCards = $(".story-cards");
const storyIntro = $(".story-intro");

if (
    storySection &&
    storyCards &&
    storyIntro &&
    !isMobile()
) {

    function createStoryAnimation() {

        const cardsWidth =
            storyCards.scrollWidth;

        const viewportWidth =
            window.innerWidth;

        const distance =
            Math.max(
                0,
                cardsWidth -
                viewportWidth +
                120
            );

        gsap.to(storyCards, {

            x: -distance,

            ease: "none",

            scrollTrigger: {

                trigger: storySection,

                start: "top top",

                end: () =>
                    `+=${cardsWidth}`,

                pin: true,

                scrub: 1.2,

                anticipatePin: 1,

                invalidateOnRefresh: true

            }

        });

        gsap.to(storyIntro, {

            x: -180,

            opacity: 0.2,

            ease: "none",

            scrollTrigger: {

                trigger: storySection,

                start: "top top",

                end: () =>
                    `+=${cardsWidth}`,

                scrub: 1

            }

        });

    }

    createStoryAnimation();

}


/* =========================================================
   STORY CARDS
========================================================= */

$$(".story-card").forEach((card, index) => {

    gsap.from(card, {

        y: 200,

        opacity: 0,

        rotationY: -50,

        scale: 0.65,

        duration: 1.3,

        delay: index * 0.15,

        ease: "back.out(1.5)",

        scrollTrigger: {

            trigger: card,

            start: "top 90%"

        }

    });

    gsap.to(card, {

        y:
            index % 2 === 0
                ? -25
                : 25,

        duration:
            2.4 +
            index * 0.3,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    });

});


/* =========================================================
   EXPERIENCE TIMELINE
========================================================= */

gsap.from(".experience-header h2", {

    y: 150,

    opacity: 0,

    rotationX: -80,

    duration: 1.3,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".experience-header",

        start: "top 75%"

    }

});


gsap.from(".timeline-line", {

    scaleY: 0,

    transformOrigin: "top center",

    duration: 2,

    ease: "power3.out",

    scrollTrigger: {

        trigger: ".timeline",

        start: "top 70%",

        end: "bottom 70%",

        scrub: 1

    }

});


$$(".timeline-item").forEach((item, index) => {

    gsap.from(item, {

        x:
            index % 2 === 0
                ? -130
                : 130,

        opacity: 0,

        rotation:
            index % 2 === 0
                ? -5
                : 5,

        duration: 1,

        delay: index * 0.12,

        ease: "power4.out",

        scrollTrigger: {

            trigger: item,

            start: "top 85%"

        }

    });

});


/* =========================================================
   NUMBERS
========================================================= */

$$(".number-item").forEach((item, index) => {

    gsap.from(item, {

        y: 120,

        opacity: 0,

        scale: 0.7,

        rotation:
            index % 2 === 0
                ? -6
                : 6,

        duration: 1,

        delay: index * 0.12,

        ease: "back.out(1.5)",

        scrollTrigger: {

            trigger: item,

            start: "top 85%"

        }

    });

});


/* =========================================================
   COUNTERS
========================================================= */

function animateCounter(element) {

    if (!element) return;

    const original =
        element.textContent.trim();

    const number =
        parseInt(
            original.replace(/\D/g, ""),
            10
        );

    if (!number) return;

    const suffix =
        original.replace(/[0-9]/g, "");

    const object = {
        value: 0
    };

    gsap.to(object, {

        value: number,

        duration: 2.5,

        ease: "power2.out",

        scrollTrigger: {

            trigger: element,

            start: "top 85%",

            once: true

        },

        onUpdate: () => {

            element.textContent =
                Math.floor(object.value) +
                suffix;

        }

    });

}

$$(".number-item strong")
    .forEach(animateCounter);


/* =========================================================
   TESTIMONIALS
========================================================= */

gsap.from(".testimonials-title h2", {

    y: 150,

    opacity: 0,

    rotationX: -75,

    duration: 1.3,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".testimonials-title",

        start: "top 75%"

    }

});


$$(".testimonial-card").forEach((card, index) => {

    gsap.from(card, {

        y: 130,

        opacity: 0,

        scale: 0.82,

        rotation:
            index === 0
                ? -6
                : index === 1
                ? 0
                : 6,

        duration: 1.1,

        delay: index * 0.14,

        ease: "back.out(1.5)",

        scrollTrigger: {

            trigger: card,

            start: "top 88%"

        }

    });

});


/* =========================================================
   FINAL CTA
========================================================= */

gsap.from(".final-orb", {

    scale: 0.25,

    rotation: -120,

    opacity: 0,

    duration: 1.8,

    ease: "elastic.out(1,0.5)",

    scrollTrigger: {

        trigger: ".final-cta",

        start: "top 75%"

    }

});


gsap.to(".final-orb", {

    rotation: 360,

    scale: 1.12,

    y: -50,

    ease: "none",

    scrollTrigger: {

        trigger: ".final-cta",

        start: "top bottom",

        end: "bottom top",

        scrub: 1.5

    }

});


gsap.to(".final-ring", {

    rotation: "+=180",

    scale: 1.3,

    ease: "none",

    scrollTrigger: {

        trigger: ".final-cta",

        start: "top bottom",

        end: "bottom top",

        scrub: 1

    }

});


gsap.from(".final-content", {

    y: 140,

    opacity: 0,

    scale: 0.75,

    duration: 1.4,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".final-cta",

        start: "top 70%"

    }

});


/* =========================================================
   CONTACT
========================================================= */

gsap.from(".contact-title h2", {

    y: 150,

    opacity: 0,

    rotationX: -75,

    duration: 1.4,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".contact-title",

        start: "top 75%"

    }

});


$$(".contact-item").forEach((item, index) => {

    gsap.from(item, {

        x: -120,

        opacity: 0,

        duration: 1,

        delay: index * 0.1,

        ease: "power4.out",

        scrollTrigger: {

            trigger: item,

            start: "top 88%"

        }

    });

});


gsap.from(".contact-message", {

    x: 130,

    opacity: 0,

    rotationY: 10,

    duration: 1.2,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".contact-message",

        start: "top 80%"

    }

});


/* =========================================================
   FOOTER
========================================================= */

gsap.from(".footer-logo", {

    y: 160,

    opacity: 0,

    scale: 0.75,

    duration: 1.5,

    ease: "power4.out",

    scrollTrigger: {

        trigger: ".footer",

        start: "top 80%"

    }

});


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

$$(
    ".hero-button, .cta-button, .contact-button"
).forEach((button) => {

    button.addEventListener("mousemove", (event) => {

        if (isMobile()) return;

        const rect =
            button.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        gsap.to(button, {

            x: x * 0.2,

            y: y * 0.2,

            rotation:
                x * 0.02,

            duration: 0.35,

            ease: "power3.out"

        });

    });

    button.addEventListener("mouseleave", () => {

        gsap.to(button, {

            x: 0,

            y: 0,

            rotation: 0,

            duration: 0.7,

            ease: "elastic.out(1,0.4)"

        });

    });

});


/* =========================================================
   FLOATING PARTICLES
========================================================= */

function createParticles() {

    const sections = [

        ".hero",
        ".about",
        ".services",
        ".projects",
        ".final-cta"

    ];

    sections.forEach((selector) => {

        const section = $(selector);

        if (!section) return;

        const amount =
            isMobile()
                ? 5
                : 14;

        for (let i = 0; i < amount; i++) {

            const particle =
                document.createElement("div");

            particle.className =
                "floating-particle";

            const size =
                Math.random() * 6 + 2;

            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            section.appendChild(particle);

            gsap.to(particle, {

                x:
                    (Math.random() - 0.5) *
                    260,

                y:
                    (Math.random() - 0.5) *
                    260,

                opacity:
                    Math.random() *
                    0.7 +
                    0.2,

                duration:
                    Math.random() *
                    4 +
                    3,

                repeat: -1,

                yoyo: true,

                ease: "sine.inOut",

                delay:
                    Math.random() * 2

            });

        }

    });

}

createParticles();


/* =========================================================
   SCROLL VELOCITY
========================================================= */

let lastScroll =
    window.scrollY;

let scrollVelocity = 0;

window.addEventListener("scroll", () => {

    const current =
        window.scrollY;

    scrollVelocity =
        current -
        lastScroll;

    lastScroll =
        current;

});


/* =========================================================
   VELOCITY MARQUEE
========================================================= */

gsap.ticker.add(() => {

    const speed =
        Math.min(
            Math.abs(scrollVelocity),
            40
        );

    if (marqueeTrack) {

        gsap.to(marqueeTrack, {

            skewX:
                scrollVelocity *
                0.09,

            duration: 0.25,

            overwrite: true

        });

    }

    scrollVelocity *= 0.86;

});


/* =========================================================
   BACK TO TOP
========================================================= */

const backTop = $(".back-top");

if (backTop) {

    backTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

$$('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetID =
            link.getAttribute("href");

        if (
            !targetID ||
            targetID === "#"
        ) {
            return;
        }

        const target =
            $(targetID);

        if (!target) return;

        event.preventDefault();

        const offset = 70;

        const position =
            target.getBoundingClientRect()
                .top +
            window.scrollY -
            offset;

        window.scrollTo({

            top: position,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   SECTION MOUSE PARALLAX
========================================================= */

if (!isMobile()) {

    $$(".visual-section, .final-cta")
        .forEach((section) => {

            section.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        section.getBoundingClientRect();

                    const x =
                        (event.clientX -
                            rect.left) /
                            rect.width -
                        0.5;

                    const y =
                        (event.clientY -
                            rect.top) /
                            rect.height -
                        0.5;

                    gsap.to(
                        section.querySelector(
                            ".visual-orb, .final-orb"
                        ),
                        {

                            x: x * 45,

                            y: y * 45,

                            duration: 0.8,

                            ease: "power3.out"

                        }
                    );

                }
            );

        });

}


/* =========================================================
   PROJECT HOVER GLOW
========================================================= */

projectCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        gsap.to(card, {

            boxShadow:
                "0 35px 100px rgba(255,79,163,.22)",

            duration: 0.4

        });

    });

    card.addEventListener("mouseleave", () => {

        gsap.to(card, {

            clearProps: "boxShadow",

            duration: 0.5

        });

    });

});


/* =========================================================
   SERVICE ICON ROTATION
========================================================= */

$$(".service-card").forEach((card) => {

    const icon =
        card.querySelector(".service-icon");

    if (!icon) return;

    card.addEventListener("mouseenter", () => {

        gsap.to(icon, {

            rotation: 360,

            scale: 1.18,

            duration: 0.7,

            ease: "back.out(1.5)"

        });

    });

    card.addEventListener("mouseleave", () => {

        gsap.to(icon, {

            rotation: 0,

            scale: 1,

            duration: 0.6,

            ease: "power3.out"

        });

    });

});


/* =========================================================
   TIMELINE DOT PULSE
========================================================= */

$$(".timeline-dot").forEach((dot) => {

    gsap.to(dot, {

        scale: 1.35,

        boxShadow:
            "0 0 35px rgba(255,79,163,.7)",

        duration: 1.3,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    });

});


/* =========================================================
   SCROLL SECTION ROTATION
========================================================= */

$$(
    ".about-shape, .project-orbit, .final-ring"
).forEach((element) => {

    gsap.to(element, {

        rotation: "+=180",

        ease: "none",

        scrollTrigger: {

            trigger: element,

            start: "top bottom",

            end: "bottom top",

            scrub: 2

        }

    });

});


/* =========================================================
   RANDOM FLOATING ORBS
========================================================= */

function createAmbientOrbs() {

    const container =
        $(".hero");

    if (!container) return;

    const amount =
        isMobile()
            ? 3
            : 7;

    for (let i = 0; i < amount; i++) {

        const orb =
            document.createElement("div");

        orb.className =
            "floating-particle";

        orb.style.position =
            "absolute";

        orb.style.left =
            `${Math.random() * 100}%`;

        orb.style.top =
            `${Math.random() * 100}%`;

        const size =
            Math.random() * 12 + 4;

        orb.style.width =
            `${size}px`;

        orb.style.height =
            `${size}px`;

        orb.style.borderRadius =
            "50%";

        orb.style.pointerEvents =
            "none";

        container.appendChild(orb);

        gsap.to(orb, {

            x:
                (Math.random() - 0.5) *
                350,

            y:
                (Math.random() - 0.5) *
                350,

            scale:
                Math.random() * 1.8 +
                0.5,

            duration:
                Math.random() * 5 +
                4,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut",

            delay:
                Math.random() * 2

        });

    }

}

createAmbientOrbs();


/* =========================================================
   REFRESH
========================================================= */

window.addEventListener("resize", () => {

    ScrollTrigger.refresh();

});


setTimeout(() => {

    ScrollTrigger.refresh();

}, 500);


setTimeout(() => {

    ScrollTrigger.refresh();

}, 1500);


setTimeout(() => {

    ScrollTrigger.refresh();

}, 3000);


/* =========================================================
   REDUCED MOTION
========================================================= */

if (
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {

    gsap.globalTimeline.timeScale(0.4);

}


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c RAUPOW ",
    "background:#ff4fa3;color:white;font-size:24px;font-weight:bold;padding:12px 25px;border-radius:10px;"
);

console.log(
    "%c ULTRA CINEMATIC EXPERIENCE ACTIVATED ✨ ",
    "color:#ff4fa3;font-size:16px;font-weight:bold;"
);

console.log(
    "%c Scroll • Motion • 3D • Parallax • RAUPOW ",
    "color:#777;font-size:13px;"
);
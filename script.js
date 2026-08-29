// Respect reduced-motion preference
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

window.addEventListener("load", function () {
    console.log("Welcome to Ajay's Portfolio!");
});

/* =========================
   TYPEWRITER HERO
========================== */

function runTypewriter() {
    const el = document.getElementById("typedLine");
    const output = document.getElementById("terminalOutput");
    const text = "whoami";

    if (prefersReducedMotion) {
        el.textContent = text;
        output.classList.add("show");
        return;
    }

    el.textContent = "";
    let i = 0;

    function typeChar() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, 110);
        } else {
            setTimeout(function () {
                output.classList.add("show");
            }, 250);
        }
    }

    typeChar();
}

runTypewriter();

/* =========================
   SCROLL REVEAL + SKILL BARS
========================== */

const revealTargets = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealTargets.forEach(function (target) {
        revealObserver.observe(target);
    });

    const skillBars = document.querySelectorAll(".skill-progress");
    const skillObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.style.width = target.dataset.width + "%";
                    observer.unobserve(target);
                }
            });
        },
        { threshold: 0.3 }
    );

    skillBars.forEach(function (bar) {
        skillObserver.observe(bar);
    });
} else {
    // No IntersectionObserver support, or motion reduced: show everything immediately
    revealTargets.forEach(function (target) {
        target.classList.add("in-view");
    });
    document.querySelectorAll(".skill-progress").forEach(function (bar) {
        bar.style.width = bar.dataset.width + "%";
    });
}

/* =========================
   NAV: SCROLL SHADOW + ACTIVE TAB
========================== */

const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a[href^='#']");
const sections = Array.from(navLinks)
    .map(function (link) {
        return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 4px 15px rgba(0,0,0,0.35)";
    } else {
        nav.style.boxShadow = "none";
    }

    let currentIndex = -1;
    sections.forEach(function (section, index) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120) {
            currentIndex = index;
        }
    });

    navLinks.forEach(function (link, index) {
        link.classList.toggle("active", index === currentIndex);
    });
});

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        console.log("Navigating to " + this.textContent.trim());
    });
});

/* =========================
   MOBILE NAV TOGGLE
========================== */

const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

navToggle.addEventListener("click", function () {
    const isOpen = navList.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
});

navList.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navList.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});
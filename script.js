"use strict";

/* =========================
   HERO BUTTON
========================= */
function showMessage() {
    alert("Welcome to Legend Of Oghodo!");
}

/* =========================
   FORM HANDLER
========================= */
function submitForm() {
    alert("Message sent!");
    return false;
}

/* =========================
   SCROLL ANIMATION SYSTEM
========================= */
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(sec => {
    sec.classList.add("hidden");
    observer.observe(sec);
});

/* =========================
   LIGHTBOX (IMPROVED SAFE VERSION)
========================= */
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

const images = document.querySelectorAll(".gallery-grid img");

images.forEach(img => {
    img.addEventListener("click", () => {
        lightbox.classList.add("active");

        lightbox.innerHTML = `
            <img src="${img.src}" style="max-width:90%; border-radius:10px;">
        `;
    });
});

function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.innerHTML = "";
}

lightbox.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});

/* =========================
   STATS COUNTER (OPTIMIZED)
========================= */
const counters = document.querySelectorAll(".counter");

function runCounter(counter) {
    let target = Number(counter.dataset.target);
    let count = 0;

    const step = target / 100;

    const update = () => {
        count += step;

        if (count < target) {
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(update);
        } else {
            counter.innerText = target;
        }
    };

    update();
}

const statsSection = document.querySelector("#stats");

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(runCounter);
                statsObserver.disconnect();
            }
        });
    }, {
        threshold: 0.4
    });

    statsObserver.observe(statsSection);
}

/* =========================
   VIDEO SLIDER
========================= */
const videos = [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/ysz5S6PUM-U",
    "https://www.youtube.com/embed/tgbNymZ7vqY"
];

let current = 0;

function showVideo(index) {
    const frame = document.getElementById("videoFrame");
    if (!frame) return;
    frame.src = videos[index];
}

function nextVideo() {
    current = (current + 1) % videos.length;
    showVideo(current);
}

function prevVideo() {
    current = (current - 1 + videos.length) % videos.length;
    showVideo(current);
}

/* =========================
   NAV ACTIVE SCROLL TRACKING
========================= */
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});
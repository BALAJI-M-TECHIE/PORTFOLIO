/* ===========================
   LOADER
=========================== */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);
    }, 2500);
});

/* ===========================
   CUSTOM CURSOR
=========================== */
const cursor = document.querySelector(".cursor");
if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    const hoverItems = document.querySelectorAll("a, button,.project-card,.skill-card,.profile-card");
    hoverItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(2)";
        });
        item.addEventListener("mouseleave", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(1)";
        });
    });
}

/* ===========================
   LOGO TYPING EFFECT
=========================== */
const logo = document.querySelector('.logo');
if (logo) {
    const originalText = logo.textContent.trim();
    logo.textContent = '';

    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            logo.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 110);
        }
    }

    window.addEventListener('load', () => {
        setTimeout(typeWriter, 2600);
    });
}

/* ===========================
   TYPING EFFECT FOR TITLES
=========================== */
const typingElement = document.getElementById("typing-text");
if (typingElement) {
   const titles = [
        "Frontend Developer",
        "Aspiring Full Stack Developer",
        "React Developer",
        "Java Programmer",
        "Software Engineering Student"
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {
        const currentTitle = titles[titleIndex];
        if (!deleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentTitle.length) {
                deleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
            }
        }
        setTimeout(typeEffect, deleting? 60 : 120);
    }
    typeEffect();
}

/* ===========================
   DARK/LIGHT MODE TOGGLE
=========================== */
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    icon.className = savedTheme === 'light'? 'fas fa-sun' : 'fas fa-moon';

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark'? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        icon.className = newTheme === 'light'? 'fas fa-sun' : 'fas fa-moon';
    });
}

/* ===========================
   PARTICLES JS
=========================== */
particlesJS("particles-js", {
    particles: {
        number: { value: 90, density: { enable: true, value_area: 800 } },
        color: { value: "#ff4f8b" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ff4f8b", opacity: 0.25, width: 1 },
        move: { enable: true, speed: 2 }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
        modes: { grab: { distance: 180, line_linked: { opacity: 0.8 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

/* ===========================
   SCROLL REVEAL CARDS
=========================== */
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(card => observer.observe(card));
});

/* ===========================
   SCROLL REVEAL
=========================== */
const revealElements = document.querySelectorAll(".glass-card,.project-card,.skill-card,.profile-card");
function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < trigger) {
            el.classList.add("show");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ===========================
   NAVBAR SHOW AFTER LOADER + HERO SCROLL
=========================== */
const navbar = document.querySelector(".navbar");
const heroSection = document.querySelector(".hero");
let loaderFinished = false;

// Loader mudinja piragu flag true
window.addEventListener("load", () => {
    setTimeout(() => {
        loaderFinished = true;
        handleNavbar(); // First check
    }, 3500); // 2.5s loader + 1s fade = 3.5s
});

function handleNavbar() {
    if (!navbar ||!heroSection ||!loaderFinished) return; // Loader mudiyala na return

    const heroHeight = heroSection.offsetHeight;
    const scrollY = window.scrollY;

    // Hero 80% thandi vandha navbar show
    if (scrollY > heroHeight * 0.8) {
        navbar.classList.add("show");
        document.body.classList.add("navbar-active");
        document.documentElement.classList.add("navbar-active");

        document.querySelectorAll("section").forEach(sec => {
            sec.classList.add("navbar-active");
        });
    } else {
        navbar.classList.remove("show");
        document.body.classList.remove("navbar-active");
        document.documentElement.classList.remove("navbar-active");

        document.querySelectorAll("section").forEach(sec => {
            sec.classList.remove("navbar-active");
        });
    }
}

window.addEventListener("scroll", handleNavbar);
window.addEventListener("resize", handleNavbar);

/* ===========================
   ACTIVE NAV LINK
=========================== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    if (!loaderFinished) return; // Loader mudiyala na active link work aagathu

    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* ===========================
   SMOOTH SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
    });
});

/* ===========================
   3D CARD TILT EFFECT
=========================== */
const tiltCards = document.querySelectorAll(".project-card,.skill-card,.profile-card");
tiltCards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / 20);
        const rotateY = ((centerX - x) / 20);
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
});

/* ===========================
   FLOATING ANIMATION
=========================== */
const floatingCards = document.querySelectorAll(".glass-card");
floatingCards.forEach((card, index) => {
    card.animate([
        { transform: "translateY(0px)" },
        { transform: "translateY(-12px)" },
        { transform: "translateY(0px)" }
    ], { duration: 4000 + index * 500, iterations: Infinity });
});

/* ===========================
   NAVBAR BLUR ON SCROLL
=========================== */
window.addEventListener("scroll", () => {
    if (!navbar ||!loaderFinished) return;

    if (window.scrollY > 50 && navbar.classList.contains("show")) {
        navbar.style.background = "rgba(20,10,15,0.8)";
        navbar.style.backdropFilter = "blur(25px)";
    } else if (navbar.classList.contains("show")) {
        navbar.style.background = "rgba(255,255,255,0.05)";
    }
});

/* ===========================
   PARALLAX HERO EFFECT
=========================== */
window.addEventListener("mousemove", (e) => {
    const sphere = document.querySelector(".hero-sphere");
    if (!sphere) return;
    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;
    sphere.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});
/* PARTICLES - FAIL AANA KOODA NAVBAR VARUM */
try {
    particlesJS("particles-js", {
        particles: {
            number: { value: 90, density: { enable: true, value_area: 800 } },
            color: { value: "#ff4f8b" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ff4f8b", opacity: 0.25, width: 1 },
            move: { enable: true, speed: 2 }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
            modes: { grab: { distance: 180, line_linked: { opacity: 0.8 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
} catch(e) {
    console.log("Particles blocked, navbar still works");
}

/* PARTICLES BG INIT */
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ff4f8b" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ff4f8b", opacity: 0.3, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
            modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
    console.log("Particles loaded!");
} else {
    console.log("particlesJS not loaded");
}

window.addEventListener("load", () => {
    setTimeout(() => {
        const navbar = document.querySelector(".navbar");
        const hero = document.querySelector(".hero");
        
        if(navbar && hero) {
            window.addEventListener("scroll", () => {
                if(window.scrollY > hero.offsetHeight - 100) {
                    navbar.classList.add("show");
                    document.body.classList.add("navbar-active");
                } else {
                    navbar.classList.remove("show");
                    document.body.classList.remove("navbar-active");
                }
            });
        }
    }, 3500);
});
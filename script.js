/* =====================================================
   PORTFOLIO JAVASCRIPT
===================================================== */


/* =====================================================
   HEADER
===================================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");

menuButton.addEventListener("click", () => {

    nav.classList.toggle("open");

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

    });

});


/* =====================================================
   SCROLL ANIMATIONS
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();


    if (!name || !email || !message) {

        formMessage.textContent =
            "Пожалуйста, заполните все поля.";

        formMessage.style.color = "#e53935";

        return;
    }


    formMessage.textContent =
        "Сообщение успешно подготовлено!";

    formMessage.style.color = "#7ee787";


    contactForm.reset();


    setTimeout(() => {

        formMessage.textContent = "";

    }, 5000);

});


/* =====================================================
   CURRENT YEAR
===================================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =====================================================
   PARALLAX HERO
===================================================== */

const heroVisual = document.querySelector(".hero-visual");

window.addEventListener("mousemove", (event) => {

    if (!heroVisual) return;

    const x =
        (window.innerWidth / 2 - event.clientX) / 50;

    const y =
        (window.innerHeight / 2 - event.clientY) / 50;

    heroVisual.style.transform =
        `translate(${x}px, ${y}px)`;

});


/* =====================================================
   PROJECT HOVER EFFECT
===================================================== */

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});

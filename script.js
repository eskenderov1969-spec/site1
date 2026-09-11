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
/* =====================================================
   USER AUTHENTICATION
===================================================== */


/* ---------- REGISTRATION ---------- */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const message =
            document.getElementById("registerMessage");


        if (password.length < 6) {

            message.textContent =
                "Пароль должен содержать минимум 6 символов.";

            return;
        }


        const existingUser =
            JSON.parse(localStorage.getItem("portfolioUser"));


        if (
            existingUser &&
            existingUser.email.toLowerCase() === email.toLowerCase()
        ) {

            message.textContent =
                "Пользователь с таким Email уже существует.";

            return;
        }


        const user = {
            name: name,
            email: email,
            password: password
        };


        localStorage.setItem(
            "portfolioUser",
            JSON.stringify(user)
        );


        message.style.color = "#7ee787";

        message.textContent =
            "Регистрация успешна! Переходим ко входу...";


        setTimeout(() => {

            window.location.href = "login.html";

        }, 1200);

    });

}


/* ---------- LOGIN ---------- */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");


        const user =
            JSON.parse(localStorage.getItem("portfolioUser"));


        if (!user) {

            message.textContent =
                "Аккаунт не найден. Сначала зарегистрируйтесь.";

            return;
        }


        if (
            user.email.toLowerCase() !== email.toLowerCase() ||
            user.password !== password
        ) {

            message.textContent =
                "Неверный Email или пароль.";

            return;
        }


        localStorage.setItem(
            "portfolioLoggedIn",
            "true"
        );


        message.style.color = "#7ee787";

        message.textContent =
            "Вход выполнен. Загружаем кабинет...";


        setTimeout(() => {

            window.location.href = "profile.html";

        }, 800);

    });

}


/* ---------- PROFILE ---------- */

const profileName =
    document.getElementById("profileName");

if (profileName) {

    const loggedIn =
        localStorage.getItem("portfolioLoggedIn");

    const user =
        JSON.parse(localStorage.getItem("portfolioUser"));


    if (loggedIn !== "true" || !user) {

        window.location.href = "login.html";

    } else {

        profileName.textContent = user.name;

        document.getElementById(
            "profileEmail"
        ).textContent = user.email;


        document.getElementById(
            "profileAvatar"
        ).textContent =
            user.name.charAt(0).toUpperCase();

    }

}


/* ---------- LOGOUT ---------- */

const logoutButton =
    document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", () => {

        localStorage.removeItem(
            "portfolioLoggedIn"
        );

        window.location.href = "index.html";

    });

}


/* ---------- DELETE ACCOUNT ---------- */

const deleteAccount =
    document.getElementById("deleteAccount");

if (deleteAccount) {

    deleteAccount.addEventListener("click", () => {

        const confirmation =
            confirm(
                "Вы действительно хотите удалить аккаунт?"
            );


        if (!confirmation) {
            return;
        }


        localStorage.removeItem("portfolioUser");

        localStorage.removeItem("portfolioLoggedIn");


        window.location.href = "index.html";

    });

}

/* =====================================================
   THEME TOGGLE — DAY / NIGHT
===================================================== */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight =
            document.body.classList.contains("light-theme");

        localStorage.setItem(
            "theme",
            isLight ? "light" : "dark"
        );

    });

}
document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("themeToggle");

    console.log("Кнопка темы:", themeToggle);

    if (!themeToggle) {
        console.log("ОШИБКА: кнопка themeToggle не найдена");
        return;
    }

    themeToggle.addEventListener("click", function () {

        console.log("Кнопка нажата");

        document.body.classList.toggle("light-theme");

        if (document.body.classList.contains("light-theme")) {
            localStorage.setItem("site-theme", "light");
        } else {
            localStorage.setItem("site-theme", "dark");
        }

    });

});

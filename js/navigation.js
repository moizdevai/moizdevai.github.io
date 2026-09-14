/* ========================================
   MoizDevAI
   Navigation
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section");


    /* ---------- Mobile Menu ---------- */

    if (menuToggle && sidebar) {

        menuToggle.addEventListener("click", () => {

            sidebar.classList.toggle("active");
            document.body.classList.toggle("menu-open");

        });

    }


    /* ---------- Close Menu After Click ---------- */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (sidebar) {
                sidebar.classList.remove("active");
            }

            document.body.classList.remove("menu-open");

        });

    });


    /* ---------- Active Navigation ---------- */

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 200;

            if (window.scrollY >= sectionTop) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();

});
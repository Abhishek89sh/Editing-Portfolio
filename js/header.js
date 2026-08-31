document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    const mobileLinks =
        document.querySelectorAll(".mobile-nav-link");



    if (!menuToggle || !mobileMenu) {
        console.error("Mobile menu elements not found.");
        return;
    }

    function handleScroll() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();

    function openMenu() {

        mobileMenu.classList.add("active");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close menu"
        );

        document.body.style.overflow = "hidden";

    }

    function closeMenu() {

        mobileMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open menu"
        );

        document.body.style.overflow = "";

    }

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.contains("active");


        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    });


    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 1000) {

            closeMenu();

        }

    });

});
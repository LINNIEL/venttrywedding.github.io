/*
======================================================
    SCROLL CONTROLLER
======================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    disableScroll();

});



/*
======================================================
    DISABLE SCROLL
======================================================
*/

function disableScroll() {

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

}



/*
======================================================
    ENABLE SCROLL
======================================================
*/

function enableScroll() {

    document.body.style.overflowY = "auto";
    document.documentElement.style.overflowY = "auto";

    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";

}



/*
======================================================
    SCROLL TO SECTION
======================================================
*/

function scrollToSection(sectionId) {

    const section = document.getElementById(sectionId);

    if (!section) return;

    section.scrollIntoView({

        behavior: "smooth",
        block: "start"

    });

}
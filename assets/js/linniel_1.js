/*
======================================================
    LINNIEL 1
======================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initLinniel1();

});



/*
======================================================
    INITIALIZE
======================================================
*/

function initLinniel1() {

    const openButton = document.getElementById("openInvitation");

    if (!openButton) return;

    openButton.addEventListener("click", openInvitation);

}



/*
======================================================
    OPEN INVITATION
======================================================
*/

function openInvitation() {

    const cover = document.getElementById("linniel_1");

    if (!cover) return;

    /* Aktifkan scrolling */
    enableScroll();

    playMusic();

    /* Animasi cover */
    cover.classList.add("slide-left");

    /* Scroll ke isi undangan */
    setTimeout(() => {

        scrollToSection("linniel_2");

    }, 250);

    /* Sembunyikan cover setelah animasi selesai */
setTimeout(() => {

    cover.style.display = "none";

    if (typeof AOS !== "undefined") {

        AOS.refresh();

    }

}, 900);

}
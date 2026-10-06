/*
======================================================
    GUEST NAME
======================================================
*/

document.addEventListener("DOMContentLoaded", loadGuestName);



/*
======================================================
    LOAD GUEST NAME
======================================================
*/

function loadGuestName() {

    const guestElement = document.getElementById("guestName");

    if (!guestElement) return;

    const params = new URLSearchParams(window.location.search);

    const guest = params.get("to");

    if (!guest) {

        guestElement.textContent = "Tamu Undangan";

        return;

    }

    guestElement.textContent = formatGuestName(guest);

}



/*
======================================================
    FORMAT GUEST NAME
======================================================
*/

function formatGuestName(name) {

    return decodeURIComponent(name)
        .replace(/_/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, function(letter) {

            return letter.toUpperCase();

        });

}
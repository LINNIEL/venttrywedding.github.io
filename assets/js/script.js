/*
======================================================
    LINNIEL INVITATION
    Main Script
======================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initWebsite();

});

/*
======================================================
    INITIALIZE WEBSITE
======================================================
*/

function initWebsite() {

    console.log("Linniel Invitation Loaded");

}

/* =================================
   MENGAMBIL NAMA TAMU DARI URL
================================= */

function getNamaTamu() {

    const params = new URLSearchParams(
        window.location.search
    );

    let nama = params.get("to");

    if (!nama) {
        return "";
    }

    // Ubah underscore menjadi spasi
    nama = nama.replace(/_/g, " ");

    // Ubah menjadi Title Case
    nama = nama
        .toLowerCase()
        .replace(/\b\w/g, function(huruf) {
            return huruf.toUpperCase();
        });

    return nama;
}


/* =================================
   ISI FORM NAMA OTOMATIS
================================= */

document.addEventListener("DOMContentLoaded", function() {

    const namaInput =
        document.getElementById("nama");

    const namaTamu =
        getNamaTamu();

    if (namaTamu) {

        namaInput.value =
            namaTamu;

    }

});
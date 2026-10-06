/* =================================
   GOOGLE SHEETS RSVP
   AMBIL UCAPAN TERBARU
================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx9XocFAsvU1B7FZd_U4rbaFavayktjAcYQoSD1CK2qHGeyeJjociHAeHYWjcON8mWv/exec";


async function loadUcapan() {

    const container =
        document.getElementById(
            "daftarUcapan"
        );


    if (!container) return;


    try {

        const response =
            await fetch(
                GOOGLE_SCRIPT_URL
            );


        const data =
            await response.json();


        container.innerHTML = "";


        /*
         * Jika belum ada ucapan
         */

        if (!data || data.length === 0) {

            container.innerHTML = `
                <div class="ucapan-empty">
                    Belum ada ucapan.
                </div>
            `;

            return;

        }


        /*
         * Tampilkan ucapan
         */

        data.forEach(function(item) {

            const card =
                document.createElement("div");

            card.className =
                "ucapan-card";


            const nama =
                document.createElement("div");

            nama.className =
                "ucapan-nama";

            nama.textContent =
                item.nama || "Tamu Undangan";


            const ucapan =
                document.createElement("p");

            ucapan.className =
                "ucapan-text";

            ucapan.textContent =
                item.ucapan ||
                "Semoga menjadi keluarga yang bahagia.";


            const status =
                document.createElement("div");

            status.className =
                "ucapan-status";

            status.textContent =
                item.kehadiran === "Hadir"
                    ? "✓ Akan hadir"
                    : "Tidak dapat hadir";


            card.appendChild(nama);

            card.appendChild(ucapan);

            card.appendChild(status);

            container.appendChild(card);

        });


    } catch (error) {

        console.error(
            "Gagal mengambil ucapan:",
            error
        );


        container.innerHTML = `
            <div class="ucapan-error">
                Ucapan belum dapat dimuat.
            </div>
        `;

    }

}


/*
 * Jalankan ketika halaman selesai dimuat
 */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadUcapan();

    }
);
/* =================================
   GOOGLE SHEETS RSVP
   AMBIL UCAPAN TERBARU
================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx9XocFAsvU1B7FZd_U4rbaFavayktjAcYQoSD1CK2qHGeyeJjociHAeHYWjcON8mWv/exec";


let ucapanSudahDimuat = false;


/* =================================
   LOAD UCAPAN
================================= */

async function loadUcapan() {

    if (ucapanSudahDimuat) return;

    const container =
        document.getElementById("daftarUcapan");

    if (!container) return;


    ucapanSudahDimuat = true;


    try {

        /* =========================
           TIMEOUT 8 DETIK
        ========================= */

        const controller =
            new AbortController();

        const timeout =
            setTimeout(() => {
                controller.abort();
            }, 8000);


        const response =
            await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: "GET",
                    cache: "no-store",
                    signal: controller.signal
                }
            );


        clearTimeout(timeout);


        if (!response.ok) {
            throw new Error(
                "Server mengembalikan error."
            );
        }


        const data =
            await response.json();


        container.innerHTML = "";


        /* =========================
           BELUM ADA UCAPAN
        ========================= */

        if (!data || data.length === 0) {

            container.innerHTML = `
                <div class="ucapan-empty">
                    Belum ada ucapan.
                </div>
            `;

            return;
        }


        /* =========================
           TAMPILKAN UCAPAN
        ========================= */

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
                item.nama ||
                "Tamu Undangan";


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


/* =================================
   LOAD SAAT SECTION MENDEKATI VIEWPORT
================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const section =
            document.querySelector(
                ".ucapan-section"
            );


        if (!section) return;


        const observer =
            new IntersectionObserver(
                function(entries, observer) {

                    entries.forEach(function(entry) {

                        if (entry.isIntersecting) {

                            loadUcapan();

                            observer.unobserve(
                                section
                            );

                        }

                    });

                },
                {
                    rootMargin: "300px"
                }
            );


        observer.observe(section);

    }
);
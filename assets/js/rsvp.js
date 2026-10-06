const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx9XocFAsvU1B7FZd_U4rbaFavayktjAcYQoSD1CK2qHGeyeJjociHAeHYWjcON8mWv/exec";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("rsvpForm");
  const submitButton = document.getElementById("submitButton");
  const loading = document.getElementById("loading");
  const successMessage = document.getElementById("successMessage");
  const jumlahOrangGroup = document.getElementById("jumlahOrangGroup");
  const jumlahOrang = document.getElementById("jumlahOrang");
  const containerUcapan = document.getElementById("daftarUcapan");

  async function loadUcapan() {
    if (!containerUcapan) return;

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();

      containerUcapan.innerHTML = "";

      if (!data || data.length === 0) {
        containerUcapan.innerHTML =
          '<div class="ucapan-empty">Belum ada ucapan.</div>';
        return;
      }

      data.forEach(function (item) {
        const card = document.createElement("div");
        card.className = "ucapan-card";

        const nama = document.createElement("div");
        nama.className = "ucapan-nama";
        nama.textContent = item.nama || "Tamu Undangan";

        const ucapan = document.createElement("p");
        ucapan.className = "ucapan-text";
        ucapan.textContent =
          item.ucapan || "Semoga menjadi keluarga yang bahagia.";

        const status = document.createElement("div");
        status.className = "ucapan-status";
        status.textContent =
          item.kehadiran === "Hadir"
            ? "✓ hadir"
            : "Tidak dapat hadir";

        card.append(nama, ucapan, status);
        containerUcapan.appendChild(card);
      });
    } catch (error) {
      console.error("Gagal mengambil ucapan:", error);

      containerUcapan.innerHTML =
        '<div class="ucapan-error">Ucapan belum dapat dimuat.</div>';
    }
  }

  const attendanceInputs = document.querySelectorAll(
    'input[name="kehadiran"]'
  );

  attendanceInputs.forEach(function (input) {
    input.addEventListener("change", function () {
      if (!jumlahOrangGroup || !jumlahOrang) return;

      if (this.value === "Hadir") {
        jumlahOrangGroup.style.display = "block";
        jumlahOrang.required = true;
      } else {
        jumlahOrangGroup.style.display = "none";
        jumlahOrang.required = false;
        jumlahOrang.value = "";
      }
    });
  });

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const nama = document.getElementById("nama").value.trim();
      const kehadiran = document.querySelector(
        'input[name="kehadiran"]:checked'
      );
      const ucapan = document.getElementById("ucapan").value.trim();

      if (!kehadiran) {
        alert("Silakan pilih konfirmasi kehadiran.");
        return;
      }

      let jumlah = "";

      if (kehadiran.value === "Hadir") {
        jumlah = jumlahOrang.value;

        if (!jumlah) {
          alert("Silakan pilih jumlah orang.");
          return;
        }
      }

      const data = {
        nama: nama,
        kehadiran: kehadiran.value,
        jumlahOrang: jumlah,
        ucapan: ucapan
      };

      submitButton.disabled = true;
      submitButton.innerText = "Mengirim...";
      loading.style.display = "block";

      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8"
          },
          body: JSON.stringify(data)
        });

        form.style.display = "none";
        loading.style.display = "none";
        successMessage.style.display = "block";

        // Muat ulang daftar ucapan setelah RSVP dikirim
        setTimeout(loadUcapan, 1000);
      } catch (error) {
        console.error("Gagal mengirim RSVP:", error);

        loading.style.display = "none";
        submitButton.disabled = false;
        submitButton.innerText = "Kirim RSVP";

        alert("Terjadi kesalahan. Silakan coba lagi.");
      }
    });
  }

  loadUcapan();
});
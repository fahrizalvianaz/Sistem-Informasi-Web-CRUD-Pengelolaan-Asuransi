// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll("#sidebar .side-dropdown");
const sidebar = document.getElementById("sidebar");

allDropdown.forEach((item) => {
  const a = item.parentElement.querySelector("a:first-child");
  if (item.classList.contains("show")) {
    a.classList.toggle("active");
  }
  a.addEventListener("click", function (e) {
    e.preventDefault();

    if (!this.classList.contains("active")) {
      allDropdown.forEach((i) => {
        const aLink = i.parentElement.querySelector("a:first-child");

        aLink.classList.remove("active");
        i.classList.remove("show");
      });
    }

    this.classList.toggle("active");
    item.classList.toggle("show");
  });
});

// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector("nav .toggle-sidebar");
const allSideDivider = document.querySelectorAll("#sidebar .divider");

if (sidebar.classList.contains("hide")) {
  allSideDivider.forEach((item) => {
    item.textContent = "-";
  });
  allDropdown.forEach((item) => {
    const a = item.parentElement.querySelector("a:first-child");
    a.classList.remove("active");
    item.classList.remove("show");
  });
} else {
  allSideDivider.forEach((item) => {
    item.textContent = item.dataset.text;
  });
}

toggleSidebar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");

  if (sidebar.classList.contains("hide")) {
    allSideDivider.forEach((item) => {
      item.textContent = "-";
    });

    allDropdown.forEach((item) => {
      const a = item.parentElement.querySelector("a:first-child");
      a.classList.remove("active");
      item.classList.remove("show");
    });
  } else {
    allSideDivider.forEach((item) => {
      item.textContent = item.dataset.text;
    });
  }
});

sidebar.addEventListener("mouseleave", function () {
  if (this.classList.contains("hide")) {
    allDropdown.forEach((item) => {
      const a = item.parentElement.querySelector("a:first-child");
      a.classList.remove("active");
      item.classList.remove("show");
    });
    allSideDivider.forEach((item) => {
      item.textContent = "-";
    });
  }
});

sidebar.addEventListener("mouseenter", function () {
  if (this.classList.contains("hide")) {
    allDropdown.forEach((item) => {
      const a = item.parentElement.querySelector("a:first-child");
      a.classList.remove("active");
      item.classList.remove("show");
    });
    allSideDivider.forEach((item) => {
      item.textContent = item.dataset.text;
    });
  }
});

// PROFILE DROPDOWN
const profile = document.querySelector("nav .profile");
const imgProfile = profile.querySelector("img");
const dropdownProfile = profile.querySelector(".profile-link");

imgProfile.addEventListener("click", function () {
  dropdownProfile.classList.toggle("show");
});

// MENU
const allMenu = document.querySelectorAll("main .content-data .head .menu");

allMenu.forEach((item) => {
  const icon = item.querySelector(".icon");
  const menuLink = item.querySelector(".menu-link");

  icon.addEventListener("click", function () {
    menuLink.classList.toggle("show");
  });
});

window.addEventListener("click", function (e) {
  if (e.target !== imgProfile) {
    if (e.target !== dropdownProfile) {
      if (dropdownProfile.classList.contains("show")) {
        dropdownProfile.classList.remove("show");
      }
    }
  }

  allMenu.forEach((item) => {
    const icon = item.querySelector(".icon");
    const menuLink = item.querySelector(".menu-link");

    if (e.target !== icon) {
      if (e.target !== menuLink) {
        if (menuLink.classList.contains("show")) {
          menuLink.classList.remove("show");
        }
      }
    }
  });
});

// function calculateTimeUntilMidnight() {
//   const now = new Date();
//   const midnight = new Date(now);
//   midnight.setHours(24, 0, 0, 0); // Set waktu menjadi pukul 00:00:00

//   const timeUntilMidnight = midnight - now; // Hitung selisih waktu dalam milidetik
//   return timeUntilMidnight;
// }

// // Fungsi untuk merefresh halaman setelah waktu yang ditentukan
// function refreshAtMidnight() {
//   setInterval(function () {
//     location.reload(); // Melakukan refresh halaman
//   }, calculateTimeUntilMidnight()); // Refresh halaman saat pukul 12 malam
// }

// // Panggil fungsi untuk pertama kali
// refreshAtMidnight();

// CABANG / BRANCH

// PENGATURAN AGING
const socket = io();
let agingArray = {};
let i = 0;

socket.on("message", (data, count) => {
  // const aging = data.length;
  // for (const doc of aging) {
  for (const doc of data) {
    const id = doc._id;
    const aging = document.getElementById(`aging${id}`);
    console.log(`data server : ${i} `, doc.aging, "jumlah :", count, "aging : ", aging.textContent);
    aging.textContent = doc.aging;
    i++;
  }

  i = 0;

  // }
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));

const ttst = document.getElementById("tanggal_terima_surat_tolak");
const ddc = document.getElementById("ddc");

const count = document.getElementById("count");

if (ttst != null) {
  ttst.addEventListener("input", function () {
    var tanggalAwal = new Date(ttst.value);
    if (!isNaN(tanggalAwal.getTime())) {
      var tanggal30HariKedepan = new Date(tanggalAwal);
      tanggal30HariKedepan.setDate(tanggalAwal.getDate() + 30);
      ddc.value = new Date(tanggal30HariKedepan);
    } else {
      ddc.value = "";
    }
  });
}

const estimasi = document.querySelectorAll(".estimasi_awal");
estimasi.forEach((item) => {
  item.addEventListener("input", function () {
    let inputValue = this.value;

    // Menghapus semua karakter selain digit
    inputValue = inputValue.replace(/\D/g, "");

    // Mengonversi nilai menjadi angka
    const numericValue = parseInt(inputValue, 10);

    // Format angka sebagai mata uang Rupiah
    const formattedValue = formatRupiah(numericValue);
    // Mengatur nilai input dengan format mata uang Rupiah
    this.value = formattedValue;
  });

  function formatRupiah(angka) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(angka);
  }
});

// PROFILE DROPDOWN
// const status = document.querySelector(".status");
const iconStatus = document.getElementById("status-icon");
const dropdownStatus = document.querySelector(".status-link");



// BULAN





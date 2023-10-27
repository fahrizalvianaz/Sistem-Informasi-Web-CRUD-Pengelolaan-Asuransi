const kodeCabang = {
  "01": "Jakarta",
  "02": "Serang",
  "03": "Bandung",
  "04": "Lampung",
  "05": "Bengkulu",
  "06": "Palembang",
  "07": "Jambi",
  "08": "Surabaya",
  "09": "Semarang",
  10: "Medan",
  11: "Pangkal Pinang",
  12: "Pekanbaru",
  13: "Banjarmasin",
  14: "Makassar",
  15: "Manado",
  16: "Solo",
  17: "Yogyakarta",
  18: "Cirebon",
  19: "Pontianak",
  20: "Denpasar",
  21: "Malang",
  22: "Karawang",
  23: "Bogor",
  24: "Samarinda",
  25: "Batam",
  26: "Pekalongan",
  27: "Tangerang",
  80: "Jkt Agent",
  81: "Jkt Broker",
  82: "Direct",
  83: "Jkt Group",
  84: "Jkt Leasing",
  85: "Jkt Cash Dealer",
};

const noPolis = document.getElementById("nopolis");
const cabang = document.getElementById("branch");

if (noPolis != null) {
  noPolis.addEventListener("input", function (event) {
    let inputValue = this.value;
    const formattedValue = inputValue.replace(/\s/g, "");
    const errorMessage = document.getElementById("error-message1");

    // Menghapus tanda "-" yang sudah ada
    inputValue = inputValue.replace(/-/g, "");

    if (formattedValue.length > 3) {
      inputValue = inputValue.slice(0, 3) + "-" + inputValue.slice(3);
    }
    if (inputValue.length > 6) {
      inputValue = inputValue.slice(0, 6) + "-" + inputValue.slice(6);
    }
    const noPolisValue = noPolis.value;
    const kodeCabangValue = noPolisValue.substring(4, 6);
    const cabangValue = kodeCabang[kodeCabangValue] || "-";
    cabang.value = cabangValue;
    if (inputValue.length > 9) {
      inputValue = inputValue.slice(0, 9) + "-" + inputValue.slice(9);
    }
    if (inputValue.length > 14) {
      inputValue = inputValue.slice(0, 14) + "-" + inputValue.slice(14);
    }
    if (inputValue.length > 23) {
      inputValue = inputValue.slice(0, 23);
    }

    if (inputValue.length > 0 && inputValue.length < 23) {
      errorMessage.textContent = "Nomor polis harus terdiri dari  19 karakter!";
    } else {
      errorMessage.textContent = ""; // Hapus pesan kesalahan jika karakter cukup
    }

    this.value = inputValue;
  });
}

const noKlaim = document.getElementById("noklaim");

if (noKlaim != null) {
  noKlaim.addEventListener("input", function (event) {
    let inputValue = this.value;
    const formattedValue = inputValue.replace(/\s/g, "");
    const errorMessage = document.getElementById("error-message2");

    // Menghapus tanda "-" yang sudah ada
    inputValue = inputValue.replace(/-/g, "");

    if (formattedValue.length > 2) {
      inputValue = inputValue.slice(0, 2) + "-" + inputValue.slice(2);
    }
    if (inputValue.length > 6) {
      inputValue = inputValue.slice(0, 6) + "-" + inputValue.slice(6);
    }
    if (inputValue.length > 11) {
      inputValue = inputValue.slice(0, 11) + "-" + inputValue.slice(11);
    }
    if (inputValue.length > 14) {
      inputValue = inputValue.slice(0, 14) + "-" + inputValue.slice(14);
    }
    if (inputValue.length > 18) {
      inputValue = inputValue.slice(0, 18);
    }

    if (inputValue.length > 0 && inputValue.length < 18) {
      errorMessage.textContent = "Nomor polis harus terdiri dari  14 karakter.";
    } else {
      errorMessage.textContent = ""; // Hapus pesan kesalahan jika karakter cukup
    }

    this.value = inputValue;
  });
}

const tsi = document.getElementById("tsi");
const estimasiAwal = document.getElementById("estimasi_awal");
const reserveAmt = document.getElementById("reserve_amt");
const errorSpan = document.getElementById("error-message3");
const tambah = document.getElementById("tambah");

function inputRupiah(id) {
  id.addEventListener("input", function (event) {
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
}

if (tsi != null || estimasiAwal != null || reserveAmt != null) {
  inputRupiah(tsi);
  inputRupiah(estimasiAwal);
  inputRupiah(reserveAmt);
}

const username = document.getElementById("username");
const password = document.getElementById("password");
const errorPassword = document.getElementById("error-password");
const btn = document.getElementById("btn-sign");

username.addEventListener("input", function () {
  let inputValue = this.value;
  let passValue = password.value;
  if (inputValue.length == 0) {
    btn.classList.add("disabled");
  } else if (inputValue.length < 20 && passValue.length > 8 && passValue.length < 15) {
    btn.classList.remove("disabled");
  } else if (inputValue.length > 20 && passValue.length == 0) {
    btn.classList.add("disabled");
  }
  if (inputValue.length > 20) {
    inputValue = inputValue.slice(0, 20);
  }

  this.value = inputValue;
});
password.addEventListener("input", function () {
  let inputValue = this.value;
  let userValue = username.value;
  if (inputValue.length == 0) {
    btn.classList.add("disabled");
    errorPassword.textContent = "";
  } else if (inputValue.length < 8) {
    btn.classList.add("disabled");
    errorPassword.textContent = "Password minimal 8 karakter, maksimal 15";
  } else if (inputValue.length > 8) {
    btn.classList.remove("disabled");
    errorPassword.textContent = "";
  } else if (inputValue.length > 8 && userValue.length == 0) {
    btn.classList.add("disabled");
    errorPassword.textContent = "";
  }
  if (inputValue.length > 15) {
    inputValue = inputValue.slice(0, 15);
  }

  this.value = inputValue;
});

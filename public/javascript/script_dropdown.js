

// INVESTIGASI DROPDOWN
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
  "10": "Medan",
  "11": "Pangkal Pinang",
  "12": "Pekanbaru",
  "13": "Banjarmasin",
  "14": "Makassar",
  "15": "Manado",
  "16": "Solo",
  "17": "Yogyakarta",
  "18": "Cirebon",
  "19": "Pontianak",
  "20": "Denpasar",
  "21": "Malang",
  "22": "Karawang",
  "23": "Bogor",
  "24": "Samarinda",
  "25": "Batam",
  "26": "Pekalongan",
  "27": "Tangerang",
  "80": "Jkt Agent",
  "81": "Jkt Broker",
  "82": "Direct",
  "83": "Jkt Group",
  "84": "Jkt Leasing",
  "85": "Jkt Cash Dealer",
};
const cabang = document.getElementById("cabang");
const noPolis = document.getElementById("nopolis");

if(cabang != null) {
  const noPolisValue = noPolis.value;
  if (typeof noPolisValue != "undefined") {
    const kodeCabangValue = noPolisValue.substring(4, 6);
    const cabangValue = kodeCabang[kodeCabangValue] || "-";
    cabang.value = cabangValue; 
  }
} 



// PENGATURAN AGING
const tglsebelum = document.getElementById("date");
const aging = document.getElementById("aging");
tglsebelum.addEventListener("input", function () {
  const tglsebelumValue = new Date(tglsebelum.value);
  const tglsekarangValue = new Date();

  const selisihMilidetik = tglsekarangValue - tglsebelumValue;

  // Menghitung selisih dalam detik
  const selisihDetik = selisihMilidetik / 1000;

  // Menghitung selisih dalam menit
  const selisihMenit = selisihDetik / 60;

  // Menghitung selisih dalam jam
  const selisihJam = selisihMenit / 60;

  // Menghitung selisih dalam hari
  const selisihHari = selisihJam / 24;

  aging.value = parseInt(selisihHari);
});



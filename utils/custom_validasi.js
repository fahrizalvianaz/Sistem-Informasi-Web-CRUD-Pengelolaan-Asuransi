document.addEventListener("DOMContentLoaded", function () {
  const nopolisInput = document.getElementById("nopolis");
  const nopolisError = document.getElementById("nopolisError");

  nopolisInput.addEventListener("input", function () {
    if (nopolisInput.value.trim() === "") {
      nopolisError.textContent = "Nomor Polis harus diisi";
    } else {
      nopolisError.textContent = "";
    }
  });

  // Jika ingin menambahkan validasi lain, Anda dapat menambahkannya di sini.

  // Handle pengiriman formulir
  const myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", function (e) {
    if (nopolisInput.value.trim() === "") {
      e.preventDefault(); // Mencegah pengiriman formulir jika tidak valid.
      nopolisError.textContent = "Nomor Polis harus diisi";
    }
  });
});

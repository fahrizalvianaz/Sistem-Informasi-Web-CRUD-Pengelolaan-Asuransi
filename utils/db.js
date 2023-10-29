import mongoose, { mongo } from "mongoose";


mongoose.set("strict", false);

mongoose
  .connect("mongodb+srv://fahrizalshofyanaziz:5bVGkFYXhgViUIO3@cluster0.ezutszz.mongodb.net/rag", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Koneksi MongoDB sukses");
  })
  .catch((err) => {
    console.error("Koneksi MongoDB gagal:", err);
  });

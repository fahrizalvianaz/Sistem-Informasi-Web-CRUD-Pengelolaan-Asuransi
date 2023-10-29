import mongoose, { mongo } from "mongoose";


mongoose.set("strict", false);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Koneksi MongoDB sukses");
  })
  .catch((err) => {
    console.error("Koneksi MongoDB gagal:", err);
  });

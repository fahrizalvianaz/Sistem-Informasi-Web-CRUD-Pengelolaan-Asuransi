import mongoose, { mongo } from "mongoose";
import "dotenv/config";

mongoose.set("strict", false);

// process.env.MONGO_URI
// "mongodb+srv://fahrizalshofyanaziz:5bVGkFYXhgViUIO3@cluster0.ezutszz.mongodb.net/rag"

mongoose
  .connect("mongodb+srv://fahrizalshofyanaziz:5bVGkFYXhgViUIO3@cluster0.ezutszz.mongodb.net/rag", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Koneksi MongoDB sukses");
  })
  .catch((err) => {
    console.error("Koneksi MongoDB gagal:", err);
  });

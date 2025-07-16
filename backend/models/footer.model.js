// footer.model.js
import mongoose from "mongoose";
import { Schema } from "mongoose";

const footerSchema = new Schema(
  {
    nama_sekolah: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    no_telepon: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      required: true,
    },
    youtube: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Footer", footerSchema);
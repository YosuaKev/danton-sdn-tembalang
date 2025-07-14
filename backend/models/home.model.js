// guru.model.js
import mongoose from "mongoose";
import { Schema } from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

// Pass mongoose to plugin
const AutoIncrement = AutoIncrementFactory(mongoose);

const berandaSchema = new Schema(
  {
    header: {
      type: String,
      required: true,
    },
    judul: {
      type: String,
      required: true,
    },
    subjudul: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
    gambar: {
      type: String,
      required: true,
    },
    namajumlah: {
      type: String,
      required: true,
    },
    jumlah: {
      type: Number,
      required: true,
    },
    judulfeature: {
      type: String,
      required: true,
    },
    feature1: {
      type: String,
      required: true,
    },
    deskripsifeature1: {
        type: String,
        required: true,
    },
    feature2: {
      type: String,
      required: true,
    },
    deskripsifeature2: {
        type: String,
        required: true,
    },
    feature3: {
      type: String,
      required: true,
    },
    deskripsifeature3: {
        type: String,
        required: true,
    },
    feature4: {
      type: String,
      required: true,
    },
    deskripsifeature4: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Beranda", berandaSchema);
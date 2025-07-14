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
      
    },
    judul: {
      type: String,
      
    },
    subjudul: {
      type: String,
      
    },
    deskripsi: {
      type: String,
      
    },
    gambar: {
      type: String,
      
    },
    namajumlah: {
      type: String,
      
    },
    jumlah: {
      type: Number,
      
    },
    judulfeature: {
      type: String,
      
    },
    feature1: {
      type: String,
      
    },
    deskripsifeature1: {
        type: String,
        
    },
    feature2: {
      type: String,
      
    },
    deskripsifeature2: {
        type: String,
        
    },
    feature3: {
      type: String,
      
    },
    deskripsifeature3: {
        type: String,
        
    },
    feature4: {
      type: String,
      
    },
    deskripsifeature4: {
        type: String,
        
    },
  },
  { timestamps: true }
);


export default mongoose.model("Beranda", berandaSchema);
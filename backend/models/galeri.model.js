import mongoose from "mongoose";

const galeriSchema = new mongoose.Schema({
  id_galeri: {
    type: Number,
    unique: true,
    required: true
  },
  judul: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  deskripsi: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  gambar1: {
    type: String,
    required: true,
    trim: true
  },
  gambar2: {
    type: String,
    trim: true,
    default: null
  },
  gambar3: {
    type: String,
    trim: true,
    default: null
  },
  gambar4: {
    type: String,
    trim: true,
    default: null
  },
  gambar5: {
    type: String,
    trim: true,
    default: null
  }
}, {
  timestamps: true
});

// Auto-increment id_galeri
galeriSchema.pre('save', async function(next) {
  if (!this.id_galeri) {
    const lastGaleri = await this.constructor.findOne().sort('-id_galeri');
    this.id_galeri = lastGaleri ? lastGaleri.id_galeri + 1 : 1;
  }
  next();
});

export default mongoose.model("Galeri", galeriSchema);  // Changed model name to "Galeri"
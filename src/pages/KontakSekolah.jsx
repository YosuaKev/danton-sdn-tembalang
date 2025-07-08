import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Kontak = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    noTelp: '',
    pesan: ''
  });
  const navigate = useNavigate();
  const handleHome = (e) => {
    e.preventDefault();
    navigate('/');
    }
  const handleProfil = (e) => {
    e.preventDefault();
    navigate('/profil')
    }
  const handleKontak = (e) => {
    e.preventDefault();
    navigate('/kontak');
    }
    const handleGuru = (e) => {
    e.preventDefault();
    navigate('/guru')
    }
    const handlePrestasi = (e) => {
    e.preventDefault();
    navigate('/prestasi')
    }
    const handleBerita = (e) => {
    e.preventDefault();
    navigate('/berita')
    }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Pesan berhasil dikirim!');
    setFormData({
      nama: '',
      email: '',
      noTelp: '',
      pesan: ''
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-xs font-bold">SDN</span>
              </div>
              <span className="text-sm font-medium">SDN NGAWI</span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-6">
              <button href="#" onClick={handleHome} className="text-white hover:text-blue-200 transition-colors duration-200">Home</button>
              <button href="#" onClick={handleProfil} className="text-white hover:text-blue-200 transition-colors duration-200">Profil</button>
              <button href="#" onClick={handleGuru} className="text-white hover:text-blue-200 transition-colors duration-200">Guru</button>
              <button href="#" onClick={handleBerita} className="text-white hover:text-blue-200 transition-colors duration-200">Berita</button>
              <button href="#" onClick={handlePrestasi} className="text-white hover:text-blue-200 transition-colors duration-200">Prestasi</button>
              <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 border-b-2 border-blue-400">Kontak</a>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80)'
          }}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kontak Kami</h1>
          <p className="text-lg md:text-xl">Jika Memiliki Pertanyaan Bisa Langsung Isi Form Dibawah Ini!</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama */}
                <div>
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    placeholder="Mikana Ackerman"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email@gmail.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors duration-200"
                  />
                </div>
              </div>

              {/* No Telp */}
              <div>
                <label htmlFor="noTelp" className="block text-sm font-medium text-gray-700 mb-2">
                  No Telp
                </label>
                <input
                  type="number"
                  id="noTelp"
                  name="noTelp"
                  value={formData.noTelp}
                  onChange={handleInputChange}
                  placeholder="08123456789"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors duration-200"
                />
              </div>

              {/* Pesan */}
              <div>
                <label htmlFor="pesan" className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleInputChange}
                  placeholder="Tulis pesan Anda di sini..."
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors duration-200 resize-vertical"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Kirim Pesan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            Lokasi Sekolah
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://maps.google.com/maps?width=600&height=400&hl=en&q=SD%20Negeri%20Tembalang&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                width="800%"
                height="600"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96"
                title="Lokasi SDN TEMBALANG"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Contact Info */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">SDN</span>
                </div>
                <span className="font-medium">SDN TEMBALANG</span>
              </div>
              <div className="space-y-2 text-sm">
                <p>Jl. Jawaipno No 122, Tembalang, Semarang</p>
                <p>Jawa Tengah 43351, Indonesia</p>
                <p>(024)6708666</p>
                <p>inpakan@smp1.sch.ac.id</p>
              </div>
            </div>

            {/* Jelajah */}
            <div>
              <h3 className="font-semibold mb-4">Jelajah</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-200 transition-colors">Sambutan</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Profil Sekolah</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Berita</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Galeri</a></li>
              </ul>
            </div>

            {/* Halaman Umum */}
            <div>
              <h3 className="font-semibold mb-4">Halaman Umum</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-200 transition-colors">Data Guru</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">PPDB SDN</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Panduan PPDB</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Lokasi</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Kontak</a></li>
              </ul>
            </div>

            {/* Media Sosial */}
            <div>
              <h3 className="font-semibold mb-4">Media Sosial</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-xs">f</span>
                  </div>
                  <span>Facebook</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center">
                    <span className="text-xs">t</span>
                  </div>
                  <span>Twitter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-pink-600 rounded flex items-center justify-center">
                    <span className="text-xs">i</span>
                  </div>
                  <span>Instagram</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 SDN TEMBALANG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Kontak;
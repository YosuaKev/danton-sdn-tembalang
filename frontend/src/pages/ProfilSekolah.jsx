import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { X, Menu } from 'lucide-react';

const ProfilSekolah = () => {
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState({
    deskripsi: "",
    gambar: "",
    visi: "",
    misi: [],
    tujuan: [],
    strategi: "",
    map: ""
  });
  const [loading, setLoading] = useState(true);

  // Navigation handlers
  const handleHome = (e) => {
    e.preventDefault();
    navigate('/');
  }
  const handleKontak = (e) => {
    e.preventDefault();
    navigate('/kontak');
  }
  const handleGuru = (e) => {
    e.preventDefault();
    navigate('/guru');
  }
  const handlePrestasi = (e) => {
    e.preventDefault();
    window.open('https://sangjuara.semarangkota.go.id/', '_blank');
  }
  const handleBerita = (e) => {
    e.preventDefault();
    navigate('/berita');
  }
  const handleAkademik = (e) => {
    e.preventDefault();
    navigate('/akademik');
  }

  // Fetch school profile data
  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profil");
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        
        setSchoolData({
          deskripsi: data.deskripsi || "",
          gambar: data.gambar || "",
          visi: data.visi || "",
          misi: data.misi || [""],
          tujuan: data.tujuan || [""],
          strategi: data.strategi || "",
          map: data.map || ""
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfil();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat data profil sekolah...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded mr-3"></div>
              <span className="font-semibold text-lg">SDN TEMBALANG</span>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-6">
              <button onClick={handleHome} className="hover:text-blue-200 transition-colors duration-200">Beranda</button>
              <button className="hover:text-blue-200 transition-colors duration-200 border-b-2 border-blue-400">Profil</button>
              <button onClick={handleGuru} className="hover:text-blue-200 transition-colors duration-200">Guru</button>
              <button onClick={handleBerita} className="hover:text-blue-200 transition-colors duration-200">Berita</button>
              <button onClick={handlePrestasi} className="hover:text-blue-200 transition-colors duration-200">Prestasi</button>
              <button onClick={handleAkademik} className="hover:text-blue-200 transition-colors duration-200">Akademik</button>
              <button onClick={handleKontak} className="hover:text-blue-200 transition-colors duration-200">Kontak</button>
            </nav>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Gambar Sekolah */}
          <div>
            <img
              src={schoolData.gambar}
              alt="Gambar Sekolah"
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>

          {/* Deskripsi Sekolah */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-3xl font-bold text-blue-900">Profil</h2>
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {schoolData.deskripsi}
            </p>
          </div>
        </div>
      </div>
    </section>


      {/* Hero Section - Visi dan Misi */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-900 mb-12">
            Visi dan Misi SDN TEMBALANG
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Visi Column */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Visi</h2>
              <p className="text-gray-700 text-lg leading-relaxed text-center">
                {schoolData.visi}
              </p>
            </div>
            
            {/* Misi Column */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Misi</h2>
              <ul className="text-gray-700 text-lg leading-relaxed space-y-4">
                {schoolData.misi.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tujuan Sekolah Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-blue-900 text-white py-4 px-6 rounded-t-lg">
              <h2 className="text-2xl font-bold text-center">
                Tujuan Sekolah
              </h2>
            </div>
            
            <div className="bg-white p-8 rounded-b-lg shadow-md border border-gray-200">
              <ol className="space-y-6 text-gray-700 text-lg leading-relaxed">
                {schoolData.tujuan.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Strategi Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-blue-900 text-white py-4 px-6 rounded-t-lg">
              <h2 className="text-2xl font-bold text-center">STRATEGI</h2>
            </div>
            
            <div className="bg-white p-8 rounded-b-lg shadow-md border border-gray-200">
              <p className="text-gray-700 text-lg leading-relaxed text-center italic">
                "{schoolData.strategi}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-5 text-gray-800">
            Lokasi Sekolah
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={schoolData.map}
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
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and Contact Info */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded mr-3"></div>
                <span className="font-semibold text-lg">SDN TEMBALANG</span>
              </div>
              <div className="space-y-2 text-blue-200">
                <p>Jl. Jawaipno No 122, Tembalang, Semarang</p>
                <p>Jawa Tengah 43351, Indonesia</p>
                <p>(024)6708666</p>
                <p>sdn_tembalang@example.com</p>
              </div>
            </div>
            
            {/* Jelajah */}
            <div>
              <h3 className="text-xl font-bold mb-6">Jelajah</h3>
              <ul className="space-y-2 text-blue-200">
                <li><button className="hover:text-white transition-colors duration-200">Sambutan</button></li>
                <li><button className="hover:text-white transition-colors duration-200">Profil Sekolah</button></li>
                <li><button onClick={handleBerita} className="hover:text-white transition-colors duration-200">Berita</button></li>
                <li><button className="hover:text-white transition-colors duration-200">Galeri</button></li>
              </ul>
            </div>
            
            {/* Halaman Umum */}
            <div>
              <h3 className="text-xl font-bold mb-6">Halaman Umum</h3>
              <ul className="space-y-2 text-blue-200">
                <li><button onClick={handleGuru} className="hover:text-white transition-colors duration-200">Data Guru</button></li>
                <li><a href="https://spmb.semarangkota.go.id/sd" className="hover:text-white transition-colors duration-200">SPMB SDN</a></li>
                <li><a href="https://spmb.semarangkota.go.id/assets/content_upload/panduan/Panduan%20Pendaftaran%20SD%202025.pdf" className="hover:text-white transition-colors duration-200">Panduan SPMB</a></li>
                <li><a href="https://maps.app.goo.gl/ZoFMEgttrNr5Ak6g6" className="hover:text-white transition-colors duration-200">Lokasi</a></li>
                <li><button onClick={handleKontak} className="hover:text-white transition-colors duration-200">Kontak</button></li>
              </ul>
            </div>
            
            {/* Media Sosial */}
            <div>
              <h3 className="text-xl font-bold mb-6">Media Sosial</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <span className="text-blue-200">Facebook</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <span className="text-blue-200">Twitter</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <span className="text-blue-200">Instagram</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 SDN TEMBALANG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilSekolah;
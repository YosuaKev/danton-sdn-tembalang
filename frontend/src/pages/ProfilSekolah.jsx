import React from 'react';
import { useNavigate } from "react-router-dom";


const Profil = () => {
    const navigate = useNavigate();
    const handleHome = (e) => {
    e.preventDefault();
    navigate('/')
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
              <button href="#" onClick={handleHome} className="hover:text-blue-200 transition-colors duration-200">Beranda</button>
              <a href="#" className="hover:text-blue-200 transition-colors duration-200 border-b-2 border-blue-400">Profil</a>
              <button href="#" onClick={handleGuru} className="hover:text-blue-200 transition-colors duration-200">Guru</button>
              <button href="#" onClick={handleBerita} className="hover:text-blue-200 transition-colors duration-200">Berita</button>
              <button href="#" onClick={handlePrestasi} className="hover:text-blue-200 transition-colors duration-200">Prestasi</button>
              <button href="#" onClick={handleKontak} className="hover:text-blue-200 transition-colors duration-200">Kontak</button>
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
                Membentuk pembelajar yang akhlakul karimah, berilmu, beretika berwawasan lingkungan untuk menuju pentas dunia.
              </p>
            </div>
            
            {/* Misi Column */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Misi</h2>
              <ul className="text-gray-700 text-lg leading-relaxed space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Mewujudkan pendidikan dengan keteladanan
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Mengembangkan budaya belajar dengan didasari pada kecintaan terhadap ilmu pengetahuan
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  Meningkatkan fasilitas sekolah menuju sekolah bersih, sehat dan berwawasan lingkungan
                </li>
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
                Tujuan Sekolah Pada Tahun 2017 Diharapkan:
              </h2>
            </div>
            
            <div className="bg-white p-8 rounded-b-lg shadow-md border border-gray-200">
              <ol className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">1</span>
                  <span>100% Seluruh Guru/Staf memberikan pelayanan, keteladanan kepada para pengguna jasa dengan pendekatan agama, etika, dan budaya</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">2</span>
                  <span>100% Siswa melakukan syariat agama, etika dan budaya baik di Sekolah maupun diluar</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">3</span>
                  <span>90% fasilitas sekolah mendukug Standar Nasional Pendidikan (SNP)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">4</span>
                  <span>80% Siswa berprestasi baik ditingkat regional, nasional maupun Global</span>
                </li>
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
                "Tiada kekayaan yang paling utama daripada kekayaan jiwa, tiada kegagalan yang paling menyedihkan daripada kebodohan, dan tiada wawasan yang paling baik daripada pendidikan."
              </p>
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
                <p>inpakan@smp1.sch.ac.id</p>
              </div>
            </div>
            
            {/* Jelajah */}
            <div>
              <h3 className="text-xl font-bold mb-6">Jelajah</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Sambutan</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Profil Sekolah</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Berita</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Galeri</a></li>
              </ul>
            </div>
            
            {/* Halaman Umum */}
            <div>
              <h3 className="text-xl font-bold mb-6">Halaman Umum</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Data Guru</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">PPDB SDN</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Panduan PPDB</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Lokasi</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Kontak</a></li>
              </ul>
            </div>
            
            {/* Media Sosial */}
            <div>
              <h3 className="text-xl font-bold mb-6">Media Sosial</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <span className="text-blue-200">Facebook Icon</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <span className="text-blue-200">Twitter Icon</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <span className="text-blue-200">Instagram Icon</span>
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

export default Profil;
import React from 'react';
import { useNavigate } from "react-router-dom";


const Berita = () => {
    const navigate = useNavigate();
    const handleHome = (e) => {
    e.preventDefault();
    navigate('/')
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
    const handleAkademik = (e) => {
    e.preventDefault();
    navigate('/akademik')
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
              <span className="font-semibold text-lg">SDN NGAWI</span>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-6">
              <button href="#" onClick={handleHome} className="hover:text-blue-200 transition-colors duration-200">Beranda</button>
              <button href="#" onClick={handleProfil} className="hover:text-blue-200 transition-colors duration-200">Profil</button>
              <button href="#" onClick={handleGuru} className="hover:text-blue-200 transition-colors duration-200">Guru</button>
              <a href="#" className="hover:text-blue-200 transition-colors duration-200 border-b-2 border-blue-400">Berita</a>
              <button href="#" onClick={handlePrestasi} className="hover:text-blue-200 transition-colors duration-200">Prestasi</button>
              <button href="#" onClick={handleKontak}className="hover:text-blue-200 transition-colors duration-200">Kontak</button>
              <button href="#" onClick={handleAkademik} className="hover:text-blue-200 transition-colors duration-200">Akademik</button>
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

      {/* Hero Banner */}
      <section className="relative bg-gray-800 py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/600?random=1')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Berita
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        
        {/* Berita Baru Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Berita Baru</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
              Lihat semua
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Article Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <img 
                src="https://picsum.photos/400/250?random=2" 
                alt="Kegiatan Belajar Mengajar" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Kegiatan Belajar Mengajar di Rumah 2020
                </h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Read More...
                </a>
              </div>
            </div>

            {/* Article Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <img 
                src="https://picsum.photos/400/250?random=3" 
                alt="Kegiatan Belajar Mengajar" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Kegiatan Belajar Mengajar di Rumah 2020
                </h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Read More...
                </a>
              </div>
            </div>

            {/* Article Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <img 
                src="https://picsum.photos/400/250?random=4" 
                alt="Kegiatan Belajar Mengajar" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Kegiatan Belajar Mengajar di Rumah 2020
                </h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Read More...
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400?random=5" 
                  alt="Kegiatan Belajar Mengajar dirumah" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  Kegiatan Belajar Mengajar dirumah
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-block w-fit">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* More Article Cards Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Article Card 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <img 
                src="https://picsum.photos/400/250?random=6" 
                alt="Kegiatan Belajar Mengajar" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Kegiatan Belajar Mengajar di Rumah 2020
                </h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Read More...
                </a>
              </div>
            </div>

            {/* Article Card 5 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <img 
                src="https://picsum.photos/400/250?random=7" 
                alt="Kegiatan Belajar Mengajar" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Kegiatan Belajar Mengajar di Rumah 2020
                </h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Read More...
                </a>
              </div>
            </div>

            {/* Article Card 6 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <img 
                src="https://picsum.photos/400/250?random=8" 
                alt="Kegiatan Belajar Mengajar" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Kegiatan Belajar Mengajar di Rumah 2020
                </h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Read More...
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Single Article Card Section */}
        <section className="mb-16">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <img 
                src="https://picsum.photos/400/250?random=9" 
                alt="Kegiatan Pembelajaran daring" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Kegiatan Pembelajaran daring
                </h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Read More...
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Post Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Recent Post</h2>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="bg-gray-200 text-blue-600 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200">
              Mendidik karakter di masa kini & masa depan
            </a>
            <a href="#" className="bg-gray-200 text-blue-600 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200">
              Belajar mengajar di rumah
            </a>
            <a href="#" className="bg-gray-200 text-blue-600 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200">
              Kegiatan Belajar mengajar di rumah 2020
            </a>
            <a href="#" className="bg-gray-200 text-blue-600 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200">
              Kegiatan Belajar mengajar di rumah & rumah 2021
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and Contact Info */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded mr-3"></div>
                <span className="font-semibold text-lg">SDN NGAWI</span>
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
            <p>&copy; 2024 SDN NGAWI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Berita;
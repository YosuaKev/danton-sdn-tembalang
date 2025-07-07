import React from 'react';
import { useNavigate } from "react-router-dom";

const Prestasi = () => {
    const navigate = useNavigate();
    const handleHome = (e) => {
    e.preventDefault();
    navigate('/')
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
              <a href="#" onClick={handleHome} className="hover:text-blue-200 transition-colors duration-200">Beranda</a>
              <a href="#" className="hover:text-blue-200 transition-colors duration-200">Profil</a>
              <a href="#" className="hover:text-blue-200 transition-colors duration-200">Guru</a>
              <a href="#" className="hover:text-blue-200 transition-colors duration-200">Berita</a>
              <a href="#" className="hover:text-blue-200 transition-colors duration-200 border-b-2 border-blue-400">Prestasi</a>
              <a href="#" className="hover:text-blue-200 transition-colors duration-200">Kontak</a>
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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Prestasi SDN NGAWI
          </h1>
          <p className="text-xl md:text-2xl text-white opacity-90">
            Prestasi Murid - Murid SDN NGAWI
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        
        {/* Achievements Grid Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Achievement Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400?random=10" 
                  alt="Juara MHQ tingkat Provinsi dan Nasional" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-blue-900 py-4 px-6">
                  <h3 className="text-white text-lg font-semibold text-center">
                    Juara MHQ tingkat Provinsi dan Nasional
                  </h3>
                </div>
              </div>
            </div>

            {/* Achievement Card 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400?random=11" 
                  alt="Juara umum lomba ketangkasan pramuka se Kab. Sukabumi" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-blue-900 py-4 px-6">
                  <h3 className="text-white text-lg font-semibold text-center">
                    Juara umum lomba ketangkasan pramuka se Kab. Sukabumi
                  </h3>
                </div>
              </div>
            </div>

            {/* Achievement Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400?random=12" 
                  alt="Juara umum bulu tangkis putra & putri se Kab. Sukabumi" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-blue-900 py-4 px-6">
                  <h3 className="text-white text-lg font-semibold text-center">
                    Juara umum bulu tangkis putra & putri se Kab. Sukabumi
                  </h3>
                </div>
              </div>
            </div>

            {/* Achievement Card 4 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400?random=13" 
                  alt="Juara lomba karya ilmiah remaja tingkat nasional" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-blue-900 py-4 px-6">
                  <h3 className="text-white text-lg font-semibold text-center">
                    Juara lomba karya ilmiah remaja tingkat nasional
                  </h3>
                </div>
              </div>
            </div>

            {/* Achievement Card 5 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400?random=14" 
                  alt="Juara festival seni budaya daerah" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-blue-900 py-4 px-6">
                  <h3 className="text-white text-lg font-semibold text-center">
                    Juara festival seni budaya daerah
                  </h3>
                </div>
              </div>
            </div>

            {/* Achievement Card 6 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div className="relative">
                <img 
                  src="https://picsum.photos/600/400?random=15" 
                  alt="Juara olimpiade matematika tingkat kabupaten" 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-blue-900 py-4 px-6">
                  <h3 className="text-white text-lg font-semibold text-center">
                    Juara olimpiade matematika tingkat kabupaten
                  </h3>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Load More Button */}
        <section className="text-center mb-16">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
            Lebih Lanjut
          </button>
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

export default Prestasi;
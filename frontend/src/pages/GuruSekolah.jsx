import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const DataGuruPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const handleHome = (e) => {
    e.preventDefault();
    navigate('/');
    }
    const handleProfil =(e) => {
    e.preventDefault ();
    navigate('/profil');
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
    window.open('https://sangjuara.semarangkota.go.id/', '_blank');
    }
    const handleBerita = (e) => {
    e.preventDefault();
    navigate('/berita')
    }
    const handleAkademik = (e) => {
    e.preventDefault();
    navigate('/akademik')
    }
  const teachers = [
    {
      id: 1,
      name: "HJ. ENIS HERMINAWATI, S.Pd",
      nip: "196805171985032008",
      subject: "Ilmu Pengetahuan Sosial",
      image: "https://images.unsplash.com/photo-1494790108755-2616c273e33b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 2,
      name: "DODI SANTOSO, S.Pd",
      nip: "197203152006041009",
      subject: "Matematika",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 3,
      name: "SRI WAHYUNI, S.Pd",
      nip: "198012101998032005",
      subject: "Bahasa Indonesia",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 4,
      name: "H. BUDI PRASETYO, S.Pd",
      nip: "196509151989031007",
      subject: "Pendidikan Jasmani",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 5,
      name: "SITI NURHALIZA, S.Pd",
      nip: "198506232009042011",
      subject: "Ilmu Pengetahuan Alam",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 6,
      name: "AHMAD RIZKI, S.Pd",
      nip: "199001152015041003",
      subject: "Bahasa Inggris",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 7,
      name: "DEWI LESTARI, S.Pd",
      nip: "198307182010012014",
      subject: "Seni Budaya",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 8,
      name: "MUHAMMAD FAJAR, S.Pd",
      nip: "199205102019031008",
      subject: "Pendidikan Kewarganegaraan",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 9,
      name: "RATNA SARI, S.Pd",
      nip: "197904252008012015",
      subject: "Bimbingan Konseling",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    }
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const totalPages = 3;

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
              <button href="#" onClick={handleHome} className="text-white hover:text-blue-200 transition-colors duration-200">Beranda</button>
              <button href="#" onClick={handleProfil} className="text-white hover:text-blue-200 transition-colors duration-200">Profil</button>
              <a href="#" className="text-white hover:text-blue-200 transition-colors duration-200 border-b-2 border-blue-400">Guru</a>
              <button href="#" onClick={handleBerita} className="text-white hover:text-blue-200 transition-colors duration-200">Berita</button>
              <button href="#" onClick={handlePrestasi} className="text-white hover:text-blue-200 transition-colors duration-200">Prestasi</button>
              <button href="#" onClick={handleAkademik} className="hover:text-blue-200 transition-colors duration-200">Akademik</button>
              <button href="#" onClick={handleKontak} className="text-white hover:text-blue-200 transition-colors duration-200">Kontak</button>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Data Guru</h1>
          <p className="text-lg md:text-xl">Data Guru - Guru Guru SDN TEMBALANG</p>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-lg">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Search Teacher..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors duration-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Data Grid Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeachers.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
                <div className="text-center mb-4">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-100"
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-bold text-lg text-gray-800 leading-tight">
                    {teacher.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    NIP: {teacher.nip}
                  </p>
                  <p className="text-blue-600 font-medium">
                    {teacher.subject}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTeachers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Tidak ada guru yang ditemukan.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pagination Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-3">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-full transition-colors duration-200 ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
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
                <span className="font-medium">SDN NGAWI</span>
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
              <h3 className="text-xl font-bold mb-6">Halaman Umum</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" onClick={handleGuru} className="hover:text-white transition-colors duration-200">Data Guru</a></li>
                <li><a href="https://spmb.semarangkota.go.id/sd" className="hover:text-white transition-colors duration-200">SPMB SDN</a></li>
                <li><a href="https://spmb.semarangkota.go.id/assets/content_upload/panduan/Panduan%20Pendaftaran%20SD%202025.pdf" className="hover:text-white transition-colors duration-200">Panduan SPMB</a></li>
                <li><a href="https://maps.app.goo.gl/ZoFMEgttrNr5Ak6g6" className="hover:text-white transition-colors duration-200">Lokasi</a></li>
                <li><a href="#" onClick={handleKontak} className="hover:text-white transition-colors duration-200">Kontak</a></li>
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
            <p>&copy; 2024 SDN NGAWI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DataGuruPage;
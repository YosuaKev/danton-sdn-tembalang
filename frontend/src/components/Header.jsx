import React from "react";
import { useState } from "react";
import { X, Menu } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
   const handleNavigation = (e, item) => {
    e.preventDefault();
    switch(item) {
    case 'Prestasi':
      window.open('https://sangjuara.semarangkota.go.id/', '_blank');
      break;
    case 'Beranda':
      navigate('/');
      break;
    case 'Profil':
      navigate('/profil');
      break;
    case 'Guru':
      navigate('/guru');
      break;
    case 'Berita':
      navigate('/berita');
      break;
    case 'Kontak':
      navigate('/kontak');
      break;
    case 'Akademik':
      navigate('/akademik');
      break;
    default:
      navigate('/');
  }
  };
    
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-blue-600">SD Negeri Tembalang</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Beranda', 'Profil', 'Guru', 'Prestasi', 'Berita', 'Akademik', 'Kontak'].map((item) => (
                <button
          key={item}
          onClick={(e) => handleNavigation(e, item)}
          className="text-gray-700 hover:text-blue-600 transition-colors "
        >
          {item}
        </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden overflow-hidden transition-all duration-300 ease-in-out transform origin-top $ {isMenuOpen ? 'max-h-screen opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0'}">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {[
                {label: 'Beranda', href: '/beranda'}, 
                {label:'Profil', href: '/profil'}, 
                {label:'Guru', href: '/guru'}, 
                {label:'Prestasi', href: 'https://sangjuara.semarangkota.go.id/'}, 
                {label:'Berita', href: '/berita'}, 
                {label:'Akademik', href: '/akademik'},
                {label:'Kontak', href: '/kontak'}, 
              ].map((item) => (
                <a key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;;
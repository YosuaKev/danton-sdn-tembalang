import React from "react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-blue-600">SMK Negeri Makassar</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Profil', 'Jurusan', 'Guru', 'Prestasi', 'Berita', 'Alumni', 'Kontak'].map((item) => (
              <a key={item} href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                {item}
              </a>
            ))}
          </nav>

          {/* Login Button */}
          <div className="hidden md:flex">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Masuk
            </button>
          </div>

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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {['Home', 'Profil', 'Jurusan', 'Guru', 'Prestasi', 'Berita', 'Alumni', 'Kontak'].map((item) => (
                <a key={item} href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  {item}
                </a>
              ))}
              <button className="w-full mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Masuk
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;;
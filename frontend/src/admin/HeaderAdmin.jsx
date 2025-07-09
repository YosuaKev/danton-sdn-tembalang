import React from "react";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeaderAdmin = () => {
  const navigate = useNavigate();
  const handleNavigation = (e, item) => {
    e.preventDefault();
    if (item === "Profil") {
      navigate("/profil"); // <- ke /profil, bukan /profile
    } else if (item === "Beranda") {
      navigate("/");
    } else if (item === "BeritaAdmin") {
      navigate("/berita");
    } else if (item === "Prestasi") {
      navigate("/prestasi");
    } else if (item === "Guru") {
      navigate("/guru");
    }
    else if (item === "Saran") {
      navigate("/saran");
    }
    else if (item === "Akademik") {
      navigate("/akademik");
    }
    else {
      navigate(`/${item.toLowerCase()}`);
    }
  };
  const handleKontak = (e) => {
    e.preventDefault();
    navigate("/kontak");
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded mr-3"></div>
            <span className="font-bold text-xl text-gray-900">SDN NGAWI</span>
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              Admin
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              "Beranda",
              "Profil",
              "Guru",
              "Prestasi",
              "Berita",
              "Kontak",
              "Akademik",
            ].map((item) => (
              <button
                key={item}
                onClick={(e) => handleNavigation(e, item)}
                className="text-gray-700 hover:text-blue-600 transition-colors "
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Kontak Button */}
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
              {[
                "Beranda",
                "Profil",
                "Guru",
                "Prestasi",
                "Berita",
                "Kontak",
                "Akademik",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
        {/* Profile/Logout */}
        <div className="relative">
          <button className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="hidden md:block text-sm font-medium">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
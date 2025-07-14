import React from "react";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleNavigation = (e, item) => {
    e.preventDefault();
    if (item === "Profil") {
      navigate("/profil"); // <- ke /profil, bukan /profile
    } else if (item === "Beranda") {
      navigate("/");
    } else if (item === "Berita") {
      navigate("/berita");
    } else if (item === "Prestasi") {
      navigate("/prestasi");
    } else if (item === "Guru") navigate("/guru");
    else if (item === "Saran") navigate("/saran");
    else if (item === "Akademik") navigate("/akademik");
    else {
      navigate(`/${item.toLowerCase()}`);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [header, setHeader] = useState('SD Negeri Tembalang');
  const [isEditing, setIsEditing] = useState(false);
  const [tempHeader, setTempHeader] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/home');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch header');
        }
        
        if (data.header) {
          setHeader(data.header);
        }
      } catch (error) {
        console.error('Error fetching header:', error);
        setError('Gagal memuat header');
      }
    };
    
    fetchHeader();
  }, []);

  const handleEditClick = () => {
    setTempHeader(header);
    setIsEditing(true);
    setMessage('');
    setError('');
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/home', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ header: tempHeader }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (data.errors) {
          const errorMessages = data.errors.map(error => error.msg).join('\n');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || 'Gagal memperbarui header');
      }

      // Success case
      setHeader(data.header);
      setMessage('Header berhasil diperbarui!');
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing) {
    return (
      <div className="mb-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={tempHeader}
            onChange={(e) => setTempHeader(e.target.value)}
            className="text-xl font-bold text-blue-600 border border-gray-300 p-1 rounded"
            maxLength={100}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button
            type="button"
            onClick={handleCancelClick}
            className="bg-gray-500 text-white px-3 py-1 rounded"
            disabled={isSubmitting}
          >
            Batal
          </button>
        </form>
        {message && <p className="text-green-600 mt-1 text-sm">{message}</p>}
        {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
      </div>
    );
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-blue-600">{header}</h1>
            <button
              onClick={handleEditClick}
              className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              Edit
            </button>
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
          <div className="md:hidden overflow-hidden transition-all duration-300 ease-in-out transform origin-top $ {isMenuOpen ? 'max-h-screen opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0'}">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {[
                { label: "Beranda", href: "/beranda" },
                { label: "Profil", href: "/profil" },
                { label: "Guru", href: "/guru" },
                { label: "Prestasi", href: "/prestasi" },
                { label: "Berita", href: "/berita" },
                { label: "Kontak", href: "/kontak" },
                { label: "Akademik", href: "/akademik" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  {item.label}
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

export default Header;

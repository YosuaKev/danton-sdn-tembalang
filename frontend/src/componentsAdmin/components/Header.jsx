import React from "react";
import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [header, setHeader] = useState('SD Negeri Tembalang');
  const [isEditing, setIsEditing] = useState(false);
  const [tempHeader, setTempHeader] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Navigation handler
  const handleNavigation = (e, item) => {
    e.preventDefault();
  };

  // Fetch header data
  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/home');
        if (!response.ok) throw new Error('Failed to fetch header');
        const data = await response.json();
        setHeader(data.header || 'SD Negeri Tembalang');
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load header');
      }
    };
    fetchHeader();
  }, []);

  // Edit handlers
  const handleEditClick = () => {
    setTempHeader(header);
    setIsEditing(true);
    setMessage('');
    setError('');
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // First get the current document to preserve other fields
      const currentData = await fetch('http://localhost:5000/api/home').then(res => res.json());
      
      const response = await fetch('http://localhost:5000/api/home', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...currentData,
          header: tempHeader
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.msg || 'Failed to update header');
      }

      const data = await response.json();
      setHeader(data.header);
      setMessage('Header updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit mode UI
  if (isEditing) {
    return (
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={tempHeader}
          onChange={(e) => setTempHeader(e.target.value)}
          className="text-xl font-bold text-blue-600 border border-gray-300 p-1 rounded"
          maxLength={100}
          required
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={handleCancelClick}
          disabled={isSubmitting}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Cancel
        </button>
        {message && <span className="text-green-600 ml-2">{message}</span>}
        {error && <span className="text-red-600 ml-2">{error}</span>}
      </div>
    );
  }

  // Main header UI
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Header */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-blue-600">{header}</h1>
            {localStorage.getItem('token') && (
              <button
                onClick={handleEditClick}
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
              >
                Edit
              </button>
            )}
            {error && <span className="text-red-600 ml-2">{error}</span>}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              "Beranda",
              "Profil",
              "Guru",
              "Siswa",
              "Prestasi",
              "Berita",
              "Akademik",
            ].map((item) => (
              <button
                key={item}
                onClick={(e) => handleNavigation(e, item)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          <button className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="hidden md:block text-sm font-medium">
              Admin
            </span>
          </button>

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
          <div className="md:hidden overflow-hidden transition-all duration-300 ease-in-out transform origin-top">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {[
                "Beranda",
                "Profil",
                "Guru",
                "Siswa",
                "Prestasi",
                "Berita",
                "Akademik",
              ].map((item) => (
                <button
                  key={item}
                  onClick={(e) => {
                    handleNavigation(e, item);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
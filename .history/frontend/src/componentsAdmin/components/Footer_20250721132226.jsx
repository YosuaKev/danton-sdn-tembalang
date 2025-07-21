import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [footerData, setFooterData] = useState({
    logo: "",
    nama_sekolah: "SD Negeri Tembalang",
    alamat: "Jl. Jawaipno No 122, Tembalang, Semarang",
    no_telepon: "(024)6708666",
    email: "inpakan@smp1.sch.ac.id",
    facebook: "https://www.facebook.com/sdn.tembalang",
    youtube: "",
    instagram: "https://www.instagram.com/sdn_tembalang"
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/footer');
        if (!response.ok) throw new Error('Failed to fetch footer data');
        const data = await response.json();
        setFooterData(prev => ({
          ...prev,
          ...data,
          logo: data.logo || "",

          facebook: data.facebook || "",
          instagram: data.instagram || "",
          youtube: data.youtube || ""
        }));
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFooterData();
  }, []);

   useEffect(() => {
    setTempData({...footerData});
  }, [footerData]);

  const handleEditClick = () => {
    setTempData(footerData);
    setIsEditing(true);
    setMessage("");
    setError("");
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    
    try {
      const response = await fetch('http://localhost:5000/api/footer', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(tempData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.msg || 'Failed to update footer');
      }

      const data = await response.json();
      setFooterData(data);
      setMessage('Footer updated successfully!');
      setTimeout(() => setIsEditing(false), 1500);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  

  const renderEditForm = () => (
      <div className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Edit Footer</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">School Name</label>
                <input
                  type="text"
                  name="nama_sekolah"
                  value={tempData.nama_sekolah || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded text-white"
                />
              </div>
              
              <div>
                <label className="block mb-2">Logo URL</label>
                <input
                  type="text"
                  name="logo"
                  value={tempData.logo || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded text-gray-800"
                  placeholder="https://example.com/logo.png"
                />
                {tempData.logo && (
                  <div className="mt-2">
                    <img src={tempData.logo} alt="Logo Preview" className="h-12 object-contain" />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block mb-2">Address</label>
                <input
                  type="text"
                  name="alamat"
                  value={tempData.alamat || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded text-gray-800"
                />
              </div>
              
              <div>
                <label className="block mb-2">Phone Number</label>
                <input
                  type="text"
                  name="no_telepon"
                  value={tempData.no_telepon || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded text-gray-800"
                />
              </div>
              
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={tempData.email || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded text-gray-800"
                />
              </div>
              
              <div>
                <label className="block mb-2">Facebook URL</label>
                <input
                  type="url"
                  name="facebook"
                  value={tempData.facebook || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded text-gray-800"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              
              <div>
                <label className="block mb-2">Instagram URL</label>
                <input
                  type="url"
                  name="instagram"
                  value={tempData.instagram || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded text-gray-800"
                  placeholder="https://instagram.com/yourpage"
                />
              </div>
              
              <div>
                <label className="block mb-2">YouTube URL</label>
                <input
                  type="url"
                  name="youtube"
                  value={tempData.youtube || ''}
                  onChange={handleChange}
                  className="w-full p-2 rounded text-gray-800"
                  placeholder="https://youtube.com/yourchannel"
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancelClick}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
            
            {message && <p className="text-green-300 mt-4">{message}</p>}
            {error && <p className="text-red-300 mt-4">{error}</p>}
          </form>
        </div>
      </div>
    );
  

  

  const handleKontak = (e) => {
    e.preventDefault();
    navigate('/kontak');
  };

  const handleGuru = (e) => {
    e.preventDefault();
    navigate('/guru');
  };

  if (loading) {
    return <div className="bg-blue-900 text-white py-12 text-center">Loading footer...</div>;
  }

  const renderFooterContent = () =>  (
    <footer className="bg-blue-900 text-white py-12 relative ">
      {localStorage.getItem("token") && (
      <button
          onClick={handleEditClick}
          className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          Edit Footer
        </button>
      )}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Contact Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              {footerData.logo && (
                <div className="w-10 h-10  rounded mr-3 overflow-hidden">
                  <img src={footerData.logo} alt="School Logo" className="w-full h-full object-contain" />
                </div>
              )}
              <span className="font-semibold text-lg">{footerData.nama_sekolah}</span>
            </div>
            <div className="space-y-2 text-blue-200">
              <p>{footerData.alamat}</p>
              <p>Jawa Tengah 43351, Indonesia</p>
              <p>{footerData.no_telepon}</p>
              <p>{footerData.email}</p>
            </div>
          </div>
          
          {/* Jelajah */}
          <div>
            <h3 className="text-xl font-bold mb-6">Jelajah</h3>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Sambutan</a></li>
              <li><a href="/profiladmin" className="cursor-pointer hover:text-white transition-colors duration-200">Profil Sekolah</a></li>
              <li><a href="/beritaadmin" className="cursor-pointer hover:text-white transition-colors duration-200">Berita</a></li>
              <li><a href="/galeri" className="hover:text-white transition-colors duration-200">Galeri</a></li>
            </ul>
          </div>
          
          {/* Halaman Umum */}
          <div>
            <h3 className="text-xl font-bold mb-6">Halaman Umum</h3>
            <ul className="space-y-2 text-blue-200">
              <li><a href="/guruadmin" onClick={handleGuru} className="hover:text-white transition-colors duration-200">Data Guru</a></li>
              <li><a href="https://spmb.semarangkota.go.id/sd" className="hover:text-white transition-colors duration-200">SPMB SDN</a></li>
              <li><a href="https://spmb.semarangkota.go.id/assets/content_upload/panduan/Panduan%20Pendaftaran%20SD%202025.pdf" className="hover:text-white transition-colors duration-200">Panduan SPMB</a></li>
              <li><a href="https://maps.app.goo.gl/ZoFMEgttrNr5Ak6g6" className="hover:text-white transition-colors duration-200">Lokasi</a></li>
              <li><a href="/kontakadmin" onClick={handleKontak} className="hover:text-white transition-colors duration-200">Kontak</a></li>
            </ul>
          </div>
          
          {/* Media Sosial */}
          <div>
            <h3 className="text-xl font-bold mb-6">Media Sosial</h3>
            <div className="space-y-3">
              {footerData.facebook && (
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <a href={footerData.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200">
                    Facebook
                  </a>
                </div>
              )}
              {footerData.youtube && (
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <a href={footerData.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200">
                    YouTube
                  </a>
                </div>
              )}
              {footerData.instagram && (
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <a href={footerData.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200">
                    Instagram
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; 2025 {footerData.nama_sekolah}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
  return isEditing ? renderEditForm() : renderFooterContent();
};

export default Footer;
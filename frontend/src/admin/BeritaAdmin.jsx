import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  Upload,
  Home,
  Users,
  BookOpen,
  Image,
  Settings,
  LogOut,
  Menu,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BeritaAdmin = () => {
  const navigate = useNavigate();
  const handleGuruAdmin = (e) => {
    e.preventDefault();
    navigate("/guruadmin");
  };
  const handleProfilAdmin = (e) => {
    e.preventDefault();
    navigate("/profiladmin");
  };

  const [beritas, setBeritas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadMethod, setUploadMethod] = useState("url");
  const [imagePreview, setImagePreview] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const getAuthToken = () => {
    return localStorage.getItem('token'); 
  };
  const [formData, setFormData] = useState({
    judul: "",
    isi: "",
    tanggal_publikasi: new Date().toISOString().split("T")[0],
    gambar_utama: "",
    gambar1: "",
    gambar2: "",
    gambar3: "",
    gambar4: "",
    gambar5: "",
  });

  // Fetch all news
  const fetchBeritas = async () => {
    try {
       const token = getAuthToken();
      if (!token) throw new Error('No authentication token found');
      const response = await fetch("http://localhost:5000/api/berita");

      if (!response.ok) {
        const text = await response.text(); // baca response sebagai text dulu
        throw new Error(`Failed to fetch news. Status: ${response.status}\n${text}`);
      }

      const data = await response.json();
      setBeritas(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchBeritas();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image URL change
  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      gambar_utama: value,
    });
    setImagePreview(value);
  };

  // Handle file upload with base64
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation
    if (file.size > 5 * 1024 * 1024) {
      setError("File size too large (max 5MB)");
      return;
    }

    // Validtypes
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.');
      return;
    }

    try {
      // Convert to Base64
      const base64String = await convertToBase64(file);

      setFormData((prev) => ({
        ...prev,
        gambar_utama: base64String,
      }));

      setImagePreview(base64String);
      setError(null);
    } catch (error) {
      console.error("Conversion error:", error);
      setError("Failed to process image");
    }

    try {
      const formData = new FormData();
      formData.append('judul', formDataToSend.judul);
      formData.append('isi', formDataToSend.isi);
      formData.append('tanggal_publikasi', formDataToSend.tanggal_publikasi);
      formData.append('gambar_utama', formDataToSend.gambar_utama); // base64 string

      // hanya tambahkan jika tidak kosong
      ['gambar1', 'gambar2', 'gambar3', 'gambar4', 'gambar5'].forEach((field) => {
        if (formDataToSend[field]) {
          formData.append(field, formDataToSend[field]);
        }
      });

      const response = await fetch(url, {
        method,
        body: formData, // jangan pakai JSON.stringify di sini
      });

      if (!response.ok) throw new Error("Upload failed");

      const { url } = await response.json();
      setFormData((prev) => ({
        ...prev,
        gambar_utama: url,
      }));
      setImagePreview(url);
    } catch (error) {
      console.error("Upload error:", error);
      // Show error message to user
    }
  };

  // Handle upload method change
  const handleUploadMethodChange = (method) => {
    setUploadMethod(method);
    setImagePreview(null);
    setFormData({
      ...formData,
      gambar_utama: "",
    });
  };

  // Reset form
  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setImagePreview(null);
    setFormData({
      judul: "",
      isi: "",
      tanggal_publikasi: new Date().toISOString().split("T")[0],
      gambar_utama: "",
      gambar1: "",
      gambar2: "",
      gambar3: "",
      gambar4: "",
      gambar5: "",
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
  if (!formData.judul || !formData.isi || !formData.tanggal_publikasi || !formData.gambar_utama) {
    setError('Please fill all required fields');
    return;
  }

  const tanggalPublikasi = new Date(formData.tanggal_publikasi).toISOString();

  try {
    let url = 'http://localhost:5000/api/berita';
    let method = 'POST';
     

    // Ganti nama variabel ini agar tidak bentrok
    const formDataToSend = {
      judul: formData.judul,
      isi: formData.isi,
      tanggal_publikasi: tanggalPublikasi,
      gambar_utama: formData.gambar_utama,
      ...(formData.gambar1 && { gambar1: formData.gambar1 }),
      ...(formData.gambar2 && { gambar2: formData.gambar2 }),
      ...(formData.gambar3 && { gambar3: formData.gambar3 }),
      ...(formData.gambar4 && { gambar4: formData.gambar4 }),
      ...(formData.gambar5 && { gambar5: formData.gambar5 })
    };

    if (editingId) {
      url += `/${editingId}`;
      method = 'PUT';
      formDataToSend.id_berita = editingId;
    } else {
      let nextId = 1;
      if (beritas.length > 0) {
        const ids = beritas.map(b => b.id_berita);
        for (let i = 1; ; i++) {
          if (!ids.includes(i)) {
            nextId = i;
            break;
          }
        }
      }
      formDataToSend.id_berita = nextId;
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSend),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save news');
    }

    const result = await response.json();

    if (editingId) {
      setBeritas(beritas.map(item =>
        item.id_berita === editingId ? result : item
      ));
    } else {
      setBeritas([result, ...beritas]);
    }

    resetForm();
    setError(null);
  } catch (err) {
    setError(err.message || 'Terjadi kesalahan saat menyimpan berita');
    console.error('Error saving news', err);
  }
};

  // Handle edit
  const handleEdit = (berita) => {
    setEditingId(berita.id_berita);
    setFormData({
      judul: berita.judul,
      isi: berita.isi,
      tanggal_publikasi: new Date(berita.tanggal_publikasi)
        .toISOString()
        .split("T")[0],
      gambar_utama: berita.gambar_utama,
      gambar1: berita.gambar1 || "",
      gambar2: berita.gambar2 || "",
      gambar3: berita.gambar3 || "",
      gambar4: berita.gambar4 || "",
      gambar5: berita.gambar5 || "",
    });
    setImagePreview(berita.gambar_utama);
    setShowForm(true);
  };
  if (editingId) {
    handleEdit.id_berita = editingId;
  }

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/berita/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete news");

      setBeritas(beritas.filter((item) => item.id_berita !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  
  // Featured article (first item for demo)
  const featuredArticle = beritas.length > 0 ? beritas[0] : null;
  const regularArticles = beritas.length > 1 ? beritas.slice(1) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation Bar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded mr-3"></div>
                <span className="font-bold text-xl text-gray-900">
                  SDN NGAWI
                </span>
                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Admin
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex space-x-6 ml-50">
                <button
                  href="#"
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  Beranda
                </button>
                <button
                  href="#"
                  onClick={handleProfilAdmin}
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  Profil
                </button>
                <button
                  href="#"
                  onClick={handleGuruAdmin}
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  Guru
                </button>
                <button
                  href="#"
                  className="hover:text-blue-200 transition-colors duration-200 border-b-2 border-blue-400"
                >
                  Berita
                </button>
                <button
                  href="#"
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  Prestasi
                </button>
                <button
                  href="#"
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  Akademik
                </button>
              </nav>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-4">
              {/* Add News Button */}
              <div className="container mx-auto px-4 pt-8">
                {localStorage.getItem('token') && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Add News
                </button>)}
                {error && <span className="text-red-600 ml-2">{error}</span>}
              </div>

              {/* Profile/Logout */}

              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {/* {navItems.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    item.active
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <item.icon size={18} className="mr-3" />
                  {item.label}
                </a>
              ))} */}
              <div className="border-t border-gray-200 pt-4">
                <a
                  href="#"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Header Navigation */}
      <header className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center item-center text-center">
            <div>
              <h1 className="text-2xl font-bold bg-blue-900">
                Manajemen Berita
              </h1>
              <p className="text-white">
                Mengatur berita sekolah dan pengumuman.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingId ? "Edit News" : "Add New News"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="judul"
                    value={formData.judul}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter news title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Isi berita
                  </label>
                  <textarea
                    name="isi"
                    value={formData.isi}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter news content"
                  />
                </div>
                <div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Publication Date
                    </label>
                    <input
                      type="date"
                      name="tanggal_publikasi"
                      value={formData.tanggal_publikasi}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                  </label>

                  {/* Upload Method Selector */}
                  <div className="flex gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => handleUploadMethodChange("url")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        uploadMethod === "url"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUploadMethodChange("file")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                        uploadMethod === "file"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <Upload size={16} />
                      Upload File
                    </button>
                  </div>

                  {/* URL Input */}
                  {uploadMethod === "url" && (
                    <input
                      type="url"
                      value={formData.gambar_utama}
                      onChange={handleImageUrlChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  )}

                  {/* File Upload */}
                  {uploadMethod === "file" && (
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();

                            reader.onloadend = () => {
                              const base64String = reader.result.split(",")[1];

                              setFormData((prev) => ({
                                ...prev,
                                gambar_utama: base64String,
                              }));

                              setImagePreview(reader.result); // ⬅️ untuk preview gambar
                            };

                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500">
                        Supported formats: JPEG, PNG, GIF, WebP. Max size: 5MB
                      </p>
                    </div>
                  )}

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Image Preview:
                      </p>
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-md border border-gray-300"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                        
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                  >
                    <Save size={20} />
                    {editingId ? "Update" : "Create"}
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Featured Article Section */}
        {featuredArticle && (
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Featured Article
              </h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative">
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                  onClick={() => handleEdit(featuredArticle)}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(featuredArticle.id_berita)}
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={`data:image/jpeg;base64,${featuredArticle.gambar_utama}`}
                    alt={featuredArticle.judul}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    {featuredArticle.judul}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredArticle.isi}
                  </p>
                  <div className="text-sm text-gray-500">
                    {new Date(
                      featuredArticle.tanggal_publikasi
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Regular Articles Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">All News</h2>
            <span className="text-gray-600">
              {regularArticles.length} articles
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {regularArticles.map((berita) => (
              <div
                key={berita.id_berita}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative"
              >
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button
                    onClick={() => handleEdit(berita)}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(berita.id_berita)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
               
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 mt-2">
                    {berita.judul}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {berita.isi.substring(0, 120)}...
                  </p>
                  <div className="text-sm text-gray-500">
                    {new Date(berita.tanggal_publikasi).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {beritas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No news found. Add your first news article!
              </p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
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

            <div>
              <h3 className="text-xl font-bold mb-6">Jelajah</h3>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Sambutan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Profil Sekolah
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Berita
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Galeri
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Halaman Umum</h3>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Data Guru
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    PPDB SDN
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Panduan PPDB
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Lokasi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Kontak
                  </a>
                </li>
              </ul>
            </div>

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

export default BeritaAdmin;

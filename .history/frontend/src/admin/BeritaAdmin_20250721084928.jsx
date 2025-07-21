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
import Header from "../componentsAdmin/components/Header";
import Footer from "../componentsAdmin/components/Footer";

const BeritaAdmin = () => {
  const navigate = useNavigate();
  
  const [beritas, setBeritas] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadMethod, setUploadMethod] = useState("url");
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState(null); // For showing full article
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

  // Fetch all 
  const fetchBeritas = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found. Please login first.');
      }

      const response = await fetch("http://localhost:5000/api/berita", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch news. Status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setBeritas(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "An unexpected error occurred while fetching news.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const delayFetch = async () => {
    const delay = 10; 
    await new Promise(resolve => setTimeout(resolve, delay)); 
    fetchBeritas();
  };
  fetchEvents();
  }, [token, navigate]);
   if (!token) {
    return null;
  []);


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
      const token = getAuthToken();
      if (!token) throw new Error('No authentication token found');

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
          'Authorization': `Bearer ${token}`
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Memuat data berita...</p>
        </div>
      </div>
    );
  }

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

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) return;

    try {
      const token = getAuthToken();
      if (!token) throw new Error('No authentication token found');
      
      const response = await fetch(`http://localhost:5000/api/berita/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to delete news");

      setBeritas(beritas.filter((item) => item.id_berita !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle view full article
  const handleViewBerita = (berita) => {
    setSelectedBerita(berita);
  };

 
  
  // Featured article (first item for demo)
  const featuredArticle = beritas.length > 0 ? beritas[0] : null;
  const regularArticles = beritas.length > 1 ? beritas.slice(1) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation Bar */}
      <Header/>

      <div className="w-full px-4 py-8 bg-blue-900">
        <h1 className="text-center text-4xl font-bold text-white">Manajemen Berita</h1>
      </div>
      <div className="container mx-auto px-4 mt-5 max-w-7xl sm:px-6 lg:px-8">
                {localStorage.getItem('token') && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Add News
                </button>)}
                {error && <span className="text-red-600 ml-2">{error}</span>}
              </div>

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

                              setImagePreview(reader.result);
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

      {/* Article Detail Modal */}
      {selectedBerita && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedBerita.judul}
                </h2>
                <button
                  onClick={() => setSelectedBerita(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {selectedBerita.gambar_utama && (
                  <div className="mb-6">
                    <img
                      src={selectedBerita.gambar_utama.startsWith('http') 
                        ? selectedBerita.gambar_utama 
                        : `data:image/jpeg;base64,${selectedBerita.gambar_utama}`}
                      alt={selectedBerita.judul}
                      className="w-full h-64 object-cover rounded-md"
                    />
                  </div>
                )}

                <div className="text-gray-600 whitespace-pre-line">
                  {selectedBerita.isi}
                </div>

                <div className="text-sm text-gray-500">
                  Published: {new Date(selectedBerita.tanggal_publikasi).toLocaleDateString()}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setSelectedBerita(null);
                      handleEdit(selectedBerita);
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBerita(null);
                      handleDelete(selectedBerita.id_berita);
                    }}
                    className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[-30px]">
        {/* Featured Article Section */}
        {featuredArticle && (
          <section className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 ">
                Berita Terbaru
              </h2>
            </div>
            <div 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative cursor-pointer"
              onClick={() => handleViewBerita(featuredArticle)}
            >
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(featuredArticle);
                  }}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(featuredArticle.id_berita);
                  }}
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={featuredArticle.gambar_utama.startsWith('http') 
                      ? featuredArticle.gambar_utama 
                      : `data:image/jpeg;base64,${featuredArticle.gambar_utama}`}
                    alt={featuredArticle.judul}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    {featuredArticle.judul}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredArticle.isi.substring(0, 200)}...
                  </p>
                  <div className="text-sm text-gray-500">
                    {new Date(
                      featuredArticle.tanggal_publikasi
                    ).toLocaleDateString()}
                  </div>
                  <button
              onClick={() => navigate(`/berita/${featuredArticle.id_berita}`)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Selengkapnya
            </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Regular Articles Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Berita Lain</h2>
            <span className="text-gray-600">
              {regularArticles.length} articles
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {regularArticles.map((berita) => (
              <div
                key={berita.id_berita}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative cursor-pointer"
                onClick={() => handleViewBerita(berita)}
              >
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(berita);
                    }}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(berita.id_berita);
                    }}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
               
                {berita.gambar_utama && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={berita.gambar_utama.startsWith('http') 
                        ? berita.gambar_utama 
                        : `data:image/jpeg;base64,${berita.gambar_utama}`}
                      alt={berita.judul}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
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
                  <button
          onClick={() => navigate(`/berita/${berita.id_berita}`)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Selengkapnya
        </button>
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
      <Footer />
    </div>
  );
};

export default BeritaAdmin;
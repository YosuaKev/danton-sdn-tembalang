import React, { useState } from "react";
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
import HeaderAdmin from './HeaderAdmin'

const BeritaAdmin = () => {
  // Sample initial data
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Kegiatan Belajar Mengajar di Rumah 2020",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://picsum.photos/400/250?random=2",
      category: "Pembelajaran",
      date: "2024-01-15",
      featured: false,
    },
    {
      id: 2,
      title: "Kegiatan Belajar Mengajar di Rumah 2020",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://picsum.photos/400/250?random=3",
      category: "Pembelajaran",
      date: "2024-01-14",
      featured: false,
    },
    {
      id: 3,
      title: "Kegiatan Belajar Mengajar dirumah",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://picsum.photos/600/400?random=5",
      category: "Kegiatan",
      date: "2024-01-13",
      featured: true,
    },
    {
      id: 4,
      title: "Kegiatan Pembelajaran daring",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://picsum.photos/400/250?random=9",
      category: "Pembelajaran",
      date: "2024-01-12",
      featured: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    featured: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadMethod, setUploadMethod] = useState("url"); // 'url' or 'file'
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid image file (JPEG, PNG, GIF, or WebP)");
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setImagePreview(result);
        setFormData((prev) => ({
          ...prev,
          image: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image URL input
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
    setImagePreview(url);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle upload method change
  const handleUploadMethodChange = (method) => {
    setUploadMethod(method);
    setSelectedFile(null);
    setImagePreview("");
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // Create new article
  const handleCreate = () => {
    const newArticle = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split("T")[0],
    };
    setArticles((prev) => [newArticle, ...prev]);
    resetForm();
  };

  // Update existing article
  const handleUpdate = () => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === editingId ? { ...article, ...formData } : article
      )
    );
    resetForm();
  };

  // Delete article
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setArticles((prev) => prev.filter((article) => article.id !== id));
    }
  };

  // Start editing
  const handleEdit = (article) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      content: article.content,
      image: article.image,
      category: article.category,
      featured: article.featured,
    });
    setImagePreview(article.image);
    // Determine upload method based on existing image
    if (article.image && article.image.startsWith("data:")) {
      setUploadMethod("file");
    } else {
      setUploadMethod("url");
    }
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setSelectedFile(null);
    setImagePreview("");
    setUploadMethod("url");
    setFormData({
      title: "",
      content: "",
      image: "",
      category: "",
      featured: false,
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.content ||
      !formData.image ||
      !formData.category
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingId) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const featuredArticle = articles.find((article) => article.featured);
  const regularArticles = articles.filter((article) => !article.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation Bar */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <nav className="hidden md:flex space-x-6 ml-64">
              <button href="#" className="hover:text-blue-200 transition-colors duration-200">Beranda</button>
              <button href="#" className="hover:text-blue-200 transition-colors duration-200">Profil</button>
              <button href="#" className="hover:text-blue-200 transition-colors duration-200">Guru</button>
              <button href="#" className="hover:text-blue-200 transition-colors duration-200 border-b-2 border-blue-400">Berita</button>
              <button href="#" className="hover:text-blue-200 transition-colors duration-200">Prestasi</button>
              <button href="#" className="hover:text-blue-200 transition-colors duration-200">Kontak</button>
            </nav>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-4">

              {/* Add News Button */}
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Add News</span>
              </button>

              {/* Profile/Logout */}
              <div className="relative">
                <button className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span className="hidden md:block text-sm font-medium">
                    Admin
                  </span>
                </button>
              </div>

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
              {navItems.map((item) => (
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
              ))}
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
      </nav>

      {/* Header Navigation */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                News Management
              </h1>
              <p className="text-gray-600">
                Manage school news and announcements
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
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter news title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter news content"
                  />
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
                      value={formData.image}
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
                        onChange={handleFileChange}
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
                        <div className="hidden w-full h-48 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center">
                          <span className="text-gray-500">
                            Failed to load image
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="Pembelajaran">Pembelajaran</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Berita">Berita</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Featured Article
                  </label>
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
                  onClick={() => handleDelete(featuredArticle.id)}
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-sm text-blue-600 font-medium mb-2">
                    {featuredArticle.category}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredArticle.content}
                  </p>
                  <div className="text-sm text-gray-500">
                    {new Date(featuredArticle.date).toLocaleDateString()}
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
            {regularArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative"
              >
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button
                    onClick={() => handleEdit(article)}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-sm text-blue-600 font-medium">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 mt-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {article.content.substring(0, 120)}...
                  </p>
                  <div className="text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {regularArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles found. Add your first news article!
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

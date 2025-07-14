import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const GuruAdmin = () => {
  const navigate = useNavigate();
      const handleBeritaAdmin = (e) => {
      e.preventDefault();
      navigate('/beritaadmin')
      }
      const handleProfilAdmin = (e) => {
        e.preventDefault();
        navigate('/profiladmin')
      }

  // Mock data for demonstration
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Hj. ENIS HENRAWATI, S.Pd",
      nip: "196801051990032009",
      subject: "Ilmu Pengetahuan Sosial",
      profilePicture: null,
    },
    {
      id: 2,
      name: "AHMAD SURYANTO, S.Pd",
      nip: "197505102000031008",
      subject: "Matematika",
      profilePicture: null,
    },
    {
      id: 3,
      name: "SITI NURHALIZA, S.Pd",
      nip: "198203152005042012",
      subject: "Bahasa Indonesia",
      profilePicture: null,
    },
    {
      id: 4,
      name: "BUDI SANTOSO, S.Pd",
      nip: "197912202003121006",
      subject: "Pendidikan Jasmani",
      profilePicture: null,
    },
    {
      id: 5,
      name: "RINI SETYOWATI, S.Pd",
      nip: "198506182008012015",
      subject: "Bahasa Inggris",
      profilePicture: null,
    },
    {
      id: 6,
      name: "WAHYU HIDAYAT, S.Pd",
      nip: "199001102015031004",
      subject: "Fisika",
      profilePicture: null,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    nip: "",
    subject: "",
    profilePicture: null,
  });

  const teachersPerPage = 6;

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.nip.includes(searchTerm) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);
  const startIndex = (currentPage - 1) * teachersPerPage;
  const endIndex = startIndex + teachersPerPage;
  const currentTeachers = filteredTeachers.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.nip || !formData.subject) {
      alert("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    if (modalMode === "create") {
      // Create new teacher
      const newTeacher = {
        id: Date.now(),
        ...formData,
      };
      setTeachers((prev) => [...prev, newTeacher]);
    } else {
      // Update existing teacher
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === selectedTeacher.id
            ? { ...teacher, ...formData }
            : teacher
        )
      );
    }

    closeModal();
  };

  // Open modal for creating new teacher
  const openCreateModal = () => {
    setModalMode("create");
    setFormData({
      name: "",
      nip: "",
      subject: "",
      profilePicture: null,
    });
    setShowModal(true);
  };

  // Open modal for editing teacher
  const openEditModal = (teacher) => {
    setModalMode("edit");
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name,
      nip: teacher.nip,
      subject: teacher.subject,
      profilePicture: teacher.profilePicture,
    });
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedTeacher(null);
    setFormData({
      name: "",
      nip: "",
      subject: "",
      profilePicture: null,
    });
  };

  // Handle delete confirmation
  const handleDeleteClick = (teacher) => {
    setTeacherToDelete(teacher);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    setTeachers((prev) =>
      prev.filter((teacher) => teacher.id !== teacherToDelete.id)
    );
    setShowDeleteModal(false);
    setTeacherToDelete(null);
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTeacherToDelete(null);
  };

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
            </div>

            <nav className="hidden md:flex space-x-6">
              <button
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Beranda
              </button>
              <a
                href="#"
                onClick={handleProfilAdmin} 
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Profil
              </a>
              <button 
                className="hover:text-blue-600 transition-colors duration-200 border-b-2 border-blue-400"
              >
                Guru
              </button>
              <button
                onClick={handleBeritaAdmin}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Berita
              </button>
              <button
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Prestasi
              </button>

              <button href="#" className="hover:text-blue-200 transition-colors duration-200">Akademik</button>
            </nav>
            

            <button className="md:hidden">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Add Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari guru berdasarkan nama, NIP, atau mata pelajaran..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Tambah Guru
          </button>
        </div>

        {/* Teacher Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col items-center mb-4">
                  {teacher.profilePicture ? (
                    <img
                      src={teacher.profilePicture}
                      alt={teacher.name}
                      className="w-20 h-20 rounded-full object-cover mb-3"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                      <User className="w-10 h-10 text-gray-400" />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-800 text-center mb-1">
                    {teacher.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    NIP: {teacher.nip}
                  </p>
                  <p className="text-sm text-blue-600 font-medium text-center">
                    {teacher.subject}
                  </p>
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => openEditModal(teacher)}
                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(teacher)}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Tidak ada guru ditemukan
            </h3>
            <p className="text-gray-500">
              Coba ubah kata kunci pencarian atau tambah guru baru
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => goToPage(index + 1)}
                className={`w-10 h-10 rounded-lg border ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </main>

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
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Sambutan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Profil Sekolah
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Berita
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Galeri
                  </a>
                </li>
              </ul>
            </div>

            {/* Halaman Umum */}
            <div>
              <h3 className="font-semibold mb-4">Halaman Umum</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Data Guru
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    PPDB SDN
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Panduan PPDB
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Lokasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200 transition-colors">
                    Kontak
                  </a>
                </li>
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

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {modalMode === "create"
                    ? "Tambah Guru Baru"
                    : "Edit Data Guru"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIP
                  </label>
                  <input
                    type="text"
                    name="nip"
                    value={formData.nip}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mata Pelajaran
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Foto Profil (Opsional)
                  </label>
                  <input
                    type="url"
                    name="profilePicture"
                    value={formData.profilePicture || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {modalMode === "create"
                      ? "Tambah Guru"
                      : "Simpan Perubahan"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Konfirmasi Hapus</h2>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus data guru{" "}
                <strong>{teacherToDelete?.name}</strong>? Tindakan ini tidak
                dapat dibatalkan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Hapus
                </button>
                <button
                  onClick={cancelDelete}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuruAdmin;

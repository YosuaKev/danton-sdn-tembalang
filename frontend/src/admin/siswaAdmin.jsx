import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Save, X, ChevronLeft, ChevronRight } from 'lucide-react';

const SiswaAdmin = () => {
  const [students, setStudents] = useState([]);
  const [expandedClasses, setExpandedClasses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentStudent, setCurrentStudent] = useState({
    nama: '',
    kelas: '',
    nisn: ''
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // configure API host
  const API_URL = 'http://localhost:5000/api/siswas';

  const kelasOptions = [
    'I-A', 'I-B', 'I-C', 
    'II-A', 'II-B', 'II-C', 
    'III-A', 'III-B', 'III-C',
    'IV-A', 'IV-B', 'IV-C', 
    'V-A', 'V-B', 'V-C', 
    'VI-A', 'VI-B', 'VI-C',
  ];

  // helper error HTTP
  const handleApiError = async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      const errorMsg = errorData.error || 
                      (errorData.errors ? 
                       errorData.errors.map(e => e.msg).join(', ') : 
                       `HTTP error! status: ${response.status}`);
      throw new Error(errorMsg);
    }
    return response.json();
  };

  // fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await handleApiError(response);
        setStudents(data);
        setFilteredStudents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search term
  useEffect(() => {
    const filtered = students.filter(student =>
      student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.kelas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nisn.includes(searchTerm)
    );
    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [searchTerm, students]);

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Open Add Modal
  const handleAddStudent = () => {
    setModalMode('add');
    setCurrentStudent({
      nama: '',
      kelas: '',
      nisn: ''
    });
    setShowModal(true);
  };

  // Open Edit Modal
  const handleEditStudent = (student) => {
    setModalMode('edit');
    setCurrentStudent({
      _id: student._id,
      nama: student.nama,
      kelas: student.kelas,
      nisn: student.nisn
    });
    setShowModal(true);
  };

  // Save Student (Add or Edit)
  const handleSaveStudent = async () => {
    if (!currentStudent.nama || !currentStudent.kelas || !currentStudent.nisn) {
      alert('Semua field harus diisi!');
      return;
    }

    try {
      let response, data;
      const headers = {
        'Content-Type': 'application/json'
      };

    if (modalMode === 'add') {
        response = await fetch(API_URL, {
            method: 'POST',
            headers,
            body : JSON.stringify(currentStudent)
        });
        data = await handleApiError(response);
        setStudents([...students, data]);
      } else {
        response = await fetch(`${API_URL}/${currentStudent._id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(currentStudent)
        });
        data = await handleApiError(response);
        setStudents(students.map(student => 
          student._id === currentStudent._id ? data : student
        ));
      }

    setShowModal(false);
    } catch (err) {
        alert(err.message);
    }
    };
  
  // Delete Student
  const handleDeleteStudent = (student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteStudent = async () => {
    try {
      const response = await fetch(`${API_URL}/${studentToDelete._id}`, {
        method: 'DELETE'
      });
      await handleApiError(response);
      setStudents(students.filter(student => student._id !== studentToDelete._id));
      setShowDeleteConfirm(false);
      setStudentToDelete(null);
    } catch (err) {
      alert(err.message);
    }
  };

  // Generate pagination buttons
  const generatePaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      if (currentPage <= 3) {
        buttons.push(1, 2, 3, 4, 5);
      } else if (currentPage >= totalPages - 2) {
        buttons.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        buttons.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2);
      }
    }
    
    return buttons;
  };

  if (loading) { 
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data siswa...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Profil
              </a>
              <button
                
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Guru
              </button>
              <button
                
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Berita
              </button>
              <button
                
                className="hover:text-blue-600 transition-colors duration-200 border-b-2 border-blue-400"
              >
                Siswa
              </button>
              <button
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Prestasi
              </button>
              <button href="#" className="hover:text-blue-600 transition-colors duration-200">Akademik</button>
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
      <div className="container mx-auto px-4 py-8">
        {/* Search and Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari siswa..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={handleAddStudent}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Siswa
          </button>
        </div>
        
        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kelas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NISN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.nama}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.kelas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.nisn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors duration-200 flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors duration-200 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {currentStudents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Tidak ada data siswa yang ditemukan.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {generatePaginationButtons().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  currentPage === pageNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {modalMode === 'add' ? 'Tambah Siswa' : 'Edit Siswa'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  value={currentStudent.nama}
                  onChange={(e) => setCurrentStudent({...currentStudent, nama: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan nama siswa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kelas
                </label>
                <select
                  value={currentStudent.kelas}
                  onChange={(e) => setCurrentStudent({...currentStudent, kelas: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih kelas</option>
                  {kelasOptions.map(kelas => (
                    <option key={kelas} value={kelas}>{kelas}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NISN
                </label>
                <input
                  type="text"
                  value={currentStudent.nisn}
                  onChange={(e) => setCurrentStudent({...currentStudent, nisn: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan NISN"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleSaveStudent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus siswa <strong>{studentToDelete?.nama}</strong>?
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={confirmDeleteStudent}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded mr-3"></div>
                <span className="font-semibold text-lg">SDN TEMBALANG</span>
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
            <p>&copy; 2024 SDN TEMBALANG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default SiswaAdmin;
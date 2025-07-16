import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

const SiswaAdmin = () => {
  const navigate = useNavigate();
    const handleGuruAdmin = (e) => {
      e.preventDefault();
      navigate("/guruadmin");
    };
    const handleProfilAdmin = (e) => {
      e.preventDefault();
      navigate("/profiladmin");
    };
      const handleBeritaAdmin = (e) => {
      e.preventDefault();
      navigate('/beritaadmin')
      }
      const handlePrestasi = (e) => {
      e.preventDefault();
      window.open('https://sangjuara.semarangkota.go.id/', '_blank');
      }
      const handleAkademikAdmin = (e) => {
      e.preventDefault();
      navigate('/akademikadmin')
      }
  const [students, setStudents] = useState([]);
  const [expandedClasses, setExpandedClasses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentStudent, setCurrentStudent] = useState({
    nama: '',
    kelas: '',
    nisn: ''
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const API_URL = 'http://localhost:5000/api/siswas';

  const kelasOptions = [
    'I-A', 'I-B', 'I-C', 
    'II-A', 'II-B', 'II-C', 
    'III-A', 'III-B', 'III-C',
    'IV-A', 'IV-B', 'IV-C', 
    'V-A', 'V-B', 'V-C', 
    'VI-A', 'VI-B', 'VI-C',
  ];

  // Helper function for HTTP errors
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

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await handleApiError(response);
        setStudents(data);
        setFilteredStudents(data);
        
        // Initialize all classes as expanded
        const initialExpanded = {};
        data.forEach(student => {
          if (!initialExpanded[student.kelas]) {
            initialExpanded[student.kelas] = true;
          }
        });
        setExpandedClasses(initialExpanded);
        
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
      student.nisn.toString().includes(searchTerm)
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  // Group students by class
  const groupStudentsByClass = (students) => {
    return students.reduce((groups, student) => {
      const kelas = student.kelas;
      if (!groups[kelas]) {
        groups[kelas] = [];
      }
      groups[kelas].push(student);
      return groups;
    }, {});
  };

  const studentsByClass = groupStudentsByClass(filteredStudents);

  // Sort classes in order: I-A, I-B, I-C, II-A, II-B, ..., VI-C
  const sortedClasses = Object.keys(studentsByClass).sort((a, b) => {
    const gradeA = parseInt(a.split('-')[0].replace('I', '1').replace('II', '2').replace('III', '3').replace('IV', '4').replace('V', '5').replace('VI', '6'));
    const gradeB = parseInt(b.split('-')[0].replace('I', '1').replace('II', '2').replace('III', '3').replace('IV', '4').replace('V', '5').replace('VI', '6'));
    const classA = a.split('-')[1];
    const classB = b.split('-')[1];
    const romanToNum = {
    'I': 1,
    'II': 2,
    'III': 3,
    'IV': 4,
    'V': 5,
    'VI': 6
  };
    if (romanToNum[gradeA] !== romanToNum[gradeB]) 
    return romanToNum[gradeB] - romanToNum[gradeA];
    return gradeB - gradeA || classB.localeCompare(classA);;
  });

  // Toggle expand/collapse for class
  const toggleClass = (kelas) => {
    setExpandedClasses(prev => ({
      ...prev,
      [kelas]: !prev[kelas]
    }));
  };

  // CRUD Operations
  const handleAddStudent = () => {
    setModalMode('add');
    setCurrentStudent({
      nama: '',
      kelas: '',
      nisn: ''
    });
    setShowModal(true);
  };

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

  const handleSaveStudent = async () => {
    if (!currentStudent.nama || !currentStudent.kelas || !currentStudent.nisn) {
      alert('Semua field harus diisi!');
      return;
    }

    try {
      let response;
      const headers = {
        'Content-Type': 'application/json'
      };

      if (modalMode === 'add') {
        response = await fetch(API_URL, {
          method: 'POST',
          headers,
          body: JSON.stringify(currentStudent)
        });
        const newStudent = await handleApiError(response);
        setStudents([...students, newStudent]);
      } else {
        response = await fetch(`${API_URL}/${currentStudent._id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(currentStudent)
        });
        const updatedStudent = await handleApiError(response);
        setStudents(students.map(student => 
          student._id === currentStudent._id ? updatedStudent : student
        ));
      }
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteStudent = (student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteStudent = async () => {
    try {
      await fetch(`${API_URL}/${studentToDelete._id}`, {
        method: 'DELETE'
      });
      setStudents(students.filter(student => student._id !== studentToDelete._id));
      setShowDeleteConfirm(false);
      setStudentToDelete(null);
    } catch (err) {
      alert(err.message);
    }
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
              <button className="hover:text-blue-600 transition-colors duration-200">
                Beranda
              </button>
              <button onClick={handleProfilAdmin} className="hover:text-blue-600 transition-colors duration-200">
                Profil
              </button>
              <button onClick={handleGuruAdmin} className="hover:text-blue-600 transition-colors duration-200">
                Guru
              </button>
              <button className="hover:text-blue-600 transition-colors duration-200 border-b-2 border-blue-400">
                Siswa
              </button>
              <button onClick={handlePrestasi} className="hover:text-blue-600 transition-colors duration-200">
                Prestasi
              </button>
              <button onClick={handleBeritaAdmin} className="hover:text-blue-600 transition-colors duration-200">
                Berita
              </button>
              <button onClick={handleAkademikAdmin} className="hover:text-blue-600 transition-colors duration-200">
                Akademik
              </button>
            </nav>

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

        {/* Students Grouped by Class */}
        <div className="space-y-6">
          {sortedClasses.map((kelas) => (
            <div key={kelas} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="bg-blue-50 px-6 py-3 border-b border-blue-100 flex justify-between items-center cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={() => toggleClass(kelas)}
              >
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-blue-800 mr-3">
                    Kelas {kelas} 
                  </h3>
                  <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {studentsByClass[kelas].length} siswa
                  </span>
                </div>
                {expandedClasses[kelas] ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </div>
              
              {expandedClasses[kelas] && (
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">NISN</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {studentsByClass[kelas].map((student, index) => (
                        <tr key={student._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-12">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 truncate" title={student.nama}>
                            {student.nama}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/4">
                            {student.nisn}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-1/4">
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
              )}
            </div>
          ))}

          {/* Empty State */}
          {filteredStudents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">Tidak ada data siswa yang ditemukan.</p>
            </div>
          )}
        </div>
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

      {/* Footer */}
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
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Sambutan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Profil Sekolah
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Berita
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Galeri
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Halaman Umum</h3>
              <ul className="space-y-2 text-blue-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Data Guru
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    PPDB SDN
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Panduan PPDB
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Lokasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
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
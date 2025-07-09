import React, { useState } from "react";
import { Edit, Save, X, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilAdmin = () => {
  // State for editing mode
  const [editMode, setEditMode] = useState({
    visi: false,
    misi: false,
    tujuan: false,
    strategi: false,
  });

  const [schoolData, setSchoolData] = useState({
    visi: "Membentuk pembelajar yang akhlakul karimah, berilmu, beretika berwawasan lingkungan untuk menuju pentas dunia.",
    misi: [
      "Mewujudkan pendidikan dengan keteladanan",
      "Mengembangkan budaya belajar dengan didasari pada kecintaan terhadap ilmu pengetahuan",
      "Meningkatkan fasilitas sekolah menuju sekolah bersih, sehat dan berwawasan lingkungan",
    ],
    tujuan: [
      "100% Seluruh Guru/Staf memberikan pelayanan, keteladanan kepada para pengguna jasa dengan pendekatan agama, etika, dan budaya",
      "100% Siswa melakukan syariat agama, etika dan budaya baik di Sekolah maupun diluar",
      "90% fasilitas sekolah mendukug Standar Nasional Pendidikan (SNP)",
      "80% Siswa berprestasi baik ditingkat regional, nasional maupun Global",
    ],
    strategi:
      "Tiada kekayaan yang paling utama daripada kekayaan jiwa, tiada kegagalan yang paling menyedihkan daripada kebodohan, dan tiada wawasan yang paling baik daripada pendidikan.",
  });

  const [tempData, setTempData] = useState({});
  const navigate = useNavigate ();
  const handleBeritaAdmin = (e) => {
    e.preventDefault();
    navigate('/beritaadmin');
  };
  const handleGuruAdmin = (e) => {
    e.preventDefault() ;
    navigate('/guruadmin')
  }

  // CRUD Operations
  const handleEdit = (section) => {
    setEditMode({ ...editMode, [section]: true });
    setTempData({ ...tempData, [section]: schoolData[section] });
  };

  const handleSave = (section) => {
    setSchoolData({ ...schoolData, [section]: tempData[section] });
    setEditMode({ ...editMode, [section]: false });
    setTempData({ ...tempData, [section]: undefined });
  };

  const handleCancel = (section) => {
    setEditMode({ ...editMode, [section]: false });
    setTempData({ ...tempData, [section]: undefined });
  };

  const handleAddItem = (section) => {
    const newItem = "";
    setTempData({
      ...tempData,
      [section]: [...(tempData[section] || schoolData[section]), newItem],
    });
  };

  const handleDeleteItem = (section, index) => {
    const updatedItems = (tempData[section] || schoolData[section]).filter(
      (_, i) => i !== index
    );
    if (editMode[section]) {
      setTempData({ ...tempData, [section]: updatedItems });
    } else {
      setSchoolData({ ...schoolData, [section]: updatedItems });
    }
  };

  const handleItemChange = (section, index, value) => {
    const updatedItems = [...(tempData[section] || schoolData[section])];
    updatedItems[index] = value;
    setTempData({ ...tempData, [section]: updatedItems });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
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
                className="hover:text-blue-600 transition-colors duration-200 border-b-2 border-blue-400"
              >
                Profil
              </a>
              <button
                onClick={handleGuruAdmin} 
                className="hover:text-blue-600 transition-colors duration-200"
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
              <button
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Kontak
              </button>
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

      {/* Admin Panel Header */}
      <div className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center">
            Manajemen Profil Sekolah
          </h1>
        </div>
      </div>

      {/* Visi dan Misi Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Visi Column */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-blue-900">Visi</h2>
                {!editMode.visi ? (
                  <button
                    onClick={() => handleEdit("visi")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave("visi")}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={() => handleCancel("visi")}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {editMode.visi ? (
                <textarea
                  value={tempData.visi || ""}
                  onChange={(e) =>
                    setTempData({ ...tempData, visi: e.target.value })
                  }
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan visi sekolah..."
                />
              ) : (
                <p className="text-gray-700 text-lg leading-relaxed">
                  {schoolData.visi}
                </p>
              )}
            </div>

            {/* Misi Column */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-blue-900">Misi</h2>
                {!editMode.misi ? (
                  <button
                    onClick={() => handleEdit("misi")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave("misi")}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={() => handleCancel("misi")}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {editMode.misi ? (
                <div className="space-y-3">
                  {(tempData.misi || schoolData.misi).map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleItemChange("misi", index, e.target.value)
                        }
                        className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Misi ${index + 1}`}
                      />
                      <button
                        onClick={() => handleDeleteItem("misi", index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddItem("misi")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={16} />
                    Tambah Misi
                  </button>
                </div>
              ) : (
                <ul className="text-gray-700 text-lg leading-relaxed space-y-4">
                  {schoolData.misi.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-3">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tujuan Sekolah Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-blue-900 text-white py-4 px-6 rounded-t-lg flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Tujuan Sekolah Pada Tahun 2017 Diharapkan:
              </h2>
              {!editMode.tujuan ? (
                <button
                  onClick={() => handleEdit("tujuan")}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
                >
                  <Edit size={16} />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave("tujuan")}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={() => handleCancel("tujuan")}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-b-lg shadow-md border border-gray-200">
              {editMode.tujuan ? (
                <div className="space-y-4">
                  {(tempData.tujuan || schoolData.tujuan).map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1 flex items-center gap-2">
                        <textarea
                          value={item}
                          onChange={(e) =>
                            handleItemChange("tujuan", index, e.target.value)
                          }
                          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          rows="2"
                          placeholder={`Tujuan ${index + 1}`}
                        />
                        <button
                          onClick={() => handleDeleteItem("tujuan", index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddItem("tujuan")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={16} />
                    Tambah Tujuan
                  </button>
                </div>
              ) : (
                <ol className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  {schoolData.tujuan.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Strategi Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-blue-900 text-white py-4 px-6 rounded-t-lg flex items-center justify-between">
              <h2 className="text-2xl font-bold">STRATEGI</h2>
              {!editMode.strategi ? (
                <button
                  onClick={() => handleEdit("strategi")}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors"
                >
                  <Edit size={16} />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave("strategi")}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={() => handleCancel("strategi")}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-b-lg shadow-md border border-gray-200">
              {editMode.strategi ? (
                <textarea
                  value={tempData.strategi || ""}
                  onChange={(e) =>
                    setTempData({ ...tempData, strategi: e.target.value })
                  }
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan strategi sekolah..."
                />
              ) : (
                <p className="text-gray-700 text-lg leading-relaxed text-center italic">
                  "{schoolData.strategi}"
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

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

export default ProfilAdmin;

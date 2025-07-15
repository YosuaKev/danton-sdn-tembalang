import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [content, setContent] = useState({
    judul: "SD Negeri Tembalang",
    subjudul: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, provident.",
    gambar: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState({ ...content });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", error: "" });

  // Fetch initial content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/home");
        if (!response.ok) throw new Error("Gagal memuat konten");
        const data = await response.json();
        setContent({
          judul: data.judul || "SD Negeri Tembalang",
          subjudul:
            data.subjudul ||
            "Lorem ipsum dolor sit amet consectetur adipisicing.",
          deskripsi:
            data.deskripsi ||
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, provident.",
          gambar: data.gambar || "",
        });
      } catch (error) {
        setStatus((prev) => ({ ...prev, error: error.message }));
      }
    };
    fetchContent();
  }, []);

  const handleEdit = () => {
    setEditContent({ ...content });
    setIsEditing(true);
    setStatus({ message: "", error: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setEditContent(prev => ({
    ...prev,
    [name]: value
  }));
};

  const handleSave = async () => {
    setIsLoading(true);
    setStatus({ message: "", error: "" });

    try {
      // Get current data to preserve other fields
      const currentData = await fetch("http://localhost:5000/api/home").then(
        (res) => res.json()
      );

      const response = await fetch("http://localhost:5000/api/home", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...currentData,
          judul: editContent.judul,
          subjudul: editContent.subjudul,
          deskripsi: editContent.deskripsi,
          gambar: editContent.gambar,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menyimpan perubahan");
      }

      const updatedData = await response.json();
      setContent({
        judul: updatedData.judul,
        subjudul: updatedData.subjudul,
        deskripsi: updatedData.deskripsi,
        gambar: updatedData.gambar,
      });

      setStatus((prev) => ({
        ...prev,
        message: "Perubahan berhasil disimpan!",
      }));
      setIsEditing(false);
    } catch (error) {
      setStatus((prev) => ({ ...prev, error: error.message }));
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <section className="bg-gradient-to-r from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Editor */}
            <div className="order-2 lg:order-1">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  name="gambar"
                  value={editContent.gambar || ""}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-2 border rounded"
                  required
                />
                {editContent.gambar && (
                  <div className="mt-2">
                    <img
                      src={editContent.gambar}
                      alt="Preview"
                      className="max-w-full h-40 object-contain border rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Invalid+URL";
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-1">Image Preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Content Editor */}
            <div className="order-1 lg:order-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul
                </label>
                <input
                  type="text"
                  name="judul"
                  value={editContent.judul}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  maxLength={200}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subjudul
                </label>
                <input
                  type="text"
                  name="subjudul"
                  value={editContent.subjudul}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  maxLength={200}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  name="deskripsi"
                  value={editContent.deskripsi}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={4}
                  maxLength={1000}
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Batal
                </button>
              </div>

              {status.message && (
                <p className="text-green-600 mt-2">{status.message}</p>
              )}
              {status.error && (
                <p className="text-red-600 mt-2">{status.error}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Display */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center overflow-hidden">
              {content.gambar ? (
                <img 
                  src={content.gambar} 
                  alt="Lingkungan sekolah" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Gambar Sekolah</span>
              )}
            </div>
          </div>

          {/* Content Display */}
          <div className="order-1 lg:order-2">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {content.judul}
            </h1>
            <h2 className="text-xl lg:text-2xl text-blue-600 mb-6">
              {content.subjudul}
            </h2>
            <p className="text-gray-600 mb-8 text-lg">{content.deskripsi}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://spmb.semarangkota.go.id/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
                  Daftar Sekarang
                </button>
              </a>

              {localStorage.getItem("token") && (
                <button
                  onClick={handleEdit}
                  className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors text-lg font-semibold"
                >
                  Edit Konten
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

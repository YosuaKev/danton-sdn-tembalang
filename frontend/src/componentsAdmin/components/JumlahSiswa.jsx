import { useState, useEffect } from 'react';

const JumlahSiswa = () => {
  const [stats, setStats] = useState([]);
  const [editStats, setEditStats] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ error: null, success: null });
  const getAuthToken = () => {
    return localStorage.getItem('token'); 
  };

  
  const fetchStats = async () => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error('No authentication token found');
      const response = await fetch("http://localhost:5000/api/home");
      if (!response.ok) throw new Error("Gagal memuat data statistik");
      
      const data = await response.json();
      
      // Ensure we have statistics data or initialize with defaults
      const statistics = data.statistics || [
        { namajumlah: 'Jumlah Siswa SDN TEMBALANG', jumlah: 999 },
        { namajumlah: 'Jumlah Guru SDN TEMBALANG', jumlah: 50 },
        { namajumlah: 'Jumlah Tenaga SDN TEMBALANG', jumlah: 30 }
      ];
      
      setStats(statistics);
      setEditStats([...statistics]);
    } catch (error) {
      setStatus(prev => ({ ...prev, error: error.message }));
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setStatus({ error: null, success: null });

    try {
      // Prepare data according to your validation schema
      const requestData = {
        statistics: editStats.map(stat => ({
          namajumlah: stat.namajumlah.trim(),
          jumlah: stat.jumlah
        }))
      };

      const token = getAuthToken();
      if (!token) throw new Error('No authentication token found');

      const response = await fetch("http://localhost:5000/api/home", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || "Gagal memperbarui data statistik");
      }

      const data = await response.json();
      setStats(data.statistics);
      setIsEditing(false);
      setStatus(prev => ({ ...prev, success: "Data berhasil diperbarui!" }));
    } catch (error) {
      setStatus(prev => ({ ...prev, error: error.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...editStats];
    newStats[index][field] = field === 'jumlah' ? parseInt(value) || 0 : value;
    setEditStats(newStats);
  };

  return (
    <section className="py-16 bg-white relative">
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {isEditing ? 'Batal' : 'Edit'}
      </button>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editStats[index]?.namajumlah || ''}
                    onChange={(e) => handleStatChange(index, 'namajumlah', e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-2 focus:ring-2 focus:ring-blue-500"
                    maxLength={50}
                  />
                  <input
                    type="number"
                    value={editStats[index]?.jumlah || 0}
                    onChange={(e) => handleStatChange(index, 'jumlah', e.target.value)}
                    min="0"
                    className="w-full px-3 py-2 border rounded text-2xl font-bold focus:ring-2 focus:ring-blue-500"
                  />
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {stat.namajumlah}
                  </h3>
                  <div className="text-4xl font-bold text-blue-600">
                    {stat.jumlah}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          
          <div className="mt-8 space-y-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full md:w-auto mx-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition"
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
            
            {status.error && (
              <div className="p-3 bg-red-100 text-red-800 rounded-md">
                {status.error}
              </div>
            )}
            {status.success && (
              <div className="p-3 bg-green-100 text-green-800 rounded-md">
                {status.success}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default JumlahSiswa;
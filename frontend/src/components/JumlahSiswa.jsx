import { useState, useEffect } from 'react';

const Jumlah = () => {
  const [stats, setStats] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/home');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        
        setStats({
          namajumlah1: data.namajumlah1 || '',
          jumlah1: data.jumlah1 || 0,
          namajumlah2: data.namajumlah2 || '',
          jumlah2: data.jumlah2 || 0,
          namajumlah3: data.namajumlah3 || '',
          jumlah3: data.jumlah3 || 0,
          nama: data.judul || ""
        });
      } catch (error) {
        console.error('Error:', error);
        // Fallback to default values if API fails
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="pb-12 pt-4 bg-white rounded-lg shadow ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4 mt-16 ">
          <h2 className="text-2xl font-bold">Statistik Warga Sekolah {stats.nama}</h2>
        </div>
      </div>
       (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="text-center p-8 bg-gray-50 rounded">
              <h3 className="text-lg font-semibold text-gray-800">
                {stats[`namajumlah${num}`] || `Stat ${num}`}
              </h3>
              <div className="text-3xl font-bold text-blue-600">
                {stats[`jumlah${num}`]}
              </div>
            </div>
          ))}
        </div>
      )
    </div>
  );
};

export default Jumlah;
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
          jumlah3: data.jumlah3 || 0
        });
      } catch (error) {
        console.error('Error:', error);
        // Fallback to default values if API fails
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{stats.namajumlah1}</h3>
            <div className="text-4xl font-bold text-blue-600">{stats.jumlah1}</div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{stats.namajumlah2}</h3>
            <div className="text-4xl font-bold text-blue-600">{stats.jumlah2}</div>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{stats.namajumlah3}</h3>
            <div className="text-4xl font-bold text-blue-600">{stats.jumlah3}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jumlah;
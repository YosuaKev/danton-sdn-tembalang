import { useState, useEffect } from 'react';

const JumlahSiswa = () => {
  const [stats, setStats] = useState({
    namajumlah1: '',
    jumlah1: 0,
    namajumlah2: '',
    jumlah2: 0,
    namajumlah3: '',
    jumlah3: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempStats, setTempStats] = useState({ ...stats });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

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
        setError('Failed to load stats');
      }
    };
    fetchStats();
  }, []);

  const handleEditClick = () => {
    setTempStats({ ...stats });
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempStats(prev => ({
      ...prev,
      [name]: name.startsWith('jumlah') ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setMessage('');

    try {
      // First get the current document to preserve other fields
      const currentData = await fetch('http://localhost:5000/api/home').then(res => res.json());
      
      const response = await fetch('http://localhost:5000/api/home', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...currentData,
          ...tempStats
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.msg || 'Failed to update stats');
      }

      const data = await response.json();
      setStats({
        namajumlah1: data.namajumlah1,
        jumlah1: data.jumlah1,
        namajumlah2: data.namajumlah2,
        jumlah2: data.jumlah2,
        namajumlah3: data.namajumlah3,
        jumlah3: data.jumlah3
      });
      alert('Data updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-16 bg-white rounded-lg shadow ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4 mt-16 ">
          <h2 className="text-2xl font-bold">Statistik Warga Sekolah {stats.nama}</h2>
          {localStorage.getItem('token') && !isEditing && (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {message && <div className="text-green-600 mb-4">{message}</div>}

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="space-y-2">
                <input
                  type="text"
                  name={`namajumlah${num}`}
                  value={tempStats[`namajumlah${num}`]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder={`Stat ${num} Name`}
                />
                <input
                  type="number"
                  name={`jumlah${num}`}
                  value={tempStats[`jumlah${num}`]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder={`Stat ${num} Value`}
                  min="0"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={handleCancelClick}
              className="bg-gray-500 text-white px-4 py-2 rounded"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      ) : (
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
      )}
    </div>
  );
};

export default JumlahSiswa;
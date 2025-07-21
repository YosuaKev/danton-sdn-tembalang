import React, { useState, useEffect } from "react";
import { ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAuthToken = () => {
    return localStorage.getItem('token'); 
  };

  const [header, setHeader] = useState("");
  
    useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:5000/api/home');
              if (response.ok) {
    
                const data = await response.json();
                setHeader({nama: data.judul || ""});
              }
      
            } catch (error) {
              console.error('Error:', error);
              // Fallback to default values if API fails
            } finally {
              setLoading(false);
            }
          };
          fetchData();
        }, []);

  // Fetch all news
  useEffect(() => {
  const fetchNews = async () => {
    try {
      const token = getAuthToken(); // Now using the function
      const response = await fetch("http://localhost:5000/api/berita", {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to fetch news. Status: ${response.status}\n${text}`);
      }

      const data = await response.json();
      setNews(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

    fetchNews();
  }, []);

  if (loading) return <div className="text-center py-12">Loading news...</div>;
  if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Berita Terbaru Di {header.nama}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div 
              key={item.id_berita} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`/berita/${item.id_berita}`)}
            >
              <div className="h-48 overflow-hidden">
                {item.gambar_utama ? (
                  <img
                    src={item.gambar_utama.startsWith('http') 
                      ? item.gambar_utama 
                      : `data:image/jpeg;base64,${item.gambar_utama}`}
                    alt={item.judul}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-300 h-full flex items-center justify-center">
                    <span className="text-gray-600">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{item.judul}</h3>
                <p className="text-blue-600 text-sm mb-3">
                  {new Date(item.tanggal_publikasi).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {item.isi}
                </p>
                <div className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
import React, { useState, useEffect } from "react";
import { ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [header, setHeader] = useState({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/berita");
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Berita Terbaru Di SD Negeri Tembalang
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gray-200 h-48 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Berita Terbaru Di {header.nama}
            </h2>
          </div>
          <div className="text-center py-12">
            <p className="text-red-500">Error loading news: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Berita Terbaru Di {header.nama}
          </h2>
        </div>
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div 
                key={item.id_berita} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => navigate(`/berita/${item.id_berita}`)}
              >
                {item.gambar_utama && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.gambar_utama.startsWith('http') 
                        ? item.gambar_utama 
                        : `data:image/jpeg;base64,${item.gambar_utama}`}
                      alt={item.judul}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.judul}
                  </h3>
                  <p className="text-blue-600 text-sm mb-3">
                    {new Date(item.tanggal_publikasi).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada berita yang tersedia saat ini.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
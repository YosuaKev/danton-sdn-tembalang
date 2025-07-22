import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from 'lucide-react';

const AboutSection = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    deskripsi: "",
    gambar: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profil");
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData({
          deskripsi: data.deskripsi || "",
          gambar: data.gambar || ""
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfil = (e) => {
    e.preventDefault();
    navigate('/profil');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
            </div>
            <div>
              <div className="h-10 bg-gray-200 rounded animate-pulse mb-6 w-3/4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded animate-pulse mt-8 w-48"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">Error loading profile: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div>
            {profileData.gambar ? (
              <img 
                src={profileData.gambar.startsWith('http') 
                  ? profileData.gambar 
                  : `data:image/jpeg;base64,${profileData.gambar}`}
                alt="Profil SD Negeri Tembalang"
                className="rounded-lg h-96 w-full object-cover shadow-md"
              />
            ) : (
              <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
                <span className="text-gray-600">School Image</span>
              </div>
            )}
          </div>

          {/* Right side - Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Profil {header.nama}
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {profileData.deskripsi || "SD Negeri Tembalang adalah sekolah dasar negeri yang berkomitmen untuk memberikan pendidikan berkualitas bagi siswa-siswinya."}
            </p>
            <button 
              onClick={handleProfil} 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Baca Selengkapnya <ChevronRight className="inline ml-1" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
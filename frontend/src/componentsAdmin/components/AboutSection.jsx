import React from "react";
import { useEffect, useState } from "react";
import { Menu, X, User, BookOpen, Users, Trophy, Newspaper, UserCheck, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ChevronRight, GraduationCap, Monitor, Wrench, Calculator, Palette, Camera, Heart, Star } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profil, setProfil] = useState({
    deskripsi: "",
    gambar: "",
  });
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
    const fetchProfil = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/profil");
        const data = await response.json();
        setProfil({
          deskripsi: data.deskripsi || "",
          gambar: data.gambar || "",
        });
      } catch (error) {
        console.error("Gagal memuat profil:", error);
      }
    };

    fetchProfil();
  }, []);

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

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div>
            {profil.gambar ? (
              <img
                src={profil.gambar}
                alt="Foto Sekolah"
                className="rounded-lg shadow-md object-cover w-full h-96"
              />
            ) : (
              <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
                <span className="text-gray-600">Gambar belum tersedia</span>
              </div>
            )}
          </div>

          {/* Right side - Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Profil {header.nama}
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {profil.deskripsi || "Deskripsi belum tersedia."}
            </p>
            <button onClick={() => navigate('/profil')} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
              Baca Selengkapnya
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
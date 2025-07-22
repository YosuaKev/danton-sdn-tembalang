import React, { useState, useEffect } from "react";
import { Menu, X, User, BookOpen, Users, Trophy, Newspaper, UserCheck, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ChevronRight, GraduationCap, Monitor, Wrench, Calculator, Palette, Camera, Heart, Star } from 'lucide-react';

const HeroSection = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/home");
        if (!response.ok) throw new Error("Failed to fetch content");
        const data = await response.json();
        
        setContent({
          judul: data.judul || "",
          subjudul: data.subjudul || "",
          deskripsi: data.deskripsi || "",
          gambar: data.gambar || ""
        });
      } catch (error) {
        console.error("Error fetching hero content:", error);
        // Fallback to default values if API fails
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  items-center pb-36 pt-36">
          {/* Left side - Image */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-200 rounded-lg h-94 flex items-center justify-center overflow-hidden">
              {content.gambar ? (
                <img 
                  src={content.gambar} 
                  alt="School environment" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-600">School Environment Image</span>
              )}
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {content.judul}
            </h1>
            <h2 className="text-xl lg:text-2xl text-blue-600 mb-6">
              {content.subjudul}
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              {content.deskripsi}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://spmb.semarangkota.go.id/" target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
                  Daftar Sekarang
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
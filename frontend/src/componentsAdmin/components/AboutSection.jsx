import React from "react";
import { useState } from "react";
import { Menu, X, User, BookOpen, Users, Trophy, Newspaper, UserCheck, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ChevronRight, GraduationCap, Monitor, Wrench, Calculator, Palette, Camera, Heart, Star } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();
  const handleProfil = (e) => {
    e.preventDefault();
    navigate('/profil')
    }
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div>
            <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-600">Principal/Student Image</span>
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Profil SD Negeri Tembalang
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              SMK Negeri Makassar adalah sekolah menengah kejuruan yang berkomitmen untuk 
              menghasilkan lulusan yang berkualitas dan siap memasuki dunia kerja. Dengan 
              berbagai program keahlian yang sesuai dengan kebutuhan industri, kami telah 
              mencetak ribuan alumni yang sukses di berbagai bidang.
            </p>
            <button onClick={handleProfil} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
              Baca Selengkapnya
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
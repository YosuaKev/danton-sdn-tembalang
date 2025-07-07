import React from "react";
import { useState } from "react";
import { Menu, X, User, BookOpen, Users, Trophy, Newspaper, UserCheck, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ChevronRight, GraduationCap, Monitor, Wrench, Calculator, Palette, Camera, Heart, Star } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Kurikulum Berbasis Industri",
      description: "Program pembelajaran yang disesuaikan dengan kebutuhan industri modern untuk mempersiapkan lulusan yang siap kerja."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Tenaga Pengajar Berpengalaman",
      description: "Guru-guru profesional dengan pengalaman industri yang akan membimbing siswa mencapai potensi terbaik."
    },
    {
      icon: <Wrench className="w-8 h-8 text-blue-600" />,
      title: "Fasilitas Lengkap",
      description: "Laboratorium dan workshop modern dengan peralatan terkini untuk mendukung proses pembelajaran praktik."
    },
    {
      icon: <Trophy className="w-8 h-8 text-blue-600" />,
      title: "Prestasi Gemilang",
      description: "Meraih berbagai prestasi di tingkat regional dan nasional dalam kompetisi akademik dan non-akademik."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Kenapa Harus SD Negeri Tembalang?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection
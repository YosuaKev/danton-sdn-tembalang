import React from "react";
import { useState } from "react";
import { Menu, X, User, BookOpen, Users, Trophy, Newspaper, UserCheck, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ChevronRight, GraduationCap, Monitor, Wrench, Calculator, Palette, Camera, Heart, Star } from 'lucide-react';

const NewsSection = () => {
  const news = [
    {
      title: "Penerimaan Siswa Baru Tahun Ajaran 2024/2025",
      date: "15 Mei 2024",
      image: "news1",
      snippet: "SMK Negeri Makassar membuka pendaftaran siswa baru untuk tahun ajaran 2024/2025..."
    },
    {
      title: "Prestasi Gemilang dalam Lomba Kompetensi Siswa",
      date: "10 Mei 2024",
      image: "news2",
      snippet: "Siswa SMK Negeri Makassar meraih juara pertama dalam kompetisi tingkat provinsi..."
    },
    {
      title: "Kerjasama dengan Industri Terkemuka",
      date: "5 Mei 2024",
      image: "news3",
      snippet: "Penandatanganan MOU dengan beberapa perusahaan untuk program magang siswa..."
    },
    {
      title: "Workshop Teknologi Terbaru",
      date: "1 Mei 2024",
      image: "news4",
      snippet: "Menghadirkan teknologi AI dan IoT dalam pembelajaran untuk siswa..."
    },
    {
      title: "Kegiatan Ekstrakurikuler Semester Genap",
      date: "25 April 2024",
      image: "news5",
      snippet: "Berbagai kegiatan ekstrakurikuler untuk mengembangkan bakat siswa..."
    },
    {
      title: "Pelatihan Guru Berkelanjutan",
      date: "20 April 2024",
      image: "news6",
      snippet: "Program peningkatan kompetensi guru untuk memberikan pendidikan terbaik..."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Berita Terbaru Di SD Negeri Tembalang
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gray-300 h-48 flex items-center justify-center">
                <span className="text-gray-600">News Image {index + 1}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-blue-600 text-sm mb-3">{item.date}</p>
                <p className="text-gray-600 text-sm mb-4">{item.snippet}</p>
                <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
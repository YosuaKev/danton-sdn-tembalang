import React from "react";
import { useState } from "react";
import { Menu, X, User, BookOpen, Users, Trophy, Newspaper, UserCheck, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ChevronRight, GraduationCap, Monitor, Wrench, Calculator, Palette, Camera, Heart, Star } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
    const handleProfil = (e) => {
      e.preventDefault();
      navigate('/profil')
    }
    const handleKontak = (e) => {
    e.preventDefault();
    navigate('/kontak');
    }
    const handleGuru = (e) => {
    e.preventDefault();
    navigate('/guru')
    }
    const handlePrestasi = (e) => {
    e.preventDefault();
    navigate('/prestasi')
    }
    const handleBerita = (e) => {
    e.preventDefault();
    navigate('/berita')
    }
  return (
    <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and Contact Info */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded mr-3"></div>
                <span className="font-semibold text-lg">SDN TEMBALANG</span>
              </div>
              <div className="space-y-2 text-blue-200">
                <p>Jl. Jawaipno No 122, Tembalang, Semarang</p>
                <p>Jawa Tengah 43351, Indonesia</p>
                <p>(024)6708666</p>
                <p>inpakan@smp1.sch.ac.id</p>
              </div>
            </div>
            
            {/* Jelajah */}
            <div>
              <h3 className="text-xl font-bold mb-6">Jelajah</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Sambutan</a></li>
                <li><a href="#about" smooth={true} duration={500} className="cursor-pointer hover:text-white transition-colors duration-200">Profil Sekolah</a></li>
                <li><a href="#news" smooth={true} duration={500} className="cursor-pointer hover:text-white transition-colors duration-200">Berita</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Galeri</a></li>
              </ul>
            </div>
            
            {/* Halaman Umum */}
            <div>
              <h3 className="text-xl font-bold mb-6">Halaman Umum</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" onClick={handleGuru} className="hover:text-white transition-colors duration-200">Data Guru</a></li>
                <li><a href="https://spmb.semarangkota.go.id/sd" className="hover:text-white transition-colors duration-200">SPMB SDN</a></li>
                <li><a href="https://spmb.semarangkota.go.id/assets/content_upload/panduan/Panduan%20Pendaftaran%20SD%202025.pdf" className="hover:text-white transition-colors duration-200">Panduan SPMB</a></li>
                <li><a href="https://maps.app.goo.gl/ZoFMEgttrNr5Ak6g6" className="hover:text-white transition-colors duration-200">Lokasi</a></li>
                <li><a href="#" onClick={handleKontak} className="hover:text-white transition-colors duration-200">Kontak</a></li>
              </ul>
            </div>
            
            {/* Media Sosial */}
            <div>
              <h3 className="text-xl font-bold mb-6">Media Sosial</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <span className="text-blue-200">Facebook Icon</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <span className="text-blue-200">Twitter Icon</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <span className="text-blue-200">Instagram Icon</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2025 SDN TEMBALANG. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
import React from "react";
import { useState } from "react";
import { Menu, X, User, BookOpen, Users, Trophy, Newspaper, UserCheck, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ChevronRight, GraduationCap, Monitor, Wrench, Calculator, Palette, Camera, Heart, Star } from 'lucide-react';

const GallerySection = () => {
  const images = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    alt: `School Activity ${i + 1}`,
    height: i % 3 === 0 ? 'h-64' : i % 2 === 0 ? 'h-48' : 'h-56'
  }));

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Foto Dokumentasi Kegiatan SD Negeri Tembalang
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className={`bg-gray-300 rounded-lg ${image.height} flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer`}>
              <span className="text-gray-600">Photo {image.id}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection
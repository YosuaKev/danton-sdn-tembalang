import React from "react";
import { useState } from "react";
import { Menu, X, User, BookOpen, Users, Trophy, Newspaper, UserCheck, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ChevronRight, GraduationCap, Monitor, Wrench, Calculator, Palette, Camera, Heart, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-600">School Environment Image</span>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 lg:order-2">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              SD Negeri Tembalang
            </h1>
            <h2 className="text-xl lg:text-2xl text-blue-600 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing. 
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, provident.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
                Daftar Sekarang
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-lg font-semibold">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
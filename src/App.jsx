import React, { useState } from 'react';
import { Menu, X, User, BookOpen, Users, Trophy, Newspaper, UserCheck, Phone, Mail, MapPin, Facebook, Instagram, Youtube, ChevronRight, GraduationCap, Monitor, Wrench, Calculator, Palette, Camera, Heart, Star } from 'lucide-react';

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-blue-600">SMK Negeri Makassar</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Profil', 'Jurusan', 'Guru', 'Prestasi', 'Berita', 'Alumni', 'Kontak'].map((item) => (
              <a key={item} href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                {item}
              </a>
            ))}
          </nav>

          {/* Login Button */}
          <div className="hidden md:flex">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Masuk
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {['Home', 'Profil', 'Jurusan', 'Guru', 'Prestasi', 'Berita', 'Alumni', 'Kontak'].map((item) => (
                <a key={item} href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  {item}
                </a>
              ))}
              <button className="w-full mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Masuk
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section Component
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
              SMK Negeri Makassar
            </h1>
            <h2 className="text-xl lg:text-2xl text-blue-600 mb-6">
              Sekolah Kejuruan Terbaik di Makassar
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Mempersiapkan siswa menjadi tenaga kerja yang kompeten dan profesional 
              dengan kurikulum yang sesuai dengan kebutuhan industri modern.
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

// Features Section Component
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
            Kenapa Harus SMK Negeri Makassar?
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

// About Section Component
const AboutSection = () => {
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
              Profil SMK Negeri Makassar
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              SMK Negeri Makassar adalah sekolah menengah kejuruan yang berkomitmen untuk 
              menghasilkan lulusan yang berkualitas dan siap memasuki dunia kerja. Dengan 
              berbagai program keahlian yang sesuai dengan kebutuhan industri, kami telah 
              mencetak ribuan alumni yang sukses di berbagai bidang.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
              Baca Selengkapnya
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Departments Section Component
const DepartmentsSection = () => {
  const departments = [
    {
      icon: <Monitor className="w-8 h-8 text-white" />,
      name: "Teknik Komputer & Jaringan",
      description: "Mempelajari teknologi komputer dan jaringan"
    },
    {
      icon: <Calculator className="w-8 h-8 text-white" />,
      name: "Akuntansi & Keuangan",
      description: "Menguasai bidang akuntansi dan keuangan"
    },
    {
      icon: <Palette className="w-8 h-8 text-white" />,
      name: "Desain Komunikasi Visual",
      description: "Kreativitas dalam desain visual"
    },
    {
      icon: <Wrench className="w-8 h-8 text-white" />,
      name: "Teknik Mesin",
      description: "Keahlian dalam bidang teknik mesin"
    },
    {
      icon: <Camera className="w-8 h-8 text-white" />,
      name: "Multimedia",
      description: "Produksi konten multimedia"
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      name: "Keperawatan",
      description: "Pelayanan kesehatan dan keperawatan"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-white" />,
      name: "Administrasi Perkantoran",
      description: "Manajemen administrasi perkantoran"
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      name: "Pemasaran",
      description: "Strategi pemasaran dan penjualan"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Jurusan Di SMK Negeri Makassar
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <div key={index} className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors">
              <div className="flex justify-center mb-4">
                {dept.icon}
              </div>
              <h3 className="text-lg font-semibold text-center mb-2">{dept.name}</h3>
              <p className="text-blue-100 text-center text-sm">{dept.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Ahmad Rizki",
      role: "Siswa XII RPL",
      image: "AR",
      text: "SMK Negeri Makassar memberikan pendidikan yang sangat berkualitas. Saya merasa siap menghadapi dunia kerja setelah lulus nanti."
    },
    {
      name: "Siti Nurhaliza",
      role: "Siswa XII AKL",
      image: "SN",
      text: "Fasilitas yang lengkap dan guru-guru yang berpengalaman membuat saya semakin termotivasi untuk belajar dan berkarya."
    },
    {
      name: "Muhammad Fajar",
      role: "Siswa XII TKJ",
      image: "MF",
      text: "Program magang industri di SMK Negeri Makassar sangat membantu saya memahami dunia kerja yang sesungguhnya."
    }
  ];

  return (
    <section className="py-20 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Testimoni Siswa
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.image}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-blue-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// News Section Component
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
            Berita Terbaru Di SMK Negeri Makassar
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

// Gallery Section Component
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
            Foto Dokumentasi Kegiatan SMK Negeri Makassar
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

// Alumni Section Component
const AlumniSection = () => {
  const alumni = [
    {
      name: "Andi Pratama",
      profession: "Software Engineer di PT. Teknologi Maju",
      image: "AP",
      description: "Lulusan TKJ 2020 yang kini bekerja sebagai software engineer di perusahaan teknologi terkemuka."
    },
    {
      name: "Nurul Fadillah",
      profession: "Accounting Manager di PT. Mandiri Sejahtera",
      image: "NF",
      description: "Alumni jurusan Akuntansi 2019 yang berhasil meraih posisi manajer di perusahaan besar."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Profil Alumni SMK Negeri Makassar
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {alumni.map((person, index) => (
            <div key={index} className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
                {person.image}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{person.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{person.profession}</p>
                <p className="text-gray-600">{person.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">SMK Negeri Makassar</h3>
            <p className="text-gray-400 mb-6">
              Sekolah Menengah Kejuruan yang berkomitmen menghasilkan lulusan berkualitas 
              dan siap kerja sesuai kebutuhan industri.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2">
              {['Home', 'Profil', 'Jurusan', 'Guru', 'Prestasi', 'Berita', 'Alumni', 'Kontak'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  Jl. Pendidikan No. 123<br />
                  Makassar, Sulawesi Selatan
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">(0411) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">info@smknegerimakassar.sch.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 SMK Negeri Makassar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <DepartmentsSection />
      <TestimonialsSection />
      <NewsSection />
      <GallerySection />
      <AlumniSection />
      <Footer />
    </div>
  );
};

export default App;
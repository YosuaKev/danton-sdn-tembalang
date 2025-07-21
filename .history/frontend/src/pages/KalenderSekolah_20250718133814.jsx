import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Akademik = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
    const handleHome = (e) => {
    e.preventDefault();
    navigate('/')
    }
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
    window.open('https://sangjuara.semarangkota.go.id/', '_blank');
    }
    const handleBerita = (e) => {
    e.preventDefault();
    navigate('/berita')
    }

  const academicEvents = [
    {
      id: 1,
      title: "Upacara Bendera Mingguan",
      date: "2025-07-14",
      time: "07:00 - 08:00",
      location: "Lapangan Sekolah",
      category: "Upacara",
      description: "Upacara bendera rutin setiap hari Senin"
    },
    {
      id: 2,
      title: "Ulangan Harian Matematika",
      date: "2025-07-15",
      time: "08:00 - 09:30",
      location: "Ruang Kelas",
      category: "Akademik",
      description: "Ulangan harian mata pelajaran Matematika untuk kelas 4-6"
    },
    {
      id: 3,
      title: "Pelatihan Pramuka",
      date: "2025-07-16",
      time: "14:00 - 16:00",
      location: "Aula Sekolah",
      category: "Ekstrakurikuler",
      description: "Kegiatan pelatihan pramuka untuk siswa kelas 3-6"
    },
    {
      id: 4,
      title: "Rapat Komite Sekolah",
      date: "2025-07-17",
      time: "19:00 - 21:00",
      location: "Ruang Kepala Sekolah",
      category: "Rapat",
      description: "Rapat bulanan komite sekolah dengan orang tua"
    },
    {
      id: 5,
      title: "Lomba Mewarnai Kelas 1-2",
      date: "2025-07-18",
      time: "09:00 - 11:00",
      location: "Ruang Kelas 1-2",
      category: "Kompetisi",
      description: "Lomba mewarnai untuk siswa kelas 1 dan 2"
    },
    {
      id: 6,
      title: "Senam Pagi Bersama",
      date: "2025-07-19",
      time: "06:30 - 07:30",
      location: "Lapangan Sekolah",
      category: "Olahraga",
      description: "Senam pagi bersama untuk seluruh siswa"
    },
    {
      id: 7,
      title: "Ulangan Tengah Semester",
      date: "2025-07-21",
      time: "08:00 - 10:00",
      location: "Ruang Kelas",
      category: "Akademik",
      description: "Ulangan tengah semester untuk semua mata pelajaran"
    },
    {
      id: 8,
      title: "Bakti Sosial",
      date: "2025-07-25",
      time: "08:00 - 12:00",
      location: "Desa Tembalang",
      category: "Sosial",
      description: "Kegiatan bakti sosial di lingkungan sekitar sekolah"
    }
  ];

  const upcomingActivities = [
    {
      id: 1,
      title: "Persiapan Lomba Olimpiade Sains",
      date: "2025-08-01",
      participants: "15 siswa",
      status: "Pendaftaran"
    },
    {
      id: 2,
      title: "Pelatihan Guru Kurikulum Merdeka",
      date: "2025-08-05",
      participants: "20 guru",
      status: "Berlangsung"
    },
    {
      id: 3,
      title: "Kunjungan Perpustakaan Daerah",
      date: "2025-08-10",
      participants: "60 siswa",
      status: "Perencanaan"
    },
    {
      id: 4,
      title: "Festival Seni Budaya",
      date: "2025-08-17",
      participants: "150 siswa",
      status: "Persiapan"
    }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return academicEvents.filter(event => event.date === dateStr);
  };

  const filteredEvents = academicEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded mr-3"></div>
              <span className="font-semibold text-lg">SDN TEMBALANG</span>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <button onClick={handleHome} className="hover:text-blue-600 transition-colors duration-200">Beranda</button>
              <button onClick={handleProfil} className="hover:text-blue-600 transition-colors duration-200">Profil</button>
              <button onClick={handleGuru} className="hover:text-blue-600 transition-colors duration-200">Guru</button>
              <button onClick={handleBerita} className="hover:text-blue-600 transition-colors duration-200">Berita</button>
              <button onClick={handlePrestasi} className="hover:text-blue-600 transition-colors duration-200">Prestasi</button>
              <a href="#" className="hover:text-blue-600 transition-colors duration-200 border-b-2 border-blue-400">Akademik</a>
              <button onClick={handleKontak} className="hover:text-blue-600 transition-colors duration-200">Kontak</button>
            </nav>
            
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Kalender Akademik</h1>
          <p className="text-gray-600 text-lg">Jadwal kegiatan dan acara sekolah SDN Tembalang</p>
        </div>

        {/* Search Box */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari kegiatan atau acara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="p-3 text-center font-semibold text-gray-600 bg-gray-50">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentDate).map((day, index) => {
                  const events = getEventsForDate(day);
                  const hasEvents = events.length > 0;
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[80px] p-2 border border-gray-200 ${
                        day ? 'hover:bg-gray-50 cursor-pointer' : ''
                      } ${hasEvents ? 'bg-blue-50' : ''}`}
                      onClick={() => day && setSelectedDate(day)}
                    >
                      {day && (
                        <>
                          <div className="font-semibold text-sm mb-1">{day}</div>
                          {events.slice(0, 2).map(event => (
                            <div
                              key={event.id}
                              className={`text-xs px-2 py-1 rounded mb-1 ${(event.category)}`}
                            >
                              {event.title.substring(0, 15)}...
                            </div>
                          ))}
                          {events.length > 2 && (
                            <div className="text-xs text-gray-500">+{events.length - 2} lagi</div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Events List */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Daftar Kegiatan</h3>
              <div className="space-y-4">
                {filteredEvents.map(event => (
                  <div key={event.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 mr-3">{event.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${(event.category)}`}>
                            {event.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(event.date).toLocaleDateString('id-ID', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Upcoming Activities */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-blue-900 mb-6">Kegiatan Mendatang</h3>
              <div className="space-y-4">
                {upcomingActivities.map(activity => (
                  <div key={activity.id} className="border-l-4 border-blue-600 pl-4 py-3">
                    <h4 className="font-semibold text-gray-900 mb-2">{activity.title}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(activity.date).toLocaleDateString('id-ID')}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {activity.participants}
                      </div>
                      <div className="mt-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          activity.status === 'Berlangsung' ? 'bg-green-100 text-green-800' :
                          activity.status === 'Pendaftaran' ? 'bg-blue-100 text-blue-800' :
                          activity.status === 'Persiapan' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Informasi Penting</h4>
                <p className="text-sm text-blue-800">
                  Untuk informasi lebih lanjut tentang kegiatan sekolah, silakan hubungi bagian Tata Usaha atau kunjungi website resmi sekolah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
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
            
            <div>
              <h3 className="text-xl font-bold mb-6">Jelajah</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Sambutan</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Profil Sekolah</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Berita</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Galeri</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Halaman Umum</h3>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Data Guru</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">PPDB SDN</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Panduan PPDB</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Lokasi</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Kontak</a></li>
              </ul>
            </div>
            
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
            <p>&copy; 2024 SDN TEMBALANG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Akademik;
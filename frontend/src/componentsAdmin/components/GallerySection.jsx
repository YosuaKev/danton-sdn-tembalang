import React, { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut, X, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

const GallerySection = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const [header, setHeader] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/home');
        if (response.ok) {
          const data = await response.json();
          setHeader({ nama: data.judul || "" });
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/galeri");
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        setImages(data.data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // Zoom handlers
  const handleZoom = (direction) => {
    if (direction === 'in') {
      setZoomLevel(prev => Math.min(prev + 0.25, 3));
    } else {
      setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
    }
    setPosition({ x: 0, y: 0 });
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Drag handlers
  const handleMouseDown = (e) => {
    if (zoomLevel === 1) return;
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoomLevel === 1) return;
    
    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;
    
    if (imageRef.current) {
      const maxX = (imageRef.current.offsetWidth * (zoomLevel - 1)) / 2;
      const maxY = (imageRef.current.offsetHeight * (zoomLevel - 1)) / 2;
      
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (loading) {
    return (
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Foto Dokumentasi Kegiatan {header.nama}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                className="bg-gray-200 rounded-lg h-64"
              ></motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 relative"
        >
          <div className="flex justify-center items-center gap-4 relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Foto Dokumentasi Kegiatan {header.nama}
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/galeri')}
              className="absolute right-0 inline-flex items-center justify-center p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              title="Edit Gallery"
            >
              <Edit size={20} />
            </motion.button>
          </div>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id_galeri}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-300 rounded-lg h-64 overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() => {
                setZoomedImage(
                  image.gambar.startsWith("http") || image.gambar.startsWith("data:")
                    ? image.gambar
                    : `data:image/jpeg;base64,${image.gambar}`
                );
                setZoomLevel(1);
              }}
            >
              <motion.img
                src={image.gambar.startsWith("http") || image.gambar.startsWith("data:") 
                  ? image.gambar 
                  : `data:image/jpeg;base64,${image.gambar}`}
                alt={`School Activity ${image.id_galeri}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <motion.div 
              className="relative max-w-6xl w-full max-h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setZoomedImage(null);
                  resetZoom();
                }}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full z-10"
              >
                <X size={24} />
              </motion.button>
              
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleZoom('in')} 
                  className="text-white bg-black/50 p-2 rounded-full"
                  disabled={zoomLevel >= 3}
                >
                  <ZoomIn size={20} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleZoom('out')} 
                  className="text-white bg-black/50 p-2 rounded-full"
                  disabled={zoomLevel <= 0.5}
                >
                  <ZoomOut size={20} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetZoom} 
                  className="text-white bg-black/50 p-2 rounded-full text-sm px-3"
                >
                  Reset
                </motion.button>
              </div>
              
              <div 
                className="w-full h-full overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
              >
                <motion.img
                  ref={imageRef}
                  src={zoomedImage}
                  alt="Zoomed"
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: zoomLevel }}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease'
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default GallerySection;
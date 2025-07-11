import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomePage from "./pages/Homepage";
import ProfilPage from "./pages/ProfilSekolah";
import BeritaPage from"./pages/BeritaSekolah";
import PrestasiPage from "./pages/PrestasiSekolah";
import DataGuruPage from "./pages/GuruSekolah";
import KontakPage from "./pages/KontakSekolah";
import AkademikPage from "./pages/AkademikSekolah";
import LoginPage from "./admin/LoginPage";
import BeritaAdmin from "./admin/BeritaAdmin";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<HomePage/>}/>
        <Route path="/profil" element={<ProfilPage/>}/>
        <Route path="/berita" element={<BeritaPage/>}/>
        <Route path="/prestasi" element={<PrestasiPage/>}/>
        <Route path="/guru" element={<DataGuruPage/>}/> 
        <Route path="/kontak" element={<KontakPage/>}/>
        <Route path="/akademik" element={<AkademikPage/>}/>
        <Route path="/admin" element={<LoginPage/>}/>
        <Route path="/beritaadmin" element={<BeritaAdmin/>}/>
      </Routes>
    </Router>
  )
};

export default App;
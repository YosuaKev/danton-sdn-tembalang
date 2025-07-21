import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/Homepage";
import ProfilPage from "./pages/ProfilSekolah";
import BeritaPage from"./pages/BeritaSekolah";
import PrestasiPage from "./pages/PrestasiSekolah";
import DataGuruPage from "./pages/GuruSekolah";
import KontakPage from "./pages/KontakSekolah";
import AkademikPage from "./pages/AkademikSekolah";
import LoginPage from "./admin/LoginPage";
import BeritaAdmin from "./admin/BeritaAdmin";
import HomeAdmin from "./admin/HomepageAdmin";
import SiswaAdmin from "./admin/siswaAdmin";
import GuruAdmin from "./admin/GuruAdmin";
import Kale from "./admin/AkademikAdmin";
import DetailBerita from "./admin/detailBerita";
import ProfilAdmin from "./admin/ProfilAdmin";
import GaleriAdmin from "./admin/GaleriAdmin";
import KontakAdmin from "./admin/KontakAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<HomePage/>}/>
        <Route path="/profil" element={<ProfilPage/>}/>
        <Route path="/berita" element={<BeritaPage/>}/>
        <Route path="/guru" element={<DataGuruPage/>}/> 
        <Route path="/kontak" element={<KontakPage/>}/>
        <Route path="/akademik" element={<AkademikPage/>}/>
        <Route path="/admin" element={<LoginPage/>}/>
        <Route path="/beritaadmin" element={<BeritaAdmin/>}/>
        <Route path="/berita/:id" element={<DetailBerita/>}/>
        <Route path="/homeadmin" element={<HomeAdmin/>}/>
        <Route path="/siswaadmin" element={<SiswaAdmin/>}/>
        <Route path="/guruadmin" element={<GuruAdmin/>}/>
        <Route path="/akademikadmin" element={<AkademikAdmin/>}/>
        <Route path="/profiladmin" element={<ProfilAdmin/>}/>
        <Route path="/galeri" element={<GaleriAdmin />} />
        <Route path="/kontakadmin" element={<KontakAdmin />} />
      </Routes>
    </Router>
  )
};

export default App;
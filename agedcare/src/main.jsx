import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Apresentacao from './pages/Apresentacao/index.jsx';
import Login from './pages/Login/index.jsx';
import NewUser from './pages/NewUser/index.jsx';
import Home from './pages/Home/index.jsx';
import Buscar from './pages/Buscar/index.jsx';
import Perfil from './pages/Perfil/index.jsx';
import TecnicoInfo from './pages/TecnicoInfo/index.jsx';
import PerfilTec from './pages/PerfilTec/index.jsx';
import FormTec from './pages/FormTec/index.jsx';
import Configs from './pages/Configs/index.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Apresentacao />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/NewUser" element={<NewUser />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/TecnicoInfo/:id" element={<TecnicoInfo />} /> {/* Updated */}
        <Route path="/Buscar" element={<Buscar />} />
        <Route path="/PerfilTec" element={<PerfilTec />} />
        <Route path="/FormTec" element={<FormTec />} />
        <Route path="/Configs" element={<Configs />} />
        
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

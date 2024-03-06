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
import Tecnicos from './pages/Tecnicos/index.jsx';
import FormTec from './pages/FormTec/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Apresentacao />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/NewUser" element={<NewUser />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Tecnicos" element={<Tecnicos />} />
        <Route path="/Buscar" element={<Buscar />} />
        <Route path="/FormTec" element={<FormTec />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
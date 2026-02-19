import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar'; 
import Home from './pages/Home/Home'; 
import Ranking from './pages/Ranking/Ranking'; 
import Miembros from './pages/Miembros/Miembros';
import Calificaciones from './pages/Calificaciones/Calificaciones';
import MiembrosVista from './pages/MiembrosVista/MiembrosVista';
import Estilos from './pages/Estilos/Estilos';

const App = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#020617', width: '100vw' }}>
      
      {/* SIDEBAR GLOBAL: Siempre visible en todas las rutas */}
      <Sidebar /> 

      {/* CONTENIDO DINÁMICO: Renderiza según la URL seleccionada */}
      <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          {/* Ruta Raíz: Dashboard Principal */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta Ranking: Tabla de posiciones sincronizada con Azure */}
          <Route path="/ranking" element={<Ranking />} />
          
          {/* Ruta Miembros: Gestión y edición de la tripulación */}
          <Route path="/miembros" element={<Miembros />} />

          {/* Gestion de Calificaciones de la Crew */}
          <Route path="/calificaciones" element={<Calificaciones />} />

          <Route path="/miembros-vista" element={<MiembrosVista />} />

          <Route path="/estilos" element={<Estilos />} />
        </Routes>
      </main>

    </div>
  );
};

export default App;
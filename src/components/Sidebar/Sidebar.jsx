import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Users, Music, Database, Zap } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(null);

  // Función para saber qué item resaltar
  const isActive = (path) => location.pathname === path;

  // Función constructora para los items del menú (Mantiene el código limpio)
  const NavItem = ({ path, icon: Icon, label, neonColor }) => {
    const active = isActive(path);
    const hovered = hoveredPath === path;
    const isHighlighted = active || hovered;

    return (
      <div 
        onClick={() => navigate(path)}
        onMouseEnter={() => setHoveredPath(path)}
        onMouseLeave={() => setHoveredPath(null)}
        style={{
          ...navItemBase,
          backgroundColor: active ? `${neonColor}15` : hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
          borderRight: active ? `4px solid ${neonColor}` : '4px solid transparent',
          color: isHighlighted ? '#fff' : '#64748b',
          boxShadow: active ? `inset -10px 0 20px -10px ${neonColor}50` : 'none',
        }}
      >
        <Icon 
          size={20} 
          color={isHighlighted ? neonColor : '#64748b'} 
          style={{ filter: isHighlighted ? `drop-shadow(0 0 8px ${neonColor})` : 'none', transition: 'all 0.3s' }} 
        />
        <span style={{ 
          fontWeight: isHighlighted ? '800' : '500', 
          letterSpacing: '1px',
          textShadow: isHighlighted ? `0 0 10px ${neonColor}40` : 'none'
        }}>
          {label}
        </span>
      </div>
    );
  };

  return (
    <aside style={sidebarStyle}>
      {/* SECCIÓN LOGO: Neón Dorado */}
      <div style={logoSection}>
        <div style={logoIcon}>
          <Zap size={24} fill="#fbbf24" color="#fbbf24" style={{ filter: 'drop-shadow(0 0 10px #fbbf24)' }} />
        </div>
        <span style={logoText}>DELTA</span>
      </div>
      
      {/* NAVEGACIÓN: Con colores neon asignados a cada ruta */}
      <nav style={{ flex: 1, padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <NavItem path="/" icon={Layout} label="DASHBOARD" neonColor="#00ffcc" />
        <NavItem path="/miembros-vista" icon={Users} label="MIEMBROS" neonColor="#f43f5e" />
        <NavItem path="/estilos" icon={Music} label="ESTILOS" neonColor="#818cf8" />
        
        {/* Este es de vista decorativa por ahora */}
        <div style={{...navItemBase, color: '#475569', cursor: 'not-allowed', marginTop: '20px'}}>
          <Database size={20} color="#475569" />
          <span style={{ letterSpacing: '1px' }}>AZURE CLOUD</span>
        </div>
      </nav>

      {/* SECCIÓN USUARIO: Perfil Lead Developer */}
      <div style={userBrief}>
        <div style={avatarContainer}>
          <div style={avatar}>JL</div>
        </div>
        <div style={{ marginLeft: '12px' }}>
          <p style={userName}>Jose Gerson</p>
          <p style={userRole}>Lead Developer</p>
        </div>
      </div>
    </aside>
  );
};

// --- ESTILOS URBANOS Y CYBERPUNK ---

const sidebarStyle = { 
  width: '280px', 
  backgroundColor: '#05050a', // Oscuro profundo para resaltar neones
  borderRight: '1px solid #1e293b',
  boxShadow: '5px 0 30px rgba(0,0,0,0.5)', // Sombra hacia la derecha
  display: 'flex', 
  flexDirection: 'column', 
  padding: '20px 0',
  zIndex: 50
};

const logoSection = { 
  padding: '20px 30px', 
  display: 'flex', 
  alignItems: 'center', 
  gap: '15px', 
  marginBottom: '20px' 
};

const logoIcon = { 
  backgroundColor: 'rgba(251, 191, 36, 0.1)', 
  padding: '10px', 
  borderRadius: '12px',
  border: '1px solid rgba(251, 191, 36, 0.3)',
  boxShadow: '0 0 15px rgba(251, 191, 36, 0.2)'
};

const logoText = { 
  fontSize: '28px', 
  fontWeight: '900', 
  letterSpacing: '3px', 
  color: 'transparent',
  WebkitTextStroke: '1.5px #fbbf24', // Estilo Hueco Grafiti
  textShadow: '0 0 15px rgba(251, 191, 36, 0.5)', // Resplandor dorado
  fontFamily: '"Impact", "Arial Black", sans-serif'
};

const navItemBase = { 
  display: 'flex', 
  alignItems: 'center', 
  gap: '15px', 
  padding: '16px 30px', 
  cursor: 'pointer', 
  transition: 'all 0.3s ease',
  fontSize: '13px'
};

const userBrief = { 
  padding: '25px 30px', 
  borderTop: '1px solid #1e293b', 
  marginTop: 'auto', 
  display: 'flex', 
  alignItems: 'center',
  background: 'linear-gradient(to top, rgba(99, 102, 241, 0.05) 0%, transparent 100%)'
};

const avatarContainer = {
  padding: '2px',
  background: 'linear-gradient(135deg, #00ffcc 0%, #6366f1 100%)', // Borde gradiente urbano
  borderRadius: '14px',
  boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
};

const avatar = { 
  width: '42px', 
  height: '42px', 
  borderRadius: '12px', 
  backgroundColor: '#0f172a', // Centro oscuro
  color: '#fff',
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center', 
  fontWeight: '900',
  fontSize: '16px',
  letterSpacing: '1px'
};

const userName = { fontSize: '14px', fontWeight: '800', color: '#f8fafc', letterSpacing: '0.5px' };
const userRole = { fontSize: '11px', color: '#00ffcc', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '3px', fontWeight: 'bold' };

export default Sidebar;
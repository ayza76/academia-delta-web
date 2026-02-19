import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Hash, Loader2, Search, Zap, Crosshair } from 'lucide-react';
import axios from 'axios';

const MiembrosVista = () => {
  const navigate = useNavigate();
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchMiembros = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/miembros');
        setMiembros(response.data);
      } catch (error) {
        console.error("Error al cargar la vista de miembros:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMiembros();
  }, []);

  const miembrosFiltrados = miembros.filter(m => 
    m.Aka.toLowerCase().includes(filtro.toLowerCase()) || 
    m.Nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={pageContainer}>
      {/* Luces de Neón de Fondo (Magenta/Rojo Neón) */}
      <div style={glowBgTop}></div>
      <div style={glowBgBottom}></div>

      <div style={contentWrapper}>
        <header style={headerSection}>
          
          
          <div style={titleBadge}><User size={14}/> Base de Datos</div>
          <h1 style={titleStyle}>ROSTER DE <span style={neonText}>AGENTES</span></h1>
          <p style={subtitleStyle}>Visualización de inteligencia y perfiles de la tripulación DELTA.</p>
          
          {/* Buscador Cyber */}
          <div style={searchWrapper}>
            <div style={searchContainer}>
              <Search size={20} color="#f43f5e" style={{ filter: 'drop-shadow(0 0 5px #f43f5e)' }} />
              <input 
                style={searchInput} 
                placeholder="ESCRIBE AKA O NOMBRE LEGAL..." 
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
            {filtro && (
              <div style={searchResultText}>
                {miembrosFiltrados.length} {miembrosFiltrados.length === 1 ? 'MATCH' : 'MATCHES'} ENCONTRADOS
              </div>
            )}
          </div>
        </header>

        {loading ? (
          <div style={loaderStyle}>
            <Loader2 className="animate-spin" size={50} style={{ filter: 'drop-shadow(0 0 15px #f43f5e)' }} />
            <span style={{ letterSpacing: '3px', marginTop: '20px', fontWeight: 'bold' }}>DESENCRIPTANDO PERFILES...</span>
          </div>
        ) : (
          <div style={gridContainer}>
            {miembrosFiltrados.map((m) => {
              const isHovered = hoveredCard === m.IdIntegrante;
              
              return (
                <div 
                  key={m.IdIntegrante} 
                  style={{
                    ...memberCard,
                    borderColor: isHovered ? '#f43f5e' : '#1e293b',
                    boxShadow: isHovered ? '0 15px 35px rgba(244, 63, 94, 0.2), inset 0 0 20px rgba(244, 63, 94, 0.05)' : '0 10px 30px rgba(0,0,0,0.5)',
                    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)'
                  }}
                  onMouseEnter={() => setHoveredCard(m.IdIntegrante)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Encabezado de la Tarjeta (Tipo ID) */}
                  <div style={{...cardHeader, borderBottom: isHovered ? '1px solid #f43f5e40' : '1px solid #1e293b'}}>
                    <div style={{...profileCircle, boxShadow: isHovered ? '0 0 15px #f43f5e' : 'none'}}>
                      {m.Aka.charAt(0)}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                      <div style={idBadge}>ID // {m.IdIntegrante.toString().padStart(4, '0')}</div>
                      {isHovered && <Crosshair size={14} color="#f43f5e" style={{ animation: 'pulse 1.5s infinite' }} />}
                    </div>
                  </div>
                  
                  {/* Cuerpo de Información */}
                  <div style={cardBody}>
                    <h3 style={akaTitle}>{m.Aka}</h3>
                    <p style={fullName}>{m.Nombre}</p>
                    
                    <div style={infoGrid}>
                      <div style={infoItem}>
                        <div style={infoIconBox}><User size={14} color="#f43f5e" /></div>
                        <div style={infoTextColumn}>
                          <span style={infoLabel}>EDAD BIOLÓGICA</span>
                          <span style={infoValue}>{m.Edad} AÑOS</span>
                        </div>
                      </div>
                      <div style={infoItem}>
                        <div style={infoIconBox}><Calendar size={14} color="#f43f5e" /></div>
                        <div style={infoTextColumn}>
                          <span style={infoLabel}>REGISTRO INICIAL</span>
                          <span style={infoValue}>{m.FechaIngreso}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pie de Tarjeta (Estado) */}
                  <div style={cardFooter}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{...statusDot, boxShadow: isHovered ? '0 0 12px #22c55e' : '0 0 5px #22c55e80'}}></span> 
                      <span style={{ color: isHovered ? '#fff' : '#64748b', transition: 'color 0.3s' }}>ACTIVO EN SISTEMA</span>
                    </div>
                    {isHovered && <Zap size={14} color="#fbbf24" style={{ filter: 'drop-shadow(0 0 5px #fbbf24)' }}/>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// --- ESTILOS URBANOS Y CYBERPUNK ---

const pageContainer = { backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' };
const contentWrapper = { padding: '50px', position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto' };

// Luces Neón de Fondo (Rojo/Magenta)
const glowBgTop = { position: 'fixed', top: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(244, 63, 94, 0.08) 0%, rgba(0,0,0,0) 60%)', zIndex: 0, pointerEvents: 'none' };
const glowBgBottom = { position: 'fixed', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, rgba(0,0,0,0) 60%)', zIndex: 0, pointerEvents: 'none' };

const headerSection = { marginBottom: '50px', marginTop: '10px' };

const backBtn = { display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(30, 41, 59, 0.5)', color: '#94a3b8', border: '1px solid #334155', cursor: 'pointer', fontSize: '12px', marginBottom: '30px', padding: '10px 20px', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s' };

const titleBadge = { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', backgroundColor: '#f43f5e20', color: '#f43f5e', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px', border: '1px solid #f43f5e40' };
const titleStyle = { fontSize: '42px', fontWeight: '900', margin: '0 0 10px 0', letterSpacing: '-1px', fontFamily: '"Impact", "Arial Black", sans-serif' };
const neonText = { color: 'transparent', WebkitTextStroke: '2px #f43f5e', textShadow: '0 0 15px rgba(244, 63, 94, 0.6)', letterSpacing: '2px' };
const subtitleStyle = { color: '#94a3b8', fontSize: '16px', letterSpacing: '0.5px', marginBottom: '35px' };

// --- BUSCADOR CYBER ---
const searchWrapper = { display: 'flex', flexDirection: 'column', gap: '10px' };
const searchContainer = { display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: '18px 25px', borderRadius: '16px', border: '1px solid #f43f5e50', maxWidth: '500px', boxShadow: 'inset 0 0 20px rgba(244, 63, 94, 0.1), 0 10px 20px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' };
const searchInput = { background: 'none', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '16px', fontFamily: 'monospace', letterSpacing: '1px' };
const searchResultText = { fontSize: '11px', color: '#f43f5e', fontFamily: 'monospace', letterSpacing: '1px', marginLeft: '10px', fontWeight: 'bold' };

// --- GRID Y TARJETAS ---
const gridContainer = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' };

const memberCard = { backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)', borderRadius: '24px', border: '1px solid #1e293b', overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', position: 'relative' };

const cardHeader = { padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)', transition: 'border 0.3s' };
const profileCircle = { width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#05050a', border: '2px solid #f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '900', color: '#f43f5e', transition: 'box-shadow 0.3s' };
const idBadge = { fontSize: '11px', color: '#cbd5e1', backgroundColor: '#0f172a', padding: '6px 12px', borderRadius: '6px', fontFamily: 'monospace', border: '1px solid #334155', fontWeight: 'bold' };

const cardBody = { padding: '25px' };
const akaTitle = { fontSize: '26px', fontWeight: '900', margin: '0 0 5px 0', letterSpacing: '1px', textTransform: 'uppercase' };
const fullName = { color: '#64748b', fontSize: '13px', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px' };

const infoGrid = { display: 'flex', flexDirection: 'column', gap: '15px' };
const infoItem = { display: 'flex', alignItems: 'center', gap: '15px' };
const infoIconBox = { backgroundColor: '#f43f5e15', padding: '8px', borderRadius: '8px', border: '1px solid #f43f5e30' };
const infoTextColumn = { display: 'flex', flexDirection: 'column', gap: '2px' };
const infoLabel = { fontSize: '10px', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px' };
const infoValue = { fontSize: '14px', color: '#f8fafc', fontWeight: 'bold', fontFamily: 'monospace' };

const cardFooter = { padding: '15px 25px', borderTop: '1px solid rgba(30, 41, 59, 0.5)', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const statusDot = { width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block' };

const loaderStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', color: '#f43f5e' };

export default MiembrosVista;
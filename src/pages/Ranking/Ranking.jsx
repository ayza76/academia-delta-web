import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Loader2, Zap } from 'lucide-react';
import axios from 'axios';

const Ranking = () => {
  const navigate = useNavigate();
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/ranking');
        setRankingData(response.data);
      } catch (error) {
        console.error("Error al conectar con Azure:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={pageContainer}>
      {/* Fondo con luces de calle sutiles */}
      <div style={glowBgTop}></div>
      <div style={glowBgBottom}></div>

      <div style={contentWrapper}>
        

        <header style={headerStyle}>
          <div style={titleBadge}>Leaderboard</div>
          <h1 style={titleStyle}>
            RANKING OFICIAL <span style={neonText}>DELTA</span>
          </h1>
          <p style={subtitleStyle}>Métricas integrales sincronizadas en tiempo real con Azure Cloud.</p>
        </header>

        {loading ? (
          <div style={loaderContainer}>
            <Loader2 className="animate-spin" size={40} style={{ filter: 'drop-shadow(0 0 10px #00ffcc)' }} />
            <span style={{ letterSpacing: '2px', fontSize: '14px', marginTop: '10px' }}>CARGANDO DATOS...</span>
          </div>
        ) : (
          <div style={tableContainer}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155', textAlign: 'left', background: 'rgba(15, 23, 42, 0.8)' }}>
                  <th style={thStyle}>Pos</th>
                  <th style={thStyle}>AKA</th>
                  <th style={thStyle}>Hip Hop</th>
                  <th style={thStyle}>Breaking</th>
                  <th style={thStyle}>Waacking</th>
                  <th style={thStyle}>Popping</th>
                  <th style={thStyle}>House</th>
                  <th style={thStyleTotal}>Total</th>
                  <th style={thStyle}>Rango</th>
                </tr>
              </thead>
              <tbody>
                {rankingData.map((user, index) => {
                  const isTop = user.Puesto === 1;
                  const isHovered = hoveredRow === index;
                  
                  return (
                    <tr 
                      key={user.Aka} 
                      style={{
                        ...trStyle,
                        backgroundColor: isHovered ? 'rgba(30, 41, 59, 0.6)' : isTop ? 'rgba(251, 191, 36, 0.05)' : 'transparent',
                        boxShadow: isHovered ? 'inset 4px 0 0 #00ffcc' : isTop ? 'inset 4px 0 0 #fbbf24' : 'inset 4px 0 0 transparent'
                      }}
                      onMouseEnter={() => setHoveredRow(index)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      {/* PUESTO */}
                      <td style={tdStyle}>
                        {isTop ? (
                          <div style={topRankBadge}>
                            <Trophy size={16} color="#000" />
                          </div>
                        ) : (
                          <span style={normalRank}>#{user.Puesto}</span>
                        )}
                      </td>
                      
                      {/* AKA */}
                      <td style={{ ...tdStyle, fontWeight: '900', color: isTop ? '#fbbf24' : '#f8fafc', letterSpacing: '1px' }}>
                        {user.Aka} {isTop && <Zap size={14} style={{ display: 'inline', marginLeft: '5px' }} />}
                      </td>
                      
                      {/* NOTAS */}
                      <td style={tdStyleNum}>{user['Hip Hop']}</td>
                      <td style={tdStyleNum}>{user.Breaking}</td>
                      <td style={tdStyleNum}>{user.Waacking}</td>
                      <td style={tdStyleNum}>{user.Popping}</td>
                      <td style={tdStyleNum}>{user.House}</td>
                      
                      {/* TOTAL */}
                      <td style={{ ...tdStyle, color: '#00ffcc', fontWeight: '900', fontSize: '18px', textShadow: '0 0 10px rgba(0,255,204,0.4)' }}>
                        {user.Total}
                      </td>
                      
                      {/* RANGO */}
                      <td style={tdStyle}>
                        <span style={badgeStyle(user.Total)}>
                          {user.Total >= 80 ? 'TOP TIER' : 'PRO'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// --- ESTILOS URBANOS Y CYBERPUNK ---

const pageContainer = { 
  backgroundColor: '#05050a', 
  minHeight: '100vh', 
  color: '#fff',
  position: 'relative',
  overflowX: 'hidden'
};

const contentWrapper = { padding: '50px', position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto' };

const glowBgTop = {
  position: 'fixed', top: '-20%', left: '-10%', width: '60vw', height: '60vw',
  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(0,0,0,0) 60%)',
  zIndex: 0, pointerEvents: 'none'
};

const glowBgBottom = {
  position: 'fixed', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw',
  background: 'radial-gradient(circle, rgba(45, 212, 191, 0.08) 0%, rgba(0,0,0,0) 60%)',
  zIndex: 0, pointerEvents: 'none'
};

const headerStyle = { marginBottom: '50px', marginTop: '10px' };

const titleBadge = {
  display: 'inline-block', padding: '4px 12px', backgroundColor: '#fbbf2420',
  color: '#fbbf24', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold',
  letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px',
  border: '1px solid #fbbf2440'
};

const titleStyle = { 
  fontSize: '42px', fontWeight: '900', margin: '0 0 10px 0',
  letterSpacing: '-1px', fontFamily: '"Impact", "Arial Black", sans-serif' 
};

const neonText = {
  color: 'transparent', WebkitTextStroke: '2px #00ffcc',
  textShadow: '0 0 15px rgba(0, 255, 204, 0.5)', letterSpacing: '2px'
};

const subtitleStyle = { color: '#94a3b8', fontSize: '16px', letterSpacing: '0.5px' };

const tableContainer = {
  backgroundColor: 'rgba(15, 23, 42, 0.6)',
  borderRadius: '20px',
  border: '1px solid #1e293b',
  boxShadow: '0 20px 50px rgba(0,0,0,0.7), inset 0 0 20px rgba(0,255,204,0.05)',
  overflowX: 'auto',
  backdropFilter: 'blur(10px)'
};

const thStyle = { 
  padding: '20px', color: '#94a3b8', fontSize: '11px', fontWeight: '800', 
  textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #334155'
};

const thStyleTotal = { ...thStyle, color: '#00ffcc' };

const tdStyle = { padding: '20px', fontSize: '14px', borderBottom: '1px solid rgba(30, 41, 59, 0.5)' };
const tdStyleNum = { ...tdStyle, color: '#cbd5e1', fontFamily: 'monospace', fontSize: '15px' };
const trStyle = { transition: 'all 0.2s ease', cursor: 'default' };

const topRankBadge = {
  backgroundColor: '#fbbf24', width: '30px', height: '30px', borderRadius: '8px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: '0 0 15px rgba(251, 191, 36, 0.6)'
};

const normalRank = { color: '#64748b', fontWeight: 'bold', fontSize: '16px' };

const backBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(30, 41, 59, 0.5)',
  color: '#94a3b8', border: '1px solid #334155', cursor: 'pointer', fontSize: '12px', 
  marginBottom: '30px', padding: '10px 20px', borderRadius: '8px', textTransform: 'uppercase',
  letterSpacing: '1px', transition: 'all 0.3s'
};

const loaderContainer = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  height: '300px', color: '#00ffcc'
};

const badgeStyle = (puntos) => ({
  backgroundColor: puntos >= 80 ? 'rgba(0, 255, 204, 0.1)' : 'rgba(99, 102, 241, 0.1)',
  color: puntos >= 80 ? '#00ffcc' : '#818cf8',
  border: `1px solid ${puntos >= 80 ? 'rgba(0, 255, 204, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`,
  padding: '6px 14px', borderRadius: '4px', fontSize: '11px', fontWeight: '900',
  letterSpacing: '1px', whiteSpace: 'nowrap',
  boxShadow: puntos >= 80 ? '0 0 10px rgba(0, 255, 204, 0.2)' : 'none'
});

export default Ranking;
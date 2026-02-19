import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Music, Users, ChevronRight, Activity, Zap } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <div style={containerStyle}>
      <div style={glowBgTop}></div>
      <div style={glowBgBottom}></div>

      <header style={headerStyle}>
        <div style={{ zIndex: 10 }}>
          <h1 style={titleStyle}>
            PANEL DE CONTROL <span style={neonText}>URBANO</span>
          </h1>
          <p style={subtitleStyle}>Gestiona tu crew con potencia Cloud.</p>
        </div>
        <div style={statusCardStyle}>
          <Activity size={18} color="#00ffcc" style={{ filter: 'drop-shadow(0 0 5px #00ffcc)' }} />
          <span style={statusTextStyle}>DB: ONLINE</span>
        </div>
      </header>

      {/* GRID SIMÉTRICO: 50% Izquierda (Ranking) | 50% Derecha (Acciones) */}
      <section style={gridStyle}>
        
        {/* TARJETA DE RANKING (Mitad Izquierda - Dorado) */}
        <div 
          style={{
            ...heroCardStyle,
            // Neón base activo, explota en hover
            boxShadow: hovered === 'ranking' ? '0 0 50px rgba(251, 191, 36, 0.4), inset 0 0 20px rgba(251, 191, 36, 0.2)' : '0 10px 30px rgba(0,0,0,0.5), inset 0 0 10px rgba(251, 191, 36, 0.1)',
            borderColor: hovered === 'ranking' ? '#fbbf24' : 'rgba(251, 191, 36, 0.5)'
          }}
          onMouseEnter={() => setHovered('ranking')}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{ zIndex: 2, position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={iconBadge('#fbbf2420', '#fbbf24', hovered === 'ranking')}>
              <Trophy size={45} color="#fbbf24" style={{ filter: hovered === 'ranking' ? 'drop-shadow(0 0 10px #fbbf24)' : 'drop-shadow(0 0 5px rgba(251, 191, 36, 0.5))' }} />
            </div>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={heroTitleStyle}>Ranking de la Crew</h2>
              <p style={heroDescStyle}>Consulta el desempeño detallado y descubre quién domina la pista de baile.</p>
            </div>
            
            <button 
              onClick={() => navigate('/ranking')} 
              style={{...primaryBtnStyle, boxShadow: hovered === 'ranking' ? '0 0 20px rgba(251, 191, 36, 0.6)' : '0 0 10px rgba(251, 191, 36, 0.2)'}}
            >
              Ver Resultados Completos <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* CONTENEDOR DE TARJETAS SECUNDARIAS (Mitad Derecha) */}
        <div style={sideCardsContainer}>
          
          {/* TARJETA EVALUAR (Morado Neón Base) */}
          <div 
            style={{
              ...actionCardStyle,
              boxShadow: hovered === 'estilos' ? '0 0 40px rgba(129, 140, 248, 0.4), inset 0 0 20px rgba(129, 140, 248, 0.2)' : '0 10px 30px rgba(0,0,0,0.5), inset 0 0 10px rgba(129, 140, 248, 0.1)',
              borderColor: hovered === 'estilos' ? '#818cf8' : 'rgba(129, 140, 248, 0.5)'
            }}
            onMouseEnter={() => setHovered('estilos')}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={iconBadgeSmall('#818cf820', '#818cf8', hovered === 'estilos')}>
                <Music size={28} color="#818cf8" style={{ filter: hovered === 'estilos' ? 'drop-shadow(0 0 8px #818cf8)' : 'drop-shadow(0 0 5px rgba(129, 140, 248, 0.5))' }} />
              </div>
              <h3 style={cardTitleStyle}>Evaluar Estilos</h3>
            </div>
            <p style={cardDescStyle}>Califica Hip Hop, Breaking, Waacking, Popping y House.</p>
            <button 
              onClick={() => navigate('/calificaciones')} 
              style={{
                ...evalBtnStyle, 
                backgroundColor: hovered === 'estilos' ? '#818cf820' : 'rgba(129, 140, 248, 0.05)',
                boxShadow: hovered === 'estilos' ? '0 0 15px rgba(129, 140, 248, 0.5)' : 'none'
              }}
            >
              Ir a Notas
            </button>
          </div>

          {/* TARJETA GESTIÓN (Cian Neón Base) */}
          <div 
            style={{
              ...actionCardStyle,
              boxShadow: hovered === 'crew' ? '0 0 40px rgba(45, 212, 191, 0.4), inset 0 0 20px rgba(45, 212, 191, 0.2)' : '0 10px 30px rgba(0,0,0,0.5), inset 0 0 10px rgba(45, 212, 191, 0.1)',
              borderColor: hovered === 'crew' ? '#2dd4bf' : 'rgba(45, 212, 191, 0.5)'
            }}
            onMouseEnter={() => setHovered('crew')}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={iconBadgeSmall('#2dd4bf20', '#2dd4bf', hovered === 'crew')}>
                <Users size={28} color="#2dd4bf" style={{ filter: hovered === 'crew' ? 'drop-shadow(0 0 8px #2dd4bf)' : 'drop-shadow(0 0 5px rgba(45, 212, 191, 0.5))' }} />
              </div>
              <h3 style={cardTitleStyle}>Gestión Crew</h3>
            </div>
            <p style={cardDescStyle}>Administra la tabla maestra de tus bailarines.</p>
            <button 
              onClick={() => navigate('/miembros')} 
              style={{
                ...crewBtnStyle,
                backgroundColor: hovered === 'crew' ? '#2dd4bf20' : 'rgba(45, 212, 191, 0.05)',
                boxShadow: hovered === 'crew' ? '0 0 15px rgba(45, 212, 191, 0.5)' : 'none'
              }}
            >
              Ver Miembros
            </button>
          </div>

        </div>
      </section>

      <footer style={footerStyle}>
        <Zap size={14} color="#f43f5e" style={{ filter: 'drop-shadow(0 0 5px #f43f5e)' }} />
        Conectado a: free-sql-db-8768008 | Azure SQL Servidor: gerson-sql-servidor
      </footer>
    </div>
  );
};

// ==========================================
// OBJETOS DE ESTILO (Simetría y Neón Base Activo)
// ==========================================

const containerStyle = { 
  padding: '60px', 
  display: 'flex', 
  flexDirection: 'column', 
  minHeight: '100vh', 
  backgroundColor: '#05050a',
  position: 'relative',
  overflow: 'hidden'
};

const glowBgTop = { position: 'absolute', top: '-150px', left: '-150px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 };
const glowBgBottom = { position: 'absolute', bottom: '-200px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(45, 212, 191, 0.1) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 };

const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', zIndex: 10, position: 'relative' };

const titleStyle = { fontSize: '42px', fontWeight: '900', color: '#fff', margin: 0, letterSpacing: '-1px', fontFamily: '"Impact", "Arial Black", sans-serif' };
const neonText = { color: 'transparent', WebkitTextStroke: '2px #00ffcc', textShadow: '0 0 15px rgba(0, 255, 204, 0.6)', letterSpacing: '2px' };
const subtitleStyle = { color: '#94a3b8', fontSize: '18px', marginTop: '10px', letterSpacing: '1px' };

const statusCardStyle = { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(0, 255, 204, 0.1)', padding: '12px 24px', borderRadius: '12px', border: '1px solid #00ffcc', boxShadow: '0 0 15px rgba(0, 255, 204, 0.2)', backdropFilter: 'blur(5px)', zIndex: 10 };
const statusTextStyle = { fontSize: '14px', color: '#00ffcc', fontWeight: '800', letterSpacing: '2px' };

// === GRID 50/50 ===
const gridStyle = { 
  display: 'grid', 
  gridTemplateColumns: '1fr 1fr', // 50% Izquierda, 50% Derecha
  gap: '35px', 
  zIndex: 10, 
  position: 'relative',
  minHeight: '500px' // Altura un poco mayor para darle aire
};

const heroCardStyle = { 
  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
  borderRadius: '24px', 
  padding: '50px', 
  position: 'relative', 
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  flexDirection: 'column'
};

const sideCardsContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '35px',
  height: '100%' 
};

const actionCardStyle = { 
  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
  borderRadius: '24px', 
  padding: '40px', 
  display: 'flex', 
  flexDirection: 'column', 
  flex: 1, // 50% de la altura de la columna
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
  backdropFilter: 'blur(10px)',
  justifyContent: 'space-between' 
};

// =======================================

const heroTitleStyle = { marginTop: '30px', fontSize: '42px', color: '#fff', fontWeight: '900', letterSpacing: '-1px' };
const heroDescStyle = { color: '#cbd5e1', marginTop: '15px', fontSize: '18px', maxWidth: '450px', lineHeight: '1.6' };

const cardTitleStyle = { color: '#fff', fontSize: '26px', fontWeight: '800', margin: 0 };
const cardDescStyle = { color: '#94a3b8', fontSize: '16px', lineHeight: '1.6', margin: '20px 0' };

const iconBadge = (bg, glowColor, isHovered) => ({ backgroundColor: bg, width: '100px', height: '100px', borderRadius: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${glowColor}`, boxShadow: isHovered ? `0 0 30px ${bg}` : `0 0 10px ${bg}`, transition: 'all 0.3s ease' });

const iconBadgeSmall = (bg, glowColor, isHovered) => ({ backgroundColor: bg, width: '65px', height: '65px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${glowColor}`, boxShadow: isHovered ? `0 0 25px ${bg}` : `0 0 10px ${bg}`, transition: 'all 0.3s ease' });

const primaryBtnStyle = { marginTop: 'auto', padding: '20px 40px', borderRadius: '16px', border: 'none', backgroundColor: '#fbbf24', color: '#000', fontWeight: '900', fontSize: '16px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease', textTransform: 'uppercase', letterSpacing: '1px', alignSelf: 'flex-start' };

const evalBtnStyle = { padding: '15px', borderRadius: '12px', border: '1px solid #818cf8', color: '#818cf8', fontWeight: '900', cursor: 'pointer', display: 'flex', justifyContent: 'center', transition: 'all 0.3s ease', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '2px' };

const crewBtnStyle = { padding: '15px', borderRadius: '12px', border: '1px solid #2dd4bf', color: '#2dd4bf', fontWeight: '900', cursor: 'pointer', display: 'flex', justifyContent: 'center', transition: 'all 0.3s ease', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '2px' };

const footerStyle = { marginTop: 'auto', paddingTop: '50px', color: '#475569', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10, position: 'relative', letterSpacing: '1px', textTransform: 'uppercase' };

export default Home;
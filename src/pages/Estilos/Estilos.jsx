import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Music, Zap, Wind, Target, Flame, Activity, Crosshair, BookOpen } from 'lucide-react';

const Estilos = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  // Ampliamos la data con "bgPattern" para darle una textura única a cada estilo
  const infoEstilos = [
    {
      id: 1,
      nombre: 'HIP HOP',
      icon: <Music size={36} color="#6366f1" />,
      desc: 'El corazón de la cultura urbana. Se enfoca en el "bounce", el "rock" y el groove social. Es la base absoluta de la musicalidad.',
      color: '#6366f1',
      bg: 'rgba(99, 102, 241, 0.15)',
      enfoque: 'GROOVE & CARDIO',
      dificultad: 'MEDIA',
      bgPattern: 'linear-gradient(45deg, rgba(99, 102, 241, 0.05) 25%, transparent 25%, transparent 75%, rgba(99, 102, 241, 0.05) 75%, rgba(99, 102, 241, 0.05)), linear-gradient(45deg, rgba(99, 102, 241, 0.05) 25%, transparent 25%, transparent 75%, rgba(99, 102, 241, 0.05) 75%, rgba(99, 102, 241, 0.05))',
      bgSize: '20px 20px' // Estilo Malla/Reja urbana
    },
    {
      id: 2,
      nombre: 'BREAKING',
      icon: <Zap size={36} color="#fbbf24" />,
      desc: 'El estilo más dinámico y acrobático. Incluye toprock, downrock, power moves y freezes. Requiere fuerza y control total del core.',
      color: '#fbbf24',
      bg: 'rgba(251, 191, 36, 0.15)',
      enfoque: 'FUERZA & POWER',
      dificultad: 'ALTA',
      bgPattern: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
      bgSize: '100% 100%' // Estilo Cypher/Reflector
    },
    {
      id: 3,
      nombre: 'POPPING',
      icon: <Target size={36} color="#2dd4bf" />,
      desc: 'Basado en la contracción rápida de los músculos (pops/hits) al ritmo de la música. Incluye técnicas ilusorias como waving y tutting.',
      color: '#2dd4bf',
      bg: 'rgba(45, 212, 191, 0.15)',
      enfoque: 'AISLAMIENTO & CONTROL',
      dificultad: 'ALTA',
      bgPattern: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(45, 212, 191, 0.03) 10px, rgba(45, 212, 191, 0.03) 20px)',
      bgSize: '100% 100%' // Estilo Digital/Robótico
    },
    {
      id: 4,
      nombre: 'WAACKING',
      icon: <Flame size={36} color="#f43f5e" />,
      desc: 'Nacido en la cultura club de los 70s. Se caracteriza por movimientos rápidos de brazos, poses dramáticas y gran expresividad teatral.',
      color: '#f43f5e',
      bg: 'rgba(244, 63, 94, 0.15)',
      enfoque: 'VELOCIDAD & EXPRESIÓN',
      dificultad: 'MEDIA',
      bgPattern: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, transparent 50%, rgba(244, 63, 94, 0.05) 100%)',
      bgSize: '100% 100%' // Estilo Spotlight Club Disco
    },
    {
      id: 5,
      nombre: 'HOUSE',
      icon: <Wind size={36} color="#818cf8" />,
      desc: 'Enfocado en el footwork rápido y fluido. Su esencia es el "jack", un movimiento constante del torso que sigue el beat profundo.',
      color: '#818cf8',
      bg: 'rgba(129, 140, 248, 0.15)',
      enfoque: 'RESISTENCIA & FOOTWORK',
      dificultad: 'ALTA',
      bgPattern: 'radial-gradient(ellipse at bottom, rgba(129, 140, 248, 0.15) 0%, transparent 60%)',
      bgSize: '100% 100%' // Estilo Undergound House Club
    }
  ];

  return (
    <div style={pageContainer}>
      <div style={glowBgTop}></div>
      <div style={glowBgBottom}></div>

      <div style={contentWrapper}>
        

        <header style={headerStyle}>
          <div style={titleBadge}><BookOpen size={14} /> Archivos de Sistema</div>
          <h1 style={titleStyle}>DISCIPLINAS <span style={neonText}>DELTA</span></h1>
          <p style={subtitleStyle}>Explora los fundamentos, enfoques y exigencias físicas de nuestra currícula oficial.</p>
        </header>

        <div style={gridContainer}>
          {infoEstilos.map((estilo) => {
            const isHovered = hoveredCard === estilo.id;
            
            return (
              <div 
                key={estilo.id} 
                style={{
                  ...estiloCard,
                  transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
                  boxShadow: isHovered ? `0 20px 50px -10px ${estilo.color}40, inset 0 0 20px ${estilo.color}10` : '0 10px 30px rgba(0,0,0,0.6)',
                  borderColor: isHovered ? estilo.color : '#1e293b'
                }}
                onMouseEnter={() => setHoveredCard(estilo.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* FONDO REPRESENTATIVO (MAGIA CYBERPUNK) */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: estilo.bgPattern,
                  backgroundSize: estilo.bgSize,
                  backgroundPosition: '0 0, 10px 10px',
                  opacity: isHovered ? 1 : 0.5,
                  transition: 'opacity 0.4s',
                  zIndex: 0,
                  pointerEvents: 'none'
                }}></div>

                {/* Cabecera de la Tarjeta */}
                <div style={cardHeader}>
                  <div style={{
                    ...iconBox, 
                    backgroundColor: estilo.bg, 
                    borderColor: isHovered ? estilo.color : `${estilo.color}30`,
                    boxShadow: isHovered ? `0 0 20px ${estilo.color}60` : 'none'
                  }}>
                    <div style={{ filter: isHovered ? `drop-shadow(0 0 8px ${estilo.color})` : 'none', transition: 'all 0.3s' }}>
                      {estilo.icon}
                    </div>
                  </div>
                  <div style={{...dificultadBadge, color: estilo.color, border: `1px solid ${estilo.color}40`, backgroundColor: isHovered ? estilo.bg : 'rgba(15, 23, 42, 0.8)'}}>
                    LVL // {estilo.dificultad}
                  </div>
                </div>

                {/* Contenido Principal */}
                <h3 style={{...cardTitle, textShadow: isHovered ? `0 0 15px ${estilo.color}60` : 'none'}}>{estilo.nombre}</h3>
                <p style={cardDesc}>{estilo.desc}</p>

                {/* Footer Analítico */}
                <div style={cardFooter}>
                  <div style={metricItem}>
                    <Crosshair size={14} color={isHovered ? estilo.color : "#64748b"} style={{ transition: 'color 0.3s' }} />
                    <span style={{ color: isHovered ? '#fff' : '#94a3b8', transition: 'color 0.3s' }}>{estilo.enfoque}</span>
                  </div>
                  <div style={metricItem}>
                    <Activity size={14} color={isHovered ? estilo.color : "#64748b"} style={{ transition: 'color 0.3s' }} />
                    <span style={{ color: isHovered ? '#fff' : '#94a3b8', transition: 'color 0.3s' }}>TÉCNICA OFICIAL</span>
                  </div>
                </div>
                
                {/* Detalles Cyberpunk de fondo */}
                <div style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '60px', fontWeight: '900', color: `${estilo.color}15`, pointerEvents: 'none', zIndex: 0, transition: 'all 0.3s', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}>
                  0{estilo.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- ESTILOS MODERNOS UI/UX URBANOS ---
const pageContainer = { backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' };

const contentWrapper = { padding: '50px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 };

// Luces Neón de Fondo (Vibe Disco/Urbano Global)
const glowBgTop = { position: 'fixed', top: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(0,0,0,0) 60%)', zIndex: 0, pointerEvents: 'none' };
const glowBgBottom = { position: 'fixed', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(45, 212, 191, 0.05) 0%, rgba(0,0,0,0) 60%)', zIndex: 0, pointerEvents: 'none' };

const headerStyle = { marginBottom: '60px', marginTop: '10px' };

const titleBadge = { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', backgroundColor: '#6366f120', color: '#818cf8', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px', border: '1px solid #6366f140' };
const titleStyle = { fontSize: '42px', fontWeight: '900', letterSpacing: '-1px', margin: '0 0 10px 0', fontFamily: '"Impact", "Arial Black", sans-serif' };
const neonText = { color: 'transparent', WebkitTextStroke: '2px #818cf8', textShadow: '0 0 15px rgba(129, 140, 248, 0.6)', letterSpacing: '2px' };
const subtitleStyle = { color: '#94a3b8', fontSize: '16px', maxWidth: '600px', letterSpacing: '0.5px' };

const backBtn = { background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #334155', color: '#94a3b8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px', padding: '10px 20px', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s' };

const gridContainer = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '35px' };

// El fondo de la tarjeta ahora es transparente para dejar ver el patrón interno
const estiloCard = { backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '35px', display: 'flex', flexDirection: 'column', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', border: '1px solid', position: 'relative', overflow: 'hidden' };

const cardHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px', zIndex: 2, position: 'relative' };

const iconBox = { width: '75px', height: '75px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', transition: 'all 0.3s' };

const dificultadBadge = { padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: '1px', transition: 'all 0.3s', backdropFilter: 'blur(5px)' };

const cardTitle = { fontSize: '28px', fontWeight: '900', margin: '0 0 15px 0', letterSpacing: '1px', transition: 'text-shadow 0.3s', zIndex: 2, position: 'relative' };
const cardDesc = { color: '#cbd5e1', fontSize: '15px', lineHeight: '1.7', margin: '0 0 30px 0', flex: 1, zIndex: 2, position: 'relative', textShadow: '0 2px 4px rgba(0,0,0,0.8)' };

const cardFooter = { display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '20px', borderTop: '1px dashed rgba(51, 65, 85, 0.8)', zIndex: 2, position: 'relative', backgroundColor: 'rgba(15, 23, 42, 0.4)', margin: '0 -35px -35px -35px', padding: '20px 35px 35px 35px' };

const metricItem = { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: '0.5px' };

export default Estilos;
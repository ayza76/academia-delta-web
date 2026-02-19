import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Edit, Trash2, Loader2, X, Save, Calendar, ShieldAlert } from 'lucide-react';
import axios from 'axios';

const Miembros = () => {
  const navigate = useNavigate();
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null); 
  const [hoveredCard, setHoveredCard] = useState(null);

  const [formData, setFormData] = useState({ Nombre: '', Aka: '', Edad: '', FechaIngreso: '' });

  const fetchMiembros = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/miembros');
      setMiembros(response.data);
    } catch (error) { 
      console.error("Error al obtener miembros:", error); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchMiembros(); }, []);

  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({ Nombre: '', Aka: '', Edad: '', FechaIngreso: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m) => {
    setEditMode(true);
    setSelectedId(m.IdIntegrante);
    setFormData({
      Nombre: m.Nombre || '',
      Aka: m.Aka || '',
      Edad: m.Edad || '',
      FechaIngreso: m.FechaIngreso || '' 
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id, aka) => {
    if (window.confirm(`⚠️ ADVERTENCIA: ¿Estás seguro de eliminar el registro de ${aka}? Esta acción es irreversible en Azure SQL.`)) {
      try {
        await axios.delete(`http://localhost:3001/api/miembros/${id}`);
        fetchMiembros();
      } catch (err) {
        alert("Error crítico al eliminar.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:3001/api/miembros/${selectedId}`, formData);
      } else {
        await axios.post('http://localhost:3001/api/miembros', formData);
      }
      setIsModalOpen(false);
      fetchMiembros();
    } catch (err) { 
      alert("Error de conexión con la base de datos."); 
    }
  };

  return (
    <div style={pageContainer}>
      {/* Fondo Neón */}
      <div style={glowBgTop}></div>
      <div style={glowBgBottom}></div>

      <div style={contentWrapper}>
        

        <header style={headerStyle}>
          <div>
            <div style={titleBadge}>Base de Datos</div>
            <h1 style={titleStyle}>GESTIÓN DE <span style={neonText}>CREW</span></h1>
            <p style={subtitleStyle}>Edición directa y control de registros en la tabla maestra.</p>
          </div>
          <button onClick={handleOpenAdd} style={addBtnStyle}>
            <UserPlus size={20} /> NUEVO INGRESO
          </button>
        </header>

        {/* MODAL CYBERPUNK */}
        {isModalOpen && (
          <div style={modalOverlay}>
            <div style={modalContent}>
              <div style={modalHeader}>
                <h2 style={{display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontSize: '20px', letterSpacing: '1px'}}>
                  {editMode ? <Edit size={24} color="#00ffcc"/> : <UserPlus size={24} color="#00ffcc"/>} 
                  {editMode ? `ACTUALIZANDO ID [${selectedId}]` : 'NUEVO REGISTRO'}
                </h2>
                <X onClick={() => setIsModalOpen(false)} style={closeBtn} />
              </div>

              <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <div style={inputGroup}>
                  <label style={labelStyle}>NOMBRE COMPLETO</label>
                  <input style={inputStyle} value={formData.Nombre} onChange={(e) => setFormData({...formData, Nombre: e.target.value})} placeholder="Identidad Legal" required />
                </div>
                
                <div style={inputGroup}>
                  <label style={labelStyle}>ALIAS (AKA)</label>
                  <input style={{...inputStyle, borderColor: '#fbbf24'}} value={formData.Aka} onChange={(e) => setFormData({...formData, Aka: e.target.value})} placeholder="Nombre de Batalla" required />
                </div>

                <div style={{display: 'flex', gap: '15px'}}>
                  <div style={{...inputGroup, flex: 1}}>
                    <label style={labelStyle}>EDAD</label>
                    <input style={inputStyle} type="number" value={formData.Edad} onChange={(e) => setFormData({...formData, Edad: e.target.value})} placeholder="Años" required />
                  </div>
                  
                  <div style={{...inputGroup, flex: 2}}>
                    <label style={labelStyle}>FECHA DE INGRESO</label>
                    <input style={inputStyle} type="date" value={formData.FechaIngreso} onChange={(e) => setFormData({...formData, FechaIngreso: e.target.value})} required />
                  </div>
                </div>

                <button type="submit" style={saveBtnStyle}>
                  <Save size={18} /> {editMode ? 'SOBRESCRIBIR DATOS' : 'INICIAR REGISTRO'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* GRID DE MIEMBROS */}
        {loading ? (
          <div style={loaderContainer}><Loader2 className="animate-spin" size={40} /> <span style={{marginTop: '10px', letterSpacing: '2px'}}>ACCEDIENDO...</span></div>
        ) : (
          <div style={cardsGrid}>
            {miembros.map((m) => {
              const isHovered = hoveredCard === m.IdIntegrante;
              return (
                <div 
                  key={m.IdIntegrante} 
                  style={{
                    ...cardStyle,
                    borderColor: isHovered ? '#00ffcc' : '#1e293b',
                    boxShadow: isHovered ? '0 10px 30px rgba(0,255,204,0.15), inset 0 0 15px rgba(0,255,204,0.05)' : '0 5px 15px rgba(0,0,0,0.5)',
                    transform: isHovered ? 'translateY(-5px)' : 'translateY(0)'
                  }}
                  onMouseEnter={() => setHoveredCard(m.IdIntegrante)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{...avatarStyle, boxShadow: isHovered ? '0 0 15px #00ffcc' : 'none'}}>
                    {m.Aka ? m.Aka.charAt(0) : '?'}
                  </div>
                  <h3 style={cardAka}>{m.Aka}</h3>
                  <p style={cardNombre}>{m.Nombre}</p>
                  
                  <div style={infoBadgeContainer}>
                    <div style={infoItem}><Calendar size={12} color="#00ffcc"/> {m.FechaIngreso}</div>
                    <div style={infoItem}>Edad: {m.Edad}</div>
                  </div>
                  
                  <div style={actionGroup}>
                    <button onClick={() => handleOpenEdit(m)} style={iconBtn('#00ffcc')} title="Editar">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(m.IdIntegrante, m.Aka)} style={iconBtn('#f43f5e')} title="Eliminar">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  {/* Etiqueta decorativa de ID */}
                  <div style={idTag}>USR-{m.IdIntegrante}</div>
                </div>
              )
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

// Luces Neón de Fondo
const glowBgTop = { position: 'fixed', top: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(0, 255, 204, 0.08) 0%, rgba(0,0,0,0) 60%)', zIndex: 0, pointerEvents: 'none' };
const glowBgBottom = { position: 'fixed', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(244, 63, 94, 0.05) 0%, rgba(0,0,0,0) 60%)', zIndex: 0, pointerEvents: 'none' };

const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', marginTop: '10px' };

const titleBadge = { display: 'inline-block', padding: '4px 12px', backgroundColor: '#00ffcc20', color: '#00ffcc', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px', border: '1px solid #00ffcc40' };
const titleStyle = { fontSize: '42px', fontWeight: '900', margin: '0 0 10px 0', letterSpacing: '-1px', fontFamily: '"Impact", "Arial Black", sans-serif' };
const neonText = { color: 'transparent', WebkitTextStroke: '2px #f43f5e', textShadow: '0 0 15px rgba(244, 63, 94, 0.5)', letterSpacing: '2px' };
const subtitleStyle = { color: '#94a3b8', fontSize: '16px', letterSpacing: '0.5px' };

const backBtnStyle = { display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(30, 41, 59, 0.5)', color: '#94a3b8', border: '1px solid #334155', cursor: 'pointer', fontSize: '12px', marginBottom: '30px', padding: '10px 20px', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s' };

const addBtnStyle = { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#00ffcc', border: 'none', color: '#000', padding: '14px 28px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', letterSpacing: '1px', boxShadow: '0 0 15px rgba(0,255,204,0.4)', transition: 'transform 0.2s' };

// --- MODAL ---
const modalOverlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(5, 5, 10, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContent = { backgroundColor: '#0f172a', padding: '40px', borderRadius: '20px', width: '450px', border: '1px solid #00ffcc', boxShadow: '0 0 40px rgba(0,255,204,0.1)' };
const modalHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #1e293b', paddingBottom: '15px' };
const closeBtn = { cursor: 'pointer', color: '#94a3b8', transition: 'color 0.2s' };

const inputGroup = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '11px', color: '#00ffcc', fontWeight: 'bold', letterSpacing: '1px' };
const inputStyle = { padding: '14px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: 'rgba(5, 5, 10, 0.5)', color: '#fff', fontSize: '15px', outline: 'none', colorScheme: 'dark', fontFamily: 'monospace' };

const saveBtnStyle = { padding: '16px', borderRadius: '8px', border: 'none', backgroundColor: '#00ffcc', color: '#000', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px', letterSpacing: '1px', textTransform: 'uppercase' };

// --- GRID & CARDS ---
const cardsGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' };
const cardStyle = { backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(5px)', borderRadius: '16px', padding: '30px', border: '1px solid #1e293b', textAlign: 'center', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden' };

const avatarStyle = { width: '80px', height: '80px', backgroundColor: '#05050a', border: '2px solid #00ffcc', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', fontSize: '32px', fontWeight: '900', color: '#00ffcc', transition: 'all 0.3s' };
const cardAka = { fontSize: '24px', fontWeight: '900', margin: '0 0 5px 0', letterSpacing: '1px', textTransform: 'uppercase' };
const cardNombre = { color: '#94a3b8', fontSize: '13px', margin: '0 0 20px 0' };

const infoBadgeContainer = { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '25px' };
const infoItem = { backgroundColor: '#1e293b', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', letterSpacing: '0.5px' };

const actionGroup = { display: 'flex', justifyContent: 'center', gap: '15px' };
const iconBtn = (c) => ({ backgroundColor: 'transparent', color: c, border: `1px solid ${c}40`, padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', ':hover': { backgroundColor: `${c}10` } });

const idTag = { position: 'absolute', top: '15px', right: '15px', fontSize: '10px', color: '#475569', fontWeight: 'bold', fontFamily: 'monospace' };

const loaderContainer = { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '300px', color: '#00ffcc' };

export default Miembros;
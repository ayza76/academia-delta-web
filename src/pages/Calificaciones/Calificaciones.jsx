import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Plus, Trash2, Activity, Cpu } from 'lucide-react';
import axios from 'axios';

const Calificaciones = () => {
  const navigate = useNavigate();
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [idIntegrante, setIdIntegrante] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  
  const [filasEvaluacion, setFilasEvaluacion] = useState([
    { IdEstilo: 1, Nota: '', Comentarios: '' }
  ]);

  const estilos = [
    { id: 1, nombre: 'Hip Hop' },
    { id: 2, nombre: 'Breaking' },
    { id: 3, nombre: 'Waacking' },
    { id: 4, nombre: 'Popping' },
    { id: 5, nombre: 'House' }
  ];

  useEffect(() => {
    const fetchMiembros = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/miembros');
        setMiembros(res.data);
      } catch (err) {
        console.error("Error al cargar miembros:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMiembros();
  }, []);

  const agregarFila = () => {
    setFilasEvaluacion([...filasEvaluacion, { IdEstilo: 1, Nota: '', Comentarios: '' }]);
  };

  const eliminarFila = (index) => {
    const nuevas = filasEvaluacion.filter((_, i) => i !== index);
    setFilasEvaluacion(nuevas);
  };

  const actualizarFila = (index, campo, valor) => {
    const nuevas = [...filasEvaluacion];
    nuevas[index][campo] = valor;
    setFilasEvaluacion(nuevas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idIntegrante) return alert("SISTEMA: Selecciona un integrante de la base de datos.");

    try {
      const dataToSend = {
        IdIntegrante: parseInt(idIntegrante),
        evaluaciones: filasEvaluacion.map(f => ({
          IdEstilo: parseInt(f.IdEstilo),
          Nota: parseFloat(f.Nota),
          Comentarios: f.Comentarios || '',
          FechaEvaluacion: fecha
        }))
      };

      const response = await axios.post('http://localhost:3001/api/calificaciones', dataToSend);
      alert("✔️ DATOS TRANSMITIDOS CON ÉXITO A AZURE SQL");
      navigate('/ranking');
    } catch (err) {
      console.error("Error detallado:", err.response?.data || err.message);
      alert("❌ ERROR DE CONEXIÓN CON EL SERVIDOR CLOUD");
    }
  };

  return (
    <div style={pageContainer}>
      {/* Luces de Neón de Fondo */}
      <div style={glowBgTop}></div>
      <div style={glowBgBottom}></div>

      <div style={contentWrapper}>
        

        <header style={headerStyle}>
          <div>
            <div style={titleBadge}><Cpu size={14}/> Terminal de Datos</div>
            <h1 style={titleStyle}>EVALUACIÓN DE <span style={neonText}>DESEMPEÑO</span></h1>
            <p style={subtitleStyle}>Ingreso de métricas y rendimiento por estilo urbano.</p>
          </div>
        </header>

        {loading ? (
          <div style={loaderContainer}>
            <Loader2 className="animate-spin" size={40} style={{ filter: 'drop-shadow(0 0 10px #818cf8)' }} /> 
            <span style={{ letterSpacing: '2px', marginTop: '15px' }}>SINCRONIZANDO NODOS...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={formCardStyle}>
            
            {/* SECCIÓN MAESTRO: Integrante y Fecha */}
            <div style={masterGrid}>
              <div style={inputContainer}>
                <label style={labelStyle}>INTEGRANTE DEL CREW (AKA)</label>
                <select 
                  style={selectStyle} 
                  value={idIntegrante} 
                  onChange={(e) => setIdIntegrante(e.target.value)} 
                  required
                >
                  <option value="">Seleccionar AKA...</option>
                  {miembros.map(m => (
                    <option key={m.IdIntegrante} value={m.IdIntegrante}>{m.Aka} [ID:{m.IdIntegrante}]</option>
                  ))}
                </select>
              </div>
              <div style={inputContainerDate}>
                <label style={labelStyle}>FECHA DE EVALUACIÓN</label>
                <input 
                  type="date" 
                  style={inputStyle} 
                  value={fecha} 
                  onChange={(e) => setFecha(e.target.value)} 
                  required 
                />
              </div>
            </div>

            {/* SECCIÓN DETALLE: Notas por Estilo */}
            <div style={divider}>
              <div style={detailHeader}>
                <h4 style={{ color: '#818cf8', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '900', letterSpacing: '1px' }}>
                  <Activity size={20} /> DESGLOSE TÉCNICO
                </h4>
                <button type="button" onClick={agregarFila} style={addFilaBtn}>
                  <Plus size={16} /> AÑADIR NODO DE ESTILO
                </button>
              </div>

              {filasEvaluacion.map((fila, index) => (
                <div key={index} style={filaEstiloContainer}>
                  <select 
                    style={{ ...selectStyle, flex: 1.5 }} 
                    value={fila.IdEstilo} 
                    onChange={(e) => actualizarFila(index, 'IdEstilo', e.target.value)}
                  >
                    {estilos.map(e => <option key={e.id} value={e.id}>__{e.nombre.toUpperCase()}</option>)}
                  </select>
                  
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    max="20"
                    placeholder="NOTA" 
                    style={notaInputStyle} 
                    value={fila.Nota}
                    onChange={(e) => actualizarFila(index, 'Nota', e.target.value)}
                    required 
                  />
                  
                  <input 
                    type="text" 
                    placeholder="Comentario técnico de la batalla..." 
                    style={{ ...inputStyle, flex: 3 }} 
                    value={fila.Comentarios}
                    onChange={(e) => actualizarFila(index, 'Comentarios', e.target.value)}
                  />

                  {filasEvaluacion.length > 1 && (
                    <button type="button" onClick={() => eliminarFila(index)} style={deleteBtn} title="Eliminar Fila">
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button type="submit" style={saveBtnStyle}>
              <Save size={20} /> TRANSMITIR CALIFICACIONES AL SERVIDOR
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// --- ESTILOS URBANOS Y CYBERPUNK ---

const pageContainer = { backgroundColor: '#05050a', minHeight: '100vh', color: '#fff', position: 'relative', overflowX: 'hidden' };
const contentWrapper = { padding: '50px', position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto' };

// Luces Neón de Fondo (Morado)
const glowBgTop = { position: 'fixed', top: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, rgba(0,0,0,0) 60%)', zIndex: 0, pointerEvents: 'none' };
const glowBgBottom = { position: 'fixed', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, rgba(0,0,0,0) 60%)', zIndex: 0, pointerEvents: 'none' };

const headerStyle = { marginBottom: '40px', marginTop: '10px' };

const titleBadge = { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', backgroundColor: '#818cf820', color: '#818cf8', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px', border: '1px solid #818cf840' };
const titleStyle = { fontSize: '42px', fontWeight: '900', margin: '0 0 10px 0', letterSpacing: '-1px', fontFamily: '"Impact", "Arial Black", sans-serif' };
const neonText = { color: 'transparent', WebkitTextStroke: '2px #818cf8', textShadow: '0 0 15px rgba(129, 140, 248, 0.6)', letterSpacing: '2px' };
const subtitleStyle = { color: '#94a3b8', fontSize: '16px', letterSpacing: '0.5px' };

const backBtnStyle = { display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(30, 41, 59, 0.5)', color: '#94a3b8', border: '1px solid #334155', cursor: 'pointer', fontSize: '12px', marginBottom: '30px', padding: '10px 20px', borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s' };

// --- FORMULARIO CYBER ---
const formCardStyle = { 
  backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(10px)', 
  padding: '40px', borderRadius: '20px', border: '1px solid #334155', 
  boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(129, 140, 248, 0.05)',
  width: '100%' 
};

const masterGrid = { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '30px' };
const inputContainer = { display: 'flex', flexDirection: 'column', gap: '8px' };
const inputContainerDate = { display: 'flex', flexDirection: 'column', gap: '8px' };

const labelStyle = { fontSize: '11px', color: '#818cf8', fontWeight: 'bold', letterSpacing: '1px' };

const inputStyle = { 
  padding: '14px', borderRadius: '8px', border: '1px solid #334155', 
  backgroundColor: 'rgba(5, 5, 10, 0.5)', color: '#fff', fontSize: '14px', 
  outline: 'none', colorScheme: 'dark', fontFamily: 'monospace',
  transition: 'border-color 0.3s, box-shadow 0.3s'
};

const notaInputStyle = {
  ...inputStyle, width: '100px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold', color: '#00ffcc', borderColor: '#818cf8'
}

const selectStyle = { ...inputStyle, cursor: 'pointer', fontWeight: 'bold' };

const divider = { borderTop: '1px dashed #334155', paddingTop: '30px' };
const detailHeader = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' };

const filaEstiloContainer = { display: 'flex', gap: '15px', marginBottom: '20px', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', borderLeft: '3px solid #818cf8' };

const addFilaBtn = { backgroundColor: 'transparent', color: '#818cf8', border: '1px solid #818cf8', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', transition: 'all 0.2s', boxShadow: '0 0 10px rgba(129, 140, 248, 0.2)' };

const deleteBtn = { color: '#f43f5e', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' };

const saveBtnStyle = { width: '100%', padding: '18px', borderRadius: '12px', border: 'none', backgroundColor: '#818cf8', color: '#000', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '40px', letterSpacing: '2px', textTransform: 'uppercase', boxShadow: '0 0 20px rgba(129, 140, 248, 0.4)', transition: 'transform 0.2s' };

const loaderContainer = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: '#818cf8' };

export default Calificaciones;
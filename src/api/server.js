import express from 'express';
import sql from 'mssql';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

const config = {
    user: 'admin-gerson', 
    password: 'Dni-76931093', 
    server: 'gerson-sql-servidor.database.windows.net',
    database: 'free-sql-db-8768008',
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

// 1. RANKING (LECTURA DESDE LA VISTA)
app.get('/api/ranking', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query(`
            SELECT 
                Aka, 
                [Hip Hop], 
                Breaking, 
                Waacking, 
                Popping, 
                House, 
                Total, 
                Puesto 
            FROM [dbo].[Vista_Notas_Generales]
            ORDER BY Puesto ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error("Error detallado en Ranking:", err.message);
        res.status(500).json({ error: "Error al consultar la Vista de Ranking" });
    }
});

// ==========================================
// 2. GESTIÓN DE CREW (CRUD COMPLETO)
// ==========================================

// OBTENER LISTA (READ)
app.get('/api/miembros', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query(`
            SELECT IdIntegrante, Nombre, Aka, Edad, CONVERT(VARCHAR, FechaIngreso, 23) as FechaIngreso 
            FROM [dbo].[CrewIntegrantes]
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error("Error en GET Miembros:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// AGREGAR (CREATE)
app.post('/api/miembros', async (req, res) => {
    try {
        const { Nombre, Aka, Edad, FechaIngreso } = req.body;
        let pool = await sql.connect(config);
        await pool.request()
            .input('nombre', sql.VarChar, Nombre)
            .input('aka', sql.VarChar, Aka)
            .input('edad', sql.Int, Edad)
            .input('fecha', sql.Date, FechaIngreso)
            .query(`INSERT INTO [dbo].[CrewIntegrantes] (Nombre, Aka, Edad, FechaIngreso) 
                    VALUES (@nombre, @aka, @edad, @fecha)`);
        res.json({ message: 'Bailarín registrado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// EDITAR (UPDATE)
app.put('/api/miembros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, Aka, Edad, FechaIngreso } = req.body;
        let pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, Nombre)
            .input('aka', sql.VarChar, Aka)
            .input('edad', sql.Int, Edad)
            .input('fecha', sql.Date, FechaIngreso)
            .query(`UPDATE [dbo].[CrewIntegrantes] 
                    SET Nombre = @nombre, Aka = @aka, Edad = @edad, FechaIngreso = @fecha
                    WHERE IdIntegrante = @id`);
        res.json({ message: 'Registro actualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ELIMINAR (DELETE)
app.delete('/api/miembros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM [dbo].[CrewIntegrantes] WHERE IdIntegrante = @id');
        res.json({ message: 'Miembro eliminado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor DELTA conectado a Azure SQL en puerto ${PORT}`);
});

// ==========================================
// 3. EVALUACIONES (MAESTRO-DETALLE)
// ==========================================

// 1. GET: Obtener historial para la tabla (Opcional por ahora)
app.get('/api/calificaciones', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query(`
            SELECT E.*, I.Aka 
            FROM [dbo].[Evaluaciones] E
            JOIN [dbo].[CrewIntegrantes] I ON E.IdIntegrante = I.IdIntegrante
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. POST: Guardar las notas en Azure SQL
app.post('/api/calificaciones', async (req, res) => {
    try {
        const { IdIntegrante, evaluaciones } = req.body;
        let pool = await sql.connect(config);
        
        // Usamos un loop para insertar cada nota del array
        for (let notaItem of evaluaciones) {
            await pool.request()
                .input('idInt', sql.Int, IdIntegrante)
                .input('idEst', sql.Int, notaItem.IdEstilo)
                .input('nota', sql.Decimal(5, 2), notaItem.Nota)
                .input('coment', sql.VarChar, notaItem.Comentarios)
                .input('fecha', sql.Date, notaItem.FechaEvaluacion)
                .query(`
                    INSERT INTO [dbo].[Evaluaciones] 
                    (IdIntegrante, IdEstilo, Nota, Comentarios, FechaEvaluacion)
                    VALUES (@idInt, @idEst, @nota, @coment, @fecha)
                `);
        }
        res.json({ message: 'Notas guardadas correctamente' });
    } catch (err) {
        console.error("Error al insertar:", err.message);
        res.status(500).json({ error: err.message });
    }
});
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');
const { sequelize, FuelRecord } = require('./sequelize');
const { Op } = require('sequelize');
const swaggerDefinitions = require('./swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1000;

app.use(cors());
app.use(express.json());

// Inicializar la tabla en la base de datos
sequelize.sync().then(() => {
  console.log('Tabla creada o ya existente');
}).catch(err => {
  console.error('Error al crear la tabla: ', err);
});

/**
 * @swagger
 * /fuelrecords:
 *   get:
 *     summary: Obtener todos los registros de combustible.
 *     description: Retorna una lista de todos los registros de combustible.
 *     responses:
 *       200:
 *         description: OK. Retorna una lista de registros de combustible.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FuelRecord'
 */
app.get('/fuelrecords', async (req, res) => {
  const fuelRecords = await FuelRecord.findAll();
  res.json(fuelRecords);
});

/**
 * @swagger
 * /fuelrecords:
 *   post:
 *     summary: Crear un nuevo registro de combustible.
 *     description: Crea un nuevo registro de combustible con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FuelRecord'
 *     responses:
 *       200:
 *         description: OK. Retorna el registro de combustible creado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FuelRecord'
 *       400:
 *         description: Bad Request. Error en la solicitud.
 */
app.post('/fuelrecords', async (req, res) => {
  const { usuario, estacion, fecha, litros, pesos, kilometraje, kmsRecorrido, kmsPorLitro } = req.body;
  const newFuelRecord = await FuelRecord.create({ usuario, estacion, fecha, litros, pesos, kilometraje, kmsRecorrido, kmsPorLitro });
  res.json(newFuelRecord);
});

/**
 * @swagger
 * /fuelrecords/{id}:
 *   put:
 *     summary: Actualizar un registro de combustible.
 *     description: Actualiza un registro de combustible existente por su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del registro de combustible a actualizar.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FuelRecord'
 *     responses:
 *       200:
 *         description: OK. Retorna el registro de combustible actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FuelRecord'
 *       400:
 *         description: Bad Request. Error en la solicitud.
 *       404:
 *         description: Not Found. El registro de combustible no fue encontrado.
 */
app.put('/fuelrecords/:id', async (req, res) => {
  const fuelRecordId = req.params.id;
  const { usuario, estacion, fecha, litros, pesos, kilometraje, kmsRecorrido, kmsPorLitro } = req.body;

  try {
    // Buscar el registro por ID
    const fuelRecord = await FuelRecord.findByPk(fuelRecordId);

    if (!fuelRecord) {
      return res.status(404).json({ error: 'Registro de combustible no encontrado' });
    }

    // Actualizar los campos del registro
    fuelRecord.usuario = usuario;
    fuelRecord.estacion = estacion;
    fuelRecord.fecha = fecha;
    fuelRecord.litros = litros;
    fuelRecord.pesos = pesos;
    fuelRecord.kilometraje = kilometraje;
    fuelRecord.kmsRecorrido = kmsRecorrido;
    fuelRecord.kmsPorLitro = kmsPorLitro;

    // Guardar los cambios en la base de datos
    await fuelRecord.save();

    // Respuesta exitosa
    res.json(fuelRecord);
  } catch (error) {
    console.error('Error al actualizar el registro de combustible:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/**
 * @swagger
 * /fuelrecords/estacion/{estacion}:
 *   get:
 *     summary: Obtener registros de combustible por estación.
 *     description: Retorna una lista de registros de combustible filtrados por estación.
 *     parameters:
 *       - in: path
 *         name: estacion
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la estación para filtrar los registros.
 *     responses:
 *       200:
 *         description: OK. Retorna una lista de registros de combustible filtrados por estación.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FuelRecord'
 *       404:
 *         description: No se encontraron registros de combustible para la estación proporcionada.
 *       500:
 *         description: Error interno del servidor. Ocurrió un problema al procesar la solicitud.
 */
app.get('/fuelrecords/estacion/:estacion', async (req, res) => {
  const estacion = req.params.estacion;
  try {
    const fuelRecords = await FuelRecord.findAll({ 
      where: { 
        estacion: { 
          [Op.like]: `%${estacion}%` 
        } 
      } 
    });
    if (fuelRecords.length === 0) {
      return res.status(404).json({ error: 'No se encontraron registros para la estación proporcionada' });
    }
    res.json(fuelRecords);
  } catch (error) {
    console.error('Error al obtener los registros de combustible:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Swagger
const swaggerSpec = {
  ...swaggerDefinitions,
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: 'Local server'
    }
  ]
};

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
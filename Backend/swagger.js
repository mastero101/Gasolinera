const swaggerDefinitions = {
  openapi: '3.0.0',
  info: {
    title: 'Fuel Record API',
    version: '0.0.1',
    description: 'API para gestionar registros de combustible'
  },
  paths: {
    '/fuelrecords': {
      get: {
        summary: 'Obtener todos los registros de combustible.',
        description: 'Retorna una lista de todos los registros de combustible.',
        responses: {
          200: {
            description: 'OK. Retorna una lista de registros de combustible.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/FuelRecord'
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Crear un nuevo registro de combustible.',
        description: 'Crea un nuevo registro de combustible con los datos proporcionados.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FuelRecord'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'OK. Retorna el registro de combustible creado.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/FuelRecord'
                }
              }
            }
          },
          400: {
            description: 'Bad Request. Error en la solicitud.'
          }
        }
      }
    },
    '/fuelrecords/{id}': {
      put: {
        summary: 'Actualizar un registro de combustible por ID.',
        description: 'Actualiza un registro de combustible existente con los datos proporcionados.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'ID del registro de combustible a actualizar.'
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FuelRecord'
              }
            }
          }
        },
        responses: {
          200: {
            description: 'OK. Retorna el registro de combustible actualizado.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/FuelRecord'
                }
              }
            }
          },
          404: {
            description: 'Registro de combustible no encontrado.'
          },
          400: {
            description: 'Bad Request. Error en la solicitud.'
          }
        }
      }
    },
    '/fuelrecords/estacion/{estacion}': {
      get: {
        summary: 'Obtener registros de combustible por estación.',
        description: 'Retorna una lista de registros de combustible filtrados por estación.',
        parameters: [
          {
            in: 'path',
            name: 'estacion',
            required: true,
            schema: {
              type: 'string'
            },
            description: 'Nombre de la estación para filtrar los registros.'
          }
        ],
        responses: {
          200: {
            description: 'OK. Retorna una lista de registros de combustible filtrados.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/FuelRecord'
                  }
                }
              }
            }
          },
          404: {
            description: 'No se encontraron registros para la estación proporcionada.'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      FuelRecord: {
        // Definición del esquema de FuelRecord
      }
    }
  }
};

module.exports = swaggerDefinitions;


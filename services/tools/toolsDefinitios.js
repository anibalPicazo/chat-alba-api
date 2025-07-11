const toolDefinitions = [
    {
        type: 'function',
        function: {
            name: 'consultarEventos',
            description: 'Obtiene la lista de eventos almacenados en la base de datos de la Feria de Albacete.',
            parameters: {
                type: 'object',
                properties: {},
                required: []
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'explicarEventosFeria',
            description: 'Explica los eventos de la Feria de Albacete 2025 de forma simpática y manchega.',
            parameters: {
                type: 'object',
                properties: {
                    dia: {
                        type: 'string',
                        description: 'Día de la feria sobre el que se quiere información (por ejemplo: "7 de septiembre")'
                    }
                },
                required: ['dia']
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'crearEvento',
            description: 'Crea un nuevo evento en la agenda de la Feria de Albacete.',
            parameters: {
                type: 'object',
                properties: {
                    idUsuario: { type: 'string', description: 'id del usuario' },
                    descripcion: { type: 'string', description: 'Título o descricpición del evento' },
                    fecha: { type: 'string', description: 'Fecha del evento (YYYY-MM-DD)' },
                },
                required: ['idUsuario', 'descripcion', 'fecha']
            }
        }
    },
    {
        type: 'function',
        function: {
            name: 'consultarAgenda',
            description: 'Consulta los eventos de la agenda de un usuario.',
            parameters: {
                type: 'object',
                properties: {},
                required: []
            }
        }
    }
];

module.exports = { toolDefinitions };
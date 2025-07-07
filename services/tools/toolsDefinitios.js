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
    }
];

module.exports = { toolDefinitions };
export const toolDefinitions = [
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
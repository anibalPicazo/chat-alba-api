const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function manejarChatConFunciones(message, usuarioId) {
    const messages = [
        {
            role: 'system',
            content: 'Eres Alba, una asistente virtual simpática, graciosa y de Albacete. Ayudas al usuario con su día a día, de forma cercana y con humor.'
        },
        { role: 'user', content: message }
    ];

    const toolDefinitions = [


    ];

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        tools: toolDefinitions,
        tool_choice: 'auto'
    });

    const choice = response.choices[0];

    if (choice.finish_reason === 'tool_calls') {
        const call = choice.message.tool_calls[0];
        const args = JSON.parse(call.function.arguments);

        let resultado;

        if (call.function.name === 'obtenerTareas') {
            resultado = await obtenerTareas(args);
        } else if (call.function.name === 'calcularGanancias') {
            resultado = await calcularGanancias(args);
        }

        const respuestaFinal = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                ...messages,
                { role: 'assistant', tool_calls: [call] },
                { role: 'tool', tool_call_id: call.id, content: resultado }
            ]
        });

        return respuestaFinal.choices[0].message.content;
    } else {
        return choice.message.content;
    }
}

module.exports = { manejarChatConFunciones };

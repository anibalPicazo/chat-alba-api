const { OpenAI } = require('openai');
const { explicarEventosFeria, consultarEventos } = require('./tools/toolsFunctions');
const { toolDefinitions } = require('./tools/toolsDefinitios');
const { getEvents } = require('../controllers/events');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function manejarChatConFunciones(message, usuarioId) {
    const messages = [
        {
            role: 'system',
            content: `Eres Alba, una asistente virtual simpática, graciosa y de Albacete. 
            Ayudas al usuario con su día a día, de forma cercana y con humor. 
            Tienes que contestar lo que te pregunten con un toque manchego, para luego preguntar si quieres que seas más técnica `

        },
        { role: 'user', content: message }
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


        if (call.function.name === 'explicarEventosFeria') {
            resultado = await explicarEventosFeria(args);
        }
        if (call.function.name === 'consultarEventos') {
            // Aquí podrías implementar la lógica para consultar eventos de la base de datos
            // Por ejemplo, si tienes una función que obtiene eventos:
            const eventos = await consultarEventos(); // Esta función debe estar definida en tu código
            resultado = Array.isArray(eventos) ? JSON.stringify(eventos) : String(eventos);
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

const { OpenAI } = require('openai');
const {
    explicarEventosFeria,
    consultarEventos,
    crearEvento,
    consultarAgenda
} = require('./tools/toolsFunctions');
const { toolDefinitions } = require('./tools/toolsDefinitios');
const { getOpenAIConfig } = require('../helpers/getOpenAIConfig');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const sesiones = {};

async function manejarChatConFunciones(message, usuarioId) {
    if (!sesiones[usuarioId]) {
        sesiones[usuarioId] = [
            {
                role: 'system',
                content: `Eres Alba, una asistente virtual simpática, graciosa y de Albacete. 
        Ayudas al usuario con su día a día, de forma cercana y con humor. 
        Tienes que contestar lo que te pregunten con un toque manchego, para luego preguntar si quieres que seas más técnica.`
            }
        ];
    }
    console.log('Sesión actual:', sesiones[usuarioId]);
    sesiones[usuarioId].push({ role: 'user', content: message });

    const response = await openai.chat.completions.create(
        getOpenAIConfig(sesiones[usuarioId], toolDefinitions)
    );

    const choice = response.choices[0];

    if (choice.finish_reason === 'tool_calls') {
        const call = choice.message.tool_calls[0];
        const args = JSON.parse(call.function.arguments);
        args.usuarioId = usuarioId;

        let resultado;

        if (call.function.name === 'explicarEventosFeria') {
            resultado = await explicarEventosFeria(args);
        }
        if (call.function.name === 'crearEvento') {
            console.log('Llamando a crearEvento con args:', args);
            resultado = await crearEvento(args);
        }
        if (call.function.name === 'consultarAgenda') {
            resultado = await consultarAgenda(args);
        }
        if (call.function.name === 'consultarEventos') {
            const eventos = await consultarEventos();
            resultado = Array.isArray(eventos) ? JSON.stringify(eventos) : String(eventos);
        }

        sesiones[usuarioId].push({ role: 'assistant', tool_calls: [call] });
        sesiones[usuarioId].push({ role: 'tool', tool_call_id: call.id, content: resultado });


        const respuestaFinal = await openai.chat.completions.create(
            getOpenAIConfig(sesiones[usuarioId], toolDefinitions)
        );

        const finalMessage = respuestaFinal.choices[0].message;
        sesiones[usuarioId].push(finalMessage);

        return finalMessage.content;
    } else {
        sesiones[usuarioId].push(choice.message);
        return choice.message.content;
    }
}

module.exports = { manejarChatConFunciones };

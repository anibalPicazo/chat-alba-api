const { OpenAI } = require('openai');
const {
    explicarEventosFeria,
    consultarEventos,
    crearEvento,
    consultarAgenda
} = require('./tools/toolsFunctions');
const { toolDefinitions } = require('./tools/toolsDefinitios');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Memoria en memoria por usuario
const sesiones = {};

async function manejarChatConFunciones(message, usuarioId) {
    // Si no existe una sesión, se inicia con el system prompt
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
    // Agregar mensaje del usuario al historial
    sesiones[usuarioId].push({ role: 'user', content: message });

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: sesiones[usuarioId],
        tools: toolDefinitions,
        tool_choice: 'auto'
    });

    const choice = response.choices[0];

    // Si el modelo decide llamar a una función
    if (choice.finish_reason === 'tool_calls') {
        const call = choice.message.tool_calls[0];
        const args = JSON.parse(call.function.arguments);
        args.usuarioId = usuarioId;

        let resultado;

        if (call.function.name === 'explicarEventosFeria') {
            resultado = await explicarEventosFeria(args);
        }
        if (call.function.name === 'crearEvento') {
            resultado = await crearEvento(args);
        }
        if (call.function.name === 'consultarAgenda') {
            resultado = await consultarAgenda(args);
        }
        if (call.function.name === 'consultarEventos') {
            const eventos = await consultarEventos();
            resultado = Array.isArray(eventos) ? JSON.stringify(eventos) : String(eventos);
        }

        // Añadir llamada a herramienta y respuesta al historial
        sesiones[usuarioId].push({ role: 'assistant', tool_calls: [call] });
        sesiones[usuarioId].push({ role: 'tool', tool_call_id: call.id, content: resultado });

        // Segunda llamada a OpenAI para generar la respuesta final con la info devuelta por la función
        const respuestaFinal = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: sesiones[usuarioId]
        });

        const finalMessage = respuestaFinal.choices[0].message;
        sesiones[usuarioId].push(finalMessage);

        return finalMessage.content;
    } else {
        // Respuesta directa sin uso de herramientas
        sesiones[usuarioId].push(choice.message);
        return choice.message.content;
    }
}

module.exports = { manejarChatConFunciones };

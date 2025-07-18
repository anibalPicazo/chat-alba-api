const { consultarAgendaService } = require('../../controllers/agenda');
const { obtenerEventos } = require('../../controllers/events');
const Agenda = require('../../models/Agenda');

function explicarEventosFeria({ dia }) {
    const eventos = {
        '7 de septiembre': '¡Arrancamos la feria con el tradicional desfile de carrozas manchegas y la apertura del recinto ferial! No te pierdas la batalla de miguelitos ni el pregón con chascarrillos de la tierra.',
        '8 de septiembre': 'Día de la Virgen de Los Llanos: procesión, fuegos artificiales y concurso de lanzamiento de peineta. Por la noche, verbena con orquesta y mucho buen rollo.',
        '9 de septiembre': 'Concurso de gazpachos manchegos y torneo de tute en la carpa principal. Por la tarde, encierro infantil con toros hinchables.',
        '10 de septiembre': 'Día del traje típico: desfile de manchegos y manchegas, y taller de nudos de pañuelo. Por la noche, monólogos de humoristas locales.',
        '11 de septiembre': 'Gran paellada popular y campeonato de lanzamiento de hueso de aceituna. Cierra el día un concierto de rock manchego.',
        '12 de septiembre': 'Día de la familia: juegos tradicionales, gymkana y espectáculo de magia para peques y mayores.',
        '13 de septiembre': 'Feria de tapas y vinos de la tierra, con música en directo y cata de quesos manchegos.',
        '14 de septiembre': 'Cierre de feria con desfile de gigantes y cabezudos, entrega de premios y fuegos artificiales para despedir la fiesta.'
    };
    return eventos[dia] || 'Ese día no hay eventos programados, ¡pero seguro que encuentras buen ambiente y algo rico para picar!';
}

async function consultarEventos() {
    const eventos = await obtenerEventos();
    if (!eventos || eventos.length === 0) {
        return 'No hay eventos registrados.';
    }
    return eventos.map(e => `• ${e.titulo} (${e.fecha?.toLocaleDateString?.() || ''}): ${e.descripcion || ''}`).join('\n');
}



async function crearEvento({ idUsuario, descripcion, fecha }) {
    const evento = new Agenda({ idUsuario, descripcion, fecha });
    await evento.save();
    return `Evento "${descripcion}" creado para el ${fecha} }.`;
}
async function consultarAgenda({ usuarioId }) {
    console.log('Consultando agenda para el usuario:', { usuarioId });
    const eventos = await consultarAgendaService(usuarioId);
    if (!eventos || eventos.length === 0) {
        return 'No hay eventos registrados.';
    }
    return eventos.map(e => `• ${e.titulo} (${e.fecha?.toLocaleDateString?.() || ''}): ${e.descripcion || ''}`).join('\n');
}

module.exports = { explicarEventosFeria, consultarEventos, crearEvento, consultarAgenda };




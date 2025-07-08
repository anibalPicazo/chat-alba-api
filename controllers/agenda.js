const { response } = require("express")
const Agenda = require('../models/Agenda')


const createEventAgenda = async (req, res = response) => {


    const agenda = new Agenda(req.body)
    try {
        const agendaSaved = await agenda.save()
        res.status(200).json({
            ok: true,
            agenda: agendaSaved
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }

}
const consultarAgendaService = async (idUsuario) => {
    return await Agenda.find({ idUsuario: idUsuario });
}
module.exports = { createEventAgenda, consultarAgendaService }
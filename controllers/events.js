const { response } = require("express")
const Event = require('../models/evento')

const obtenerEventos = async () => {
    return await Event.find();
};

const getEvents = async (req, res) => {
    try {
        const events = await obtenerEventos();
        res.status(200).json({
            ok: true,
            events
        });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error' });
    }
};
const createEvents = async (req, res = response) => {
    if (req.params.id) {
        return res.status(200).json({
            ok: true,
            msg: 'editEvent'
        })
    }

    const event = new Event(req.body)
    event.user = req.uid
    try {
        const eventSaved = await event.save()
        res.status(200).json({
            ok: true,
            event: eventSaved
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }

}
module.exports = {
    getEvents,
    createEvents,
    obtenerEventos
}
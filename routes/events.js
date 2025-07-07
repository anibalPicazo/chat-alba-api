const { Router } = require('express')

const router = Router()

const { getEvents, createEvents } = require('../controllers/events');

router.get('/', getEvents);
router.post('/', createEvents)

module.exports = router;
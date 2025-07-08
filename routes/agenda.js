const { Router } = require('express');
const { createEventAgenda } = require('../controllers/agenda');

const router = Router()


router.post('/', createEventAgenda)

module.exports = router;
const express = require('express');
const router = express.Router();
const caractesControllers = require('../controllers/charactersControllers')

router.get('/characters', caractesControllers.getCharacters);

module.exports = router;
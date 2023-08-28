const express = require('express');
const router = express.Router();
const charactersRoutes = require('./charactersRoutes');
const seriesRoutes = require('./seriesRoutes')

router.use('/api', charactersRoutes);
router.use('/api', seriesRoutes);

module.exports = router;
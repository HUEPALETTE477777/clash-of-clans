const express = require('express');
const playerRoute = require('./routes/PlayerRoute');
const clanRoute = require('./routes/ClanRoute');

const router = express.Router();

router.use('/players', playerRoute);
router.use('/clans', clanRoute);

module.exports = router;
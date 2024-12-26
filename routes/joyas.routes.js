const express = require('express');
const { consultaJoyas, consultaJoyasFiltradas } = require('../controllers/joyas.controller');

const router = express.Router();

router.get('/joyas', consultaJoyas);
router.get('/joyas/filtros', consultaJoyasFiltradas);

module.exports = router;

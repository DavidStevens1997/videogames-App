const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameRouter = require('./videogame.js');
const videogamesRouter = require('./videogames.js');
const genresRouter = require('./genres.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogame', videogameRouter);
router.use('/videogames', videogamesRouter);
router.use('/genres', genresRouter);

module.exports = router;
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
require('dotenv').config();
const axios = require ('axios');
const { Videogame, Genres }= require('../db');
const { API_KEY } = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res) => {
    try {
      return res.status(200).send('Homepage!');
    } catch (errorMessage) {
      console.log(errorMessage);
    }
});

const getApiInfo = async() => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const apiInfo = await apiUrl.data.results.map((videogame) => {
       return {
        id: videogame.id,
        Image: videogame.background_image,
        name: videogame.name,
        genres: videogame.genres.map((genre) => genre.name),
        rating: videogame.rating,
       }; 
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Videogame.findAll({
        include:{
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        } 
    });
};

const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/videogames', async (req, res) => {
    const name = req.query.name
    let videogamesTotal = await getAllVideogames();
    if(name){
        let videogamesName = await videogamesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        videogamesName.lenght ?
        res.status(200).send(videogamesName) :
        res.status(404).send('No existe el videojuego');
    } else {
        res.status(200).send(videogamesTotal)
    }
})



module.exports = router;
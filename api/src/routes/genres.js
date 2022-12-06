const { Router } = require('express');
const {Genres}= require('../db');
const axios  = require('axios');
const router = Router();
const { API_KEY } = process.env;

router.get('/' , async (req,res,next) => {
    try {
        const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        genresAPI = genresAPI.data.results;
        for (let i = 0; i< genresAPI.length; i++){
            const newGenre = await Genres.findOrCreate({
               where:{
                 id: genresAPI[i].id,
                 name: genresAPI[i].name
               } 
            })
        }
        
        // Trayendo de la base de datos
        let genresDB = await Genres.findAll();
        genresDB = genresDB.map(genre => genre={id:genre.id , name: genre.name})
        res.status(200).send(genresDB)
    }
    catch (error) {
        response.status(400).send('Something went wrong!');
    }
    
});


module.exports = router;
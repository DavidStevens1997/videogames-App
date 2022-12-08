const { Router } = require('express');
const { Genres }= require('../db');
const axios  = require('axios');
const router = Router();
const { API_KEY } = process.env;

router.get('/' , async (req,res,next) => {
    try {
      const genresFromApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`, {headers:{"accept-encoding":'*'}});
      const { results } = genresFromApi.data;
      //Itero cada uno de los resultados para extraer las propiedades name, si existe no la creo y si no existe la creo
      for (let i = 0; i < results.length; i++) {
        const { id, name } = results[i];
        // console.log(results[i]);
        await Genres.findOrCreate({
          where: { 
            id: id,
            name: name 
            },
        });
      }
      let allGenres = await Genres.findAll();
      
      res.status(200).json(allGenres);
        
    }catch (error) {
        response.status(400).send('Something went wrong!');
    }
    
});


module.exports = router;
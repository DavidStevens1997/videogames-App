const { Router } = require('express');

// Importo Videogame para generar un nuevo juego
const { Videogame , Genres}= require('../db');
const axios = require ('axios');
const router = Router();
const { API_KEY } = process.env;


/*
function removeTags(str) {
    if ((str===null) || (str===''))
        return '';
    else
        str = str.toString();    
    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}
*/


router.get('/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params;
  
    try {
      let gameToReturn;
  
      if (idVideogame.length > 10) {
        let searchedGameByDatabase = await Videogame.findAll({
          where: {
            id: idVideogame,
          },
          include: Genres,
        });
  
        gameToReturn = searchedGameByDatabase.map((videogame) => {
          return {
            background_image: videogame.background_image,
            name: videogame.name,
            genres: videogame.genres.map((genre) => genre.name),
            description: videogame.description,
            released: videogame.released,
            rating: videogame.rating,
            platforms: videogame.platforms,
          };
        });
      } else {
        let searchedGameByApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`, {headers:{"accept-encoding":'*'}});
        let VideogameInfo = searchedGameByApi.data;
        console.log(VideogameInfo);
        gameToReturn = {
          background_image: VideogameInfo.background_image,
          name: VideogameInfo.name,
          genres: VideogameInfo.genres.map((genre) => genre.name),
          description: VideogameInfo.description_raw,
          released: VideogameInfo.released,
          rating: VideogameInfo.rating,
          platforms: VideogameInfo.platforms.map((plat) => plat.platform.name),
        };
      }
  
      return res.status(200).send(gameToReturn);
    } catch (error) {
        console.log(error);
      res.status(404).send('The ID was not found.');
    }
  });


router.post('/', async (req, res) => {
    try {
      let { 
        background_image,
        name, 
        description, 
        released, 
        rating, 
        platforms, 
        genres, 
      } = req.body;
  
      /* if (!name || !description || !platforms) {
        return res.status(400).send("information is missing");
      } */
    
      let newGame = await Videogame.create({
        background_image, //'https://i.pinimg.com/564x/1e/1e/49/1e1e4996b0f17197b81e578450462c14.jpg',
        name,
        description,
        released,
        rating,
        platforms,
      });
  
      console.log(req.body);
       let genreDb = await Genres.findAll({
        where: { name: genres}
      });
  
      newGame.addGenres(genreDb)
      res.status(200).send('Perfect! The videogame was created.');
    } catch {
      res.status(400).send('Sorry! The videogame was not created.');
    }
  });




module.exports = router;
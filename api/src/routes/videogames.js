const { Router, response } = require('express');
const { Videogame , Genres }= require('../db');
const {Op} = require('sequelize');
const axios  = require('axios').default;
const router = Router();
const { API_KEY } = process.env;

router.get('/' , async(req,res,next) => {
  const { name } = req.query;
  try {
      let resultsToReturn = [];
      let rawgApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`, {headers:{"accept-encoding":'*'}});
      //let rawgApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=5`, {headers:{"accept-encoding":'*'}});
      let dataApi = rawgApi.data;
      let resultsApi = dataApi.results; 
      let gameInfo = resultsApi.map((videogame) => {
        return {
            background_image: videogame.background_image,
            name: videogame.name,
            genres: videogame.genres.map((genre) => genre.name),
            id: videogame.id,
            rating: videogame.rating,
        }
      });
      resultsToReturn = resultsToReturn.concat(gameInfo);
  
    return res.status(200).json(resultsToReturn);

  } catch (error) {
      console.log(error)
      res.status(400).send('Something went wrong!');
  }
});
module.exports = router;
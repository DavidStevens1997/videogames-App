const { Router, response } = require('express');
const { Videogame , Genres }= require('../db');
const {Op} = require('sequelize');
const axios  = require('axios').default;
const router = Router();
const { API_KEY } = process.env;

router.get('/' , async(req,res) => {
  const { name } = req.query;
  try {
    if (name) {
      const gameDb = await Videogame.findAll({
        where: {
          name: { [Op.iLike]: '%' + name + '%' },
        },
        include: Genres,
      });

      let FullGameDb;
      if (gameDb) {
        FullGameDb = gameDb.map((videogame) => {
          return {
            background_image: videogame.image,
            name: videogame.name,
            genres: videogame.genres.map((genre) => genre.name),
            id: videogame.id,
            rating: videogame.rating,
          };
        });
      }
      const searchGameApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`, {headers:{"accept-encoding":'*'}});
      const searchGameUrl = searchGameApi.data.results;
      const gameInfo = searchGameUrl.map((videogame) => {
        return {
            background_image: videogame.background_image,
            name: videogame.name,
            genres: videogame.genres.map((genre) => genre.name),
            id: videogame.id,
            rating: videogame.rating,
        }
      });
      resultsToReturn = FullGameDb.concat(gameInfo);
      resultsToReturn.length ?
      res.status(200).json(resultsToReturn) :
      res.status(400).send('Something went wrong!');
    } else {
      let resultsToReturn = [];
      const rawApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=33`, {headers:{"accept-encoding":'*'}});
        let videoGamesUrl = rawApi.data.results;
        let gameInfo = videoGamesUrl.map((videogame) => {
          return {
              background_image: videogame.background_image,
              name: videogame.name,
              genres: videogame.genres.map((genre) => genre.name),
              id: videogame.id,
              rating: videogame.rating,
          }
        });
        resultsToReturn = resultsToReturn.concat(gameInfo); 
      
      let videogamesDb = await Videogame.findAll({
        include: Genres,
      })
      let videogamesDbConcat = videogamesDb.map((videogame) => {
        return {
            background_image: videogame.background_image,
            name: videogame.name,
            genres: videogame.genres.map((genre) => genre.name),
            id: videogame.id,
            rating: videogame.rating,
        }
      });
      resultsTotal = videogamesDbConcat.concat(resultsToReturn);
      return res.status(200).json(resultsTotal);

    }
      
  } catch (error) {
      console.log(error)
      res.status(400).send('Something went wrong!');
  }
});
module.exports = router;
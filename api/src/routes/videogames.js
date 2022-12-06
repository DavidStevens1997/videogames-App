const { Router } = require('express');
const { Videogame , Genres }= require('../db');
const {Op} = require('sequelize');
const axios  = require('axios');
const router = Router();
const { API_KEY } = process.env;

router.get('/' , async(req,res,next) => {
    try {
        let resultsToReturn = [];
        let rawgApi = (`https://api.rawg.io/api/games?page=${i}&key=${API_KEY}`);
  
        for (let i = 0; i < 3; i++) {
          let videogames = (await axios.get(rawgApi)).data;
          let gameInfo = videogames.results.map((videogame) => {
            return {
              background_image: videogame.background_image,
              name: videogame.name,
              genres: videogame.genres.map((genre) => genre.name),
              id: videogame.id,
              rating: videogame.rating,
            };
          });
          rawgApi = videogames.next;
          resultsToReturn = resultsToReturn.concat(gameInfo);
        }
        console.log(allGames);
      return res.status(200).send(allGames);
         

    } catch (error) {
        //console.log(error)
        res.status(400).send('Something went wrong!');
    }
});
module.exports = router;
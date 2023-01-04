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
      const getGamesApi = async () => {
        let GamesApi = [];
        for (let i = 1; i <= 5; i++) {
          const resApi = await axios.get(`https://api.rawg.io/api/games?page=${i}&key=${API_KEY}`, {
            headers: {
              "Accept-Encoding": "null"
            }
          });
          GamesApi = GamesApi.concat(resApi.data.results.map(videogame => {
            return {
              id: videogame.id,
              name: videogame.name,
              background_image: videogame.background_image,
              rating: videogame.rating,
              genres: videogame.genres.map(el => el.name),
              released: videogame.released
            }
          }));
        }
        return GamesApi;
      };
   

      const getGamesDb = async () => {
          try {
              const dataBase = await Videogame.findAll({
                include: [{
                  attributes: ["name"],
                  model: Genres,
                  through: {
                    attributes: [],
                  },
                }],
              }).then(r=>r.map(r=>r.toJSON()));

              dataBase.forEach(v => {v.genres = v.genres.map(g => g.name)})// se usa un forEach para recorrer 
              return dataBase;
            } catch (error) {
              return error;
            }
      }


      const getAllGames = async () => {
          try {
              let apiGames = await getGamesApi();
              let dbGames = await getGamesDb();
              return dbGames.concat(apiGames);
            } catch (error) {
              throw error;
            }
      }

      const data = await getAllGames();
      res.send(data);

    }
      
  } catch (error) {
      console.log(error)
      res.status(400).send('Something went wrong!');
  }
});



module.exports = router;
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
      /* let resultsToReturn = [];
      const rawApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=50`, {headers:{"accept-encoding":'*'}});
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
      return res.status(200).json(resultsTotal); */

      const getGamesApi = async () => {
        let leakedGamesApi = [];
        for (let i = 1; i <= 5; i++) {
          const resApi = await axios.get(`https://api.rawg.io/api/games?page=${i}&key=${API_KEY}`, {
            headers: {
              "Accept-Encoding": "null"
            }
          });
          leakedGamesApi = leakedGamesApi.concat(resApi.data.results.map(game => {
            return {
              id: game.id,
              name: game.name,
              background_image: game.background_image,
              rating: game.rating,
              genres: game.genres.map(el => el.name),
              released: game.released
            }
          }));
        }
        console.log("respuesta de búsqueda en Api por nombre exitosa");
        return leakedGamesApi;
      };
   

const getGamesDb = async () => {
    try {
        const db = await Videogame.findAll({
          include: [{
            attributes: ["name"],
            model: Genres,
            through: {
              attributes: [],
            },
          }],
        }).then(r=>r.map(r=>r.toJSON()));

        console.log('respuesta de busqueda en DB por nombre exitosa')
        
        db.forEach(v => {v.genres = v.genres.map(g => g.name)})// se usa un forEach para recorrer 
        console.log(db, 'aca')
        return db;
      } catch (error) {
        return error;
      }
}


const getAllGames = async () => {
    try {
        let apiJuegos = await getGamesApi();
        let dbJuegos = await getGamesDb();
        return dbJuegos.concat(apiJuegos);
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
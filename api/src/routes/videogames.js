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

router.post('/', async (req, res) => {
  const { 
    //background_image,
    name, 
    description, 
    released, 
    rating, 
    genres, 
    //platforms 
  } = req.body;

  try {
    const newGame = await Videogame.create({
      background_image: 'https://i.pinimg.com/564x/1e/1e/49/1e1e4996b0f17197b81e578450462c14.jpg',
      name,
      description,
      released,
      rating,
      //platforms: platforms,
    });

    /* let genreDb = await Genres.findAll({
      where: { name: genres}
    });

    newGame.addVideogame(genreDb)
    res.status(200).send('Perfect! The videogame was created.'); */
    genres.forEach(async (genre) => {
      let gameGenres = await Genres.findOne({ where: { name: genre } });
      await newGame.addGenre(gameGenres);
    });

    response.status(200).send(newGame);
  } catch {
    res.status(400).send('Sorry! The videogame was not created.');
  }
});

module.exports = router;
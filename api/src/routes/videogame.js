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


router.get('/:idVideogame' , async (req,res,next) => {
    //const {idVideogame , created} = req.params;
    const {idVideogame} = req.params;
    if (!idVideogame) return res.status(404).send("The ID is not specified");
    try {
        if(idVideogame.length<10) { //if (!created) {
            let game = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
            if (game) {
                game = { 
                    id: game.data.id,
                    name: game.data.name,
                    background_image: game.data.background_image,
                    description: game.data.description_raw , //removeTags(game.data.description),
                    released: game.data.released,
                    rating: game.data.rating,
                    platforms: game.data.platforms.map (el => (
                        el = {id: el.platform.id , name:el.platform.name})),
                    genres: game.data.genres.map (el => (el= {id:el.id , name:el.name}))
                }
                return res.send(game);
            }
            res.status(404).send("There is no wanted game");
        }
        else {
            let game = await Videogame.findByPk(idVideogame, { include: Genres });
            if(game) {
                game = {
                    id: game.id,
                    name: game.name,
                    background_image: game.background_image,
                    description: game.description,
                    released: game.released,
                    rating: game.rating,
                    platforms: game.platforms,
                    genres: game.genres
                }
                return res.send(game);
            }
        }
    }
    catch (error) {
        res.status(404).send("There is no wanted game"); 
        return next();
    }
}); 


router.post('/' , async (req,res,next) => {
    const {
        name,
        description,
        released,
        rating,
        platforms,
        genres,
        background_image
    } = req.body;
    if (name && description  && platforms && genres) {
        try {
            const [game , created] = await Videogame.findOrCreate ({
                where: {
                    name: name.toUpperCase()
                },
                defaults: {
                    description,
                    released,
                    rating,
                    platforms,
                    background_image,
                   // created: true
                }
            })
            if (created)  {
                genres.forEach (async (el) => {
                    let genre = await Genres.findOne({ 
                        where: {name: el} 
                    });
                    await game.setGenres (genre.id);
                })
                let gameReturned = await Videogame.findByPk(game.id,{  
                    include:Genres 
                })
                gameReturned = {
                    id: gameReturned.id,
                    name: gameReturned.name,
                    description: gameReturned.description,
                    released: gameReturned.released,
                    rating: gameReturned.rating,
                    platforms: gameReturned.platforms,
                    background_image: gameReturned.background_image,
                }
                return res.send(gameReturned);
            }
            else {
                return res.send({error:"The game already exists"});
            }
        }
        catch (error) {
            response.status(400).send('Something went wrong!');
        }
    }
    res.status(404).send("Error");
});




module.exports = router;
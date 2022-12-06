const { Router } = require('express');
const { Videogame , Genres }= require('../db');
const {Op} = require('sequelize');
const axios  = require('axios');
const router = Router();
const { API_KEY } = process.env;

router.get('/' , async(req,res,next) => {
    const {name} = req.query;
    if (name) {
        try {
            let promiseAllGamesDB = await Videogame.findAll({
                where: {
                name: {[Op.iLike]: "%" + name.toUpperCase() + "%"}
                },
                include: Genres     
            });
            let promiseAllGamesAPI = await axios.get(
                `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
            );
            /* Promise.all([
                promiseAllGamesDB,
                promiseAllGamesAPI
            ]) */
            .then (response => {
                let [AllGamesDB , AllGamesAPI] = response;
                let allGames = [...AllGamesDB , ...AllGamesAPI.data.results]
                let auxGames = []
                
                if (!allGames.length) return res.status(404).send("There is no game with the requested name");
                console.log()
                allGames.forEach(el => {
                    auxGames.push({
                        id: el.id,
                        name: el.name,
                        background_image: el.background_image,
                        genres: el.genres.map(genre => genre={id:genre.id , name: genre.name}),
                        rating: el.rating
                    })
                }); 
                /*if (auxGames.length > 15) auxGames = auxGames.slice(0,15); //extrae desde el primer elemento hasta el 14 */
                res.send(auxGames);
            })
        }
        catch(error) {
            console.log(error)
            response.status(400).send('Something went wrong!');
        }
    }else {
        try{
            let allPromises = [];
            allPromises.push(Videogame.findAll({include: Genres}));
            for (let i = 1; i <=5 ; i++){
                allPromises.push(axios.get(
                    `https://api.rawg.io/api/games?page=${i}&key=${API_KEY}` 
                ))
            } 
            Promise.all(allPromises)
            .then (response => {
                let [AllGamesDB , ...AllGamesAPIarray] = response;
                let AllGamesAPI = [];
                AllGamesAPIarray.forEach(el => {AllGamesAPI =AllGamesAPI.concat(el.data.results)});
                let allGames = [...AllGamesDB , ...AllGamesAPI]
                if (!allGames.length) return res.status(404).send('Something went wrong!');
                let auxGames = []
                console.log(allGames)
                allGames.forEach(el => {
                    auxGames.push({
                        id: el.id,
                        name: el.name,
                        background_image: el.background_image,
                        genres: el.genres.map(genre => genre={id:genre.id , name: genre.name}),
                        rating: el.rating
                    })
                }); 
                res.send(auxGames);
            })
        }
        catch(error){
            console.log(error)
            response.status(400).send('Something went wrong!');
        }}

});
module.exports = router;
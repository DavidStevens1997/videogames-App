import axios from 'axios';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';

export function getVideogames(){
    return async function(dispatch){
        var jsonVideogames = await axios.get("http://localhost:3001/videogames",{});
        return dispatch({
           type: GET_VIDEOGAMES,
           payload: jsonVideogames.data 
        });
    };
}

export function getGenres(){
    return async function(dispatch){
        var jsonGenres = await axios.get("http://localhost:3001/genres",{});
        return dispatch({
           type: GET_GENRES,
           payload: jsonGenres.data, 
        });
    };
}
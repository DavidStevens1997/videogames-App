import axios from 'axios';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_NAME = 'ORDER_NAME';
export const ORDER_RATING = 'ORDER_RATING';
export const GET_NAME_VIDEOGAMES = 'GET_NAME_VIDEOGAMES';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';

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

export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload, 
    }
}

export function orderName(payload){
    return{
        type: ORDER_NAME,
        payload,
    }
}

export function orderRating(payload){
    return{
        type: ORDER_RATING,
        payload,
    }
}

export function getNameVideogames(name){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/videogames?name=" + name)
            return dispatch({
                type: GET_NAME_VIDEOGAMES,
                payload: json.data 
            });
    }
}

export function postVideogame(payload){
    return async function (dispatch){
        const response = await axios.post("http://localhost:3001/videogame", payload);
        return dispatch({
            type: CREATE_VIDEOGAME,
            payload: response,
        });
    }
}
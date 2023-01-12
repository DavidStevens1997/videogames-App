import {
  GET_VIDEOGAMES,
  GET_GENRES,
  FILTER_CREATED,
  ORDER_NAME,
  ORDER_RATING,
  GET_NAME_VIDEOGAMES,
  CREATE_VIDEOGAME,
  VIDEOGAME_DETAIL,
  FILTER_GENRE
} from '../actions';
const initialState = {
    videogames: [],
    genres: [],
    filterVideogames: [],
    videogameDetail: []
};

export default function rootReducer (state= initialState, action){
    switch (action.type) {
        case GET_VIDEOGAMES:
          return{
            ...state,
            videogames: action.payload,
            filterVideogames: action.payload,
          };
        
        case GET_GENRES:
          return {
            ...state,
            genres: action.payload,
          };
        
        case FILTER_CREATED:
          const filterVideogamesByCreation = state.filterVideogames
          const createdFilter = action.payload === 'All' ? filterVideogamesByCreation : action.payload === 'Created'
          ? filterVideogamesByCreation.filter((videogame) => videogame.id.toString().length > 15) 
          : filterVideogamesByCreation.filter((videogame) => videogame.id.toString().length < 15)
          return {
            ...state,
            videogames: createdFilter,
          };
        
        case ORDER_NAME:
          let sortedArr = action.payload === 'asc' ?
              state.videogames.sort(function (a, b){
               /*  if (a.name > b.name){
                  return 1;
                }
                if (b.name > a.name) {
                  return -1;
                }
                return 0; */
                
                return a.name.localeCompare(b.name)
              }) : 
              state.videogames.sort(function (a, b){
               /*  if (a.name > b.name){
                  return -1;
                }
                if (b.name > a.name) {
                  return 1;
                }
                return 0; */
                return b.name.localeCompare(a.name)
              })
          return {
            ...state,
            videogames: sortedArr,
          };

        case ORDER_RATING:
          let sortedArrr = action.payload === 'asc' ?
              state.videogames.sort(function (a, b){
                if (a.rating > b.rating){
                  return 1;
                }
                if (b.rating > a.rating) {
                  return -1;
                }
                return 0;
              }) : 
              state.videogames.sort(function (a, b){
                if (a.rating > b.rating){
                  return -1;
                }
                if (b.rating > a.rating) {
                  return 1;
                }
                return 0;
              })
          return {
            ...state,
            videogames: sortedArrr,
          };
        
        case GET_NAME_VIDEOGAMES:
          return{
            ...state,
            videogames: action.payload
          }

        case CREATE_VIDEOGAME:
          return{
            ...state,
          }

        case VIDEOGAME_DETAIL:
          return{
            ...state,
            videogameDetail: action.payload 
          }

        case FILTER_GENRE:
          const filteredVideogameGenre = state.filterVideogames;
          const genreFilter = action.payload === 'All'
          ? filteredVideogameGenre
          : filteredVideogameGenre.filter((videogame) => 
          videogame.genres.includes(action.payload))
          return{
            ...state,
            videogames: genreFilter,
          }

          default: return state;
    }
}

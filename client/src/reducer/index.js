
const initialState = {
    videogames: []
}

function rootReducer (state= initialState, action){
    switch (acton.type) {
        case 'GET_VIDEOGAMES':
          return{
            ...state,
            videogames: action.payload
          }
    }
}

export default rootReducer;
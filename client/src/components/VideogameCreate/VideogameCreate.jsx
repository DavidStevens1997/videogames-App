import React from "react";
import {useState, useEffect} from 'react';
import {Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {postVideogame, getGenres} from '../../actions/index';

let selectGenres = {
    genreOne: '',
    genreTwo: '',
  };
  
  let selectPlatforms = {
    platformOne: '',
    platformTwo: '',
  };

export default function VideogameCreate(){
    const dispatch = useDispatch()
    const genres = useSelector((state) => state.genres)

    const [input, setInput] = useState({
        background_image: "",
        name: "", 
        released: "",
        rating: "", 
        platforms:[], 
        genres: [], 
    })

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    return(
        <div>
            <Link to= '/home'><button>Back</button></Link>
            <h1>Create your videogame!</h1>
            <form>
            <div>
                    <label>Url-Image:</label>
                    <input
                    type="text"
                    value={input.background_image}
                    name= "background_image"
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input
                    type="text"
                    value={input.name}
                    name= "name"
                    />
                </div>
                <div>
                    <label>Released:</label>
                    <input
                    type="string"
                    value={input.released}
                    name= "released"
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                    type="number"
                    value={input.rating}
                    name= "rating"
                    />
                </div>
            </form>
        </div>
    )


}
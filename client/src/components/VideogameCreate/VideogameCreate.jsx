import React from "react";
import {useState, useEffect} from 'react';
import {Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {postVideogame, getGenres} from '../../actions/index';

  let selectPlatforms = {
    platformOne: '',
    platformTwo: '',
  };

export default function VideogameCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)

    const [input, setInput] = useState({
        background_image: "",
        name: "", 
        released: "",
        rating: "", 
        platforms:[], 
        genres: [],
        description: "", 
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    function handlePlatform(e){
    return (selectPlatforms[e.target.name] = e.target.value);
    }
    
    function handleGenre(e){
        setInput ({
            ...input,
            genres: [...input.genres,e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postVideogame(input))
        alert("Videogame created!")
        setInput({
            background_image: "",
            name: "", 
            released: "",
            rating: "", 
            platforms:[], 
            genres: [],
            description: "",
        })
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    return(
        <div>
            <Link to= '/home'><button>Back</button></Link>
            <h1>Create your videogame!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>Url-Image:</label>
                <input
                type="text"
                value={input.background_image}
                name= "background_image"
                onChange={handleChange}
                />
            </div>
            <div>
                <label>Name:</label>
                <input
                type="text"
                value={input.name}
                name= "name"
                onChange={handleChange}
                />
            </div>
            <div>
                <label>Released:</label>
                <input
                type="string"
                value={input.released}
                name= "released"
                onChange={handleChange}
                />
            </div>
            <div>
                <label>Rating:</label>
                <input
                type="number"
                value={input.rating}
                name= "rating"
                onChange={handleChange}
                />
            </div>
            <div className="descriptionContainer">
                <label>Description:</label>
                <input
                type="string"
                /* style="width:200px;height:15px" */
                value={input.description}
                name= "description"
                onChange={handleChange}
                />
            </div>
            <select name="platformOne" onChange={(e) => handlePlatform(e)}>
                <option>Select a Platform*</option>
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Other">Other</option>
            </select>

            <select name="platformTwo" onChange={(e) => handlePlatform(e)}>
                <option>Select a Platform</option>
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Other">Other</option>
            </select>

            <select name="genreOne" onChange={(e) => handleGenre(e)}>
                <option>Select a Genre*</option>
                {genres.map((genre) => (
                <option value={genre.name}>{genre.name}</option>
                ))}
            </select>

            <ul><li>{input.genres.map(e => e + " ,")}</li></ul>
            
            <button type='submit'>Create Videogame</button>
            </form>
        </div>
    )


}
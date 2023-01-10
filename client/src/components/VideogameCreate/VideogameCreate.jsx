import React from "react";
import {useState, useEffect} from 'react';
import {Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {postVideogame, getGenres} from '../../actions/index';
import '../VideogameCreate/VideogameCreate.css';

  let selectPlatforms = {
    platformOne: '',
    platformTwo: '',
  };

  function validate(input) {
    let errors = {};
    if(!input.name){
        errors.name = 'Name is required';
    } else if (!input.released){
        errors.released = 'Released is required';
    }else if (input.rating < 1 || input.rating > 5 ){
        errors.rating = 'A number from 1 to 5 is required';
    }
    return errors;
    }

export default function VideogameCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const genres = useSelector((state) => state.genres)
    const [errors, setErrors] = useState({});

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
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input);
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

    function handleDelte(e){
        setInput({
            ...input,
            genres: input.genres.filter( gen => gen !== e)
        })
      }; 

      function handleSubmit(e){
        e.preventDefault();
        let videogame = input;
        videogame.platforms = Object.values(selectPlatforms);
        dispatch(postVideogame(videogame))
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
        history.push('/home');
    }

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    return(
        <div className="containerCreate">
        <Link to= '/home'><button className="buttonBack">Back</button></Link>
        <div className="titleCreate">
            <h1>CREATE YOUR VIDEOGAME!</h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
        <div className="positionButton">
            <button type='submit' className="buttonCreategame">Create Videogame</button>
        </div>
        <div className="inputs">
            <div>
                <label>Url-Image:</label>
                <input
                type="text"
                value={input.background_image}
                name= "background_image"
                onChange={(e) => handleChange(e)}
                className="inputCreate"
                />
            </div>
            <div>
                <label>Name:</label>
                <input
                type="text"
                value={input.name}
                name= "name"
                onChange={(e) => handleChange(e)}
                className="inputCreate"
                />
                {errors.name && (
                <p className="error">{errors.name}</p>
                )}
            </div>
            <div>
                <label>Released:</label>
                <input
                type="string"
                value={input.released}
                name= "released"
                onChange={(e) => handleChange(e)}
                className="inputCreate"
                />
                {errors.released && (
                <p className="error">{errors.released}</p>
                )}
            </div>
            <div>
                <label>Rating:</label>
                <input
                type="number"
                value={input.rating}
                name= "rating"
                onChange={(e) => handleChange(e)}
                className="inputCreate"
                />
                {errors.rating && (
                <p className="error">{errors.rating}</p>
                )}
            </div>
            <div>
                <label>Description:</label>
                <input
                type="string"
                /* style="width:200px;height:15px" */
                value={input.description}
                name= "description"
                onChange={(e) => handleChange(e)}
                className="inputDescription"
                />
            </div>
        </div>
        
        <select className="filtersCreate" name="platformOne" onChange={(e) => handlePlatform(e)}>
            <option>Select a Platform*</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Other">Other</option>
        </select>

        <select className="filtersCreate" name="platformTwo" onChange={(e) => handlePlatform(e)}>
            <option>Select a Platform</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Other">Other</option>
        </select>

        <select className="filtersCreate" name="genreOne" onChange={(e) => handleGenre(e)}>
            <option>Select a Genre*</option>
            {genres.map((genre) => (
            <option value={genre.name}>{genre.name}</option>
            ))}
        </select>

        {input.genres.map(e => 
            <div>
                <p>{e}</p>
                <button className="buttonX" onClick={() => handleDelte(e)}>X</button>
            </div>
            )}
        
        </form>
        
    </div>
    )


}
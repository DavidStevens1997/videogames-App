import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { getVideogames } from '../actions';

export default function Home(){

 const dispatch = useDispatch()
 const allVideogames = useSelector((state) => state.videogames) //esto reemplaza map stateToProps
 
 useEffect(()=>{
    dispatch(getVideogames());
 },[])

 function handleClick(e){
    e.preventDefault();
    dispatch(getVideogames());
 }

 return(
    <div>
        <Link to= '/videogame'>Create Videogame</Link>
        <h1>THE VIDEOGAME DATABASE</h1>
        <button onClick={e=> {handleClick(e)}}>
            volver a cargar todos los juegos
        </button>
        <div>
            
        </div>
    </div>
 )

}
import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { getVideogames } from '../actions';
import GameCard from "../Card/Card";

export default function Home(){

 const dispatch = useDispatch()
 const allVideogames = useSelector((state) => state.videogames) //esto reemplaza map stateToProps
 
 useEffect(()=>{
    dispatch(getVideogames());
 },[dispatch])

 function handleClick(e){
    e.preventDefault();
    dispatch(getVideogames());
 }

 return(
    <div>
      <h1>HOME</h1>
        {/* <Link to= '/videogame'>Create Videogame</Link>
        <h1>THE VIDEOGAME DATABASE - David Hurtado</h1>
        <button onClick={e=> {handleClick(e)}}>
            volver a cargar todos los juegos
        </button>
        <div>
         <select>
            <option value="" selected>
               Sort by alphabet!
            </option>
            <option value="asc">⬆ Ascending</option>
            <option value="des">⬇ Descending</option>
         </select>

         <select>
            <option value="" selected>
               Sort by rating!
            </option>
            <option value="asc">⬆ Ascending</option>
            <option value="des">⬇ Descending</option>
         </select>

         <select>
            <option value="All" selected>
               All Videogames
            </option>
            <option value="Created">Created</option>
            <option value="Existing">Existing</option>
         </select>
         {allVideogames?.map(el =>{
            return (
               <Link to={"/home/" + el.id}>
                  <GameCard name={el.name} background_image={el.background_image} genre={el.genre} id={el.id}/>
               </Link>
            );
           })
         }
        </div> */}
    </div>
 )

}
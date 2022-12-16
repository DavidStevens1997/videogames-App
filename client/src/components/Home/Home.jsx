import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { getVideogames } from '../../actions';
import GameCard from "../Card/Card";
import Paginado from "../Paginado/Paginado";

export default function Home(){

 const dispatch = useDispatch()
 const allVideogames = useSelector((state) => state.videogames) //esto reemplaza map stateToProps
 const [currentPage,setCurrentPage] = useState(1)
 const [videogamesPerPage,setVideogamesPerPage] = useState(15)
 const indexOfLastVideogame = currentPage * videogamesPerPage
 const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
 const currentVideogames = allVideogames.slice(indexOfFirstVideogame,indexOfLastVideogame)
 const [btnActiveNext,setBtnActiveNext] = useState (false)
 const [btnActivePrev,setBtnActivePrev] = useState (false)

 const paginado = (pageNumber) => {
   setCurrentPage(pageNumber)
 }

 useEffect(()=>{
    dispatch(getVideogames());
 },[dispatch])

 function handleClick(e){
    e.preventDefault();
    dispatch(getVideogames());
 }

 const nextPage = () => {
   console.log(currentPage);
   if (currentPage > 4) {
      setBtnActiveNext(true);
   }else{
      setCurrentPage (currentPage + 1);
   }
 }
 const previousPage = () => {
   if (currentPage < 0) {
      setBtnActivePrev(true);
   }else{
      setCurrentPage (currentPage - 1);
   }
 }

 return(
    <div>
      {/* <h1>HOME</h1> */}
        <Link to= '/videogame'>Create Videogame</Link>
        <h1>THE VIDEOGAME DATABASE - David Hurtado</h1>
        <button onClick={e=> {handleClick(e)}}>
            Load all games
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

         <div>
            {currentVideogames?.map((videogame) =>{
               return (
                  <section>
                     <Link to={"/videogame/" + videogame.id}>
                        <GameCard 
                        name={videogame.name} 
                        image={videogame.background_image} 
                        genres={videogame.genres} 
                        id={videogame.id}/>
                     </Link>
                  </section>
               );
            })}
         </div>
         <button onClick={previousPage} disabled={btnActivePrev}>Previous</button>
            <Paginado
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginado={paginado}/>
            <button onClick={nextPage} disabled={btnActiveNext}>next</button>
        </div>
    </div>
 )

}
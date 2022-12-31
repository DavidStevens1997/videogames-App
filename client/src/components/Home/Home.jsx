import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { 
   getVideogames,
   filterCreated,
   orderName,
   orderRating, 
} from '../../actions';
import SearchBar from "../SearchBar/SearchBar";
import GameCard from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import '../Home/Home.css'

export default function Home(){

 const dispatch = useDispatch()
 const allVideogames = useSelector((state) => state.videogames) //esto reemplaza map stateToProps
 const [order, setOrder] = useState('')
 const [currentPage,setCurrentPage] = useState(1)
 const [videogamesPerPage,setVideogamesPerPage] = useState(15)
 const indexOfLastVideogame = currentPage * videogamesPerPage
 const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
 const currentVideogames = allVideogames.slice(indexOfFirstVideogame,indexOfLastVideogame)
 const [btnActiveNext,setBtnActiveNext] = useState (false)
 const [btnActivePrev,setBtnActivePrev] = useState (false)

 const paginado = (pageNumber) => {
   setCurrentPage(pageNumber)
 };

 useEffect(()=>{
    dispatch(getVideogames());
 },[dispatch])

 function handleClick(e){
    e.preventDefault();
    dispatch(getVideogames());
 };

 function handleFilterCreated(e){
   dispatch(filterCreated(e.target.value))
   setCurrentPage(1);
 };

 function nameHandleSort(e){
   e.preventDefault();
   dispatch(orderName(e.target.value))
   setCurrentPage(1);
   setOrder(`Oreder ${e.target.value}`)
 };

 function ratingHandleSort(e){
   e.preventDefault();
   dispatch(orderRating(e.target.value))
   setCurrentPage(1);
   setOrder(`Oreder ${e.target.value}`)
 };

 const nextPage = () => {
   console.log(currentPage);
   if (currentPage === 3) {
      setBtnActiveNext(true);
      setBtnActiveNext(false);
   }else{
      setCurrentPage (currentPage + 1);
   }
 };

 const previousPage = () => {
   if (currentPage === 1) {
      setBtnActivePrev(true);
      setBtnActivePrev(false);
   }else{
      setCurrentPage (currentPage - 1);
   }
 };



 
 return(
    <div>
      {/* <h1>HOME</h1> */}
        <Link to= '/videogame'><button>Create Videogame</button></Link>
        <h1>THE VIDEOGAME DATABASE - David Hurtado</h1>
        <SearchBar />
        <button onClick={e=> {handleClick(e)}}>
            Load all games
        </button>
        <div>
         <select onChange={e => nameHandleSort(e)}>
            <option value="" selected>
               Sort by alphabet!
            </option>
            <option value="asc">⬆ Ascending</option>
            <option value="desc">⬇ Descending</option>
         </select>

         <select onChange={e => ratingHandleSort(e)}>
            <option value="" selected>
               Sort by rating!
            </option>
            <option value="asc">⬆ Ascending</option>
            <option value="desc">⬇ Descending</option>
         </select>

         <select onChange={e => handleFilterCreated(e)}>
            <option value="All" selected>
               All Videogames
            </option>
            <option value="Created">Created</option>
            <option value="Existing">Existing</option>
         </select>

         <div className="videogamesContainer">
            {currentVideogames?.map((videogame) =>{
               return (
                  <section>
                     <Link to={'/home/' + videogame.id}>
                        <GameCard 
                        name={videogame.name} 
                        image={videogame.background_image} 
                        genres={videogame.genres}
                        rating={videogame.rating} 
                        id={videogame.id}/>
                     </Link>
                  </section>
               );
            })}
         </div>
         
            <Paginado
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginado={paginado}/>
            <button onClick={previousPage} disabled={btnActivePrev}>◄</button>
            <button onClick={nextPage} disabled={btnActiveNext}>►</button>
        </div>
    </div>
 )

}
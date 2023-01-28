import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { 
   getVideogames,
   getGenres,
   filterCreated,
   orderName,
   orderRating, 
   filterGenre,
} from '../../actions';
import SearchBar from "../SearchBar/SearchBar";
import GameCard from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import '../Home/Home.css';
import Loading from "../Loading/Loading.jsx";

export default function Home(){

 const dispatch = useDispatch()
 const allVideogames = useSelector((state) => state.videogames) //esto reemplaza map stateToProps
 const allGenres = useSelector((state) => state.genres)
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

 useEffect( ()=>{
   dispatch(getGenres())
},[dispatch])

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

 function genreFilterHandler(e){
   dispatch(filterGenre(e.target.value))
   setCurrentPage(1);
 }

 const nextPage = () => {
   console.log(currentPage);
   if (currentPage === 8) {
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
    <div className="general">
      <div className="nav">
         <div className="top">
            <div className="buttonCreatePosition">
            <Link to= '/videogame'><button className="buttonCreate">Create Videogame</button></Link>
            </div>
         <div className="searchbar">
            <SearchBar />
         </div>
         
         </div>
         <div className="title">
            <h1>THE VIDEOGAME DATABASE - DAVID HURTADO</h1>
         </div>
      </div>
         <div>
            <div>
               <button className="filters" onClick={e=> {handleClick(e)}}>
                  Load all games
               </button>
               <select className="filters" onChange={e => nameHandleSort(e)}>
                  <option value="" selected>
                     Sort by alphabet!
                  </option>
                  <option value="asc">⬆ Ascending</option>
                  <option value="desc">⬇ Descending</option>
               </select>

               <select className="filters" onChange={e => ratingHandleSort(e)}>
                  <option value="" selected>
                     Sort by rating!
                  </option>
                  <option value="asc">⬆ Ascending</option>
                  <option value="desc">⬇ Descending</option>
               </select>

               <select className="filters" onChange={e => handleFilterCreated(e)}>
                  <option value="All" selected>
                     All Videogames
                  </option>
                  <option value="Created">Created</option>
                  <option value="Existing">Existing</option>
               </select>
               
               <select className="filters" onChange={e => genreFilterHandler(e)}>
                  <option value="All" selected>
                     All Genres
                  </option>
                  {allGenres?.map((genre) => {
                     return <option key={genre.id} value={genre.name}>{genre.name}</option>;
                  })}
                  </select>
            </div>
         </div>
            {allVideogames.length > 0 ? (
               <div className="videogamesContainer">
               {currentVideogames?.map((videogame) =>{
                  return (
                     <section className="card">
                           <GameCard 
                           name={videogame.name} 
                           image={videogame.background_image} 
                           genres={videogame.genres}
                           rating={videogame.rating} 
                           id={videogame.id}/>
                     
                     </section>
                  );
               })}
            </div>
            ) : (
               <div>
                  <Loading />
               </div>
            )
            }
         
            <div>
               <Paginado
            videogamesPerPage={videogamesPerPage}
            allVideogames={allVideogames.length}
            paginado={paginado}
            currentPage={currentPage}/>
            <button className="arrow" onClick={previousPage} disabled={btnActivePrev}>◄</button>
            <button className="arrow" onClick={nextPage} disabled={btnActiveNext}>►</button>
            </div>
    </div>
 )

}
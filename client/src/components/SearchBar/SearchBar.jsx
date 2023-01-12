import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from '../../actions'
import '../SearchBar/SearchBar.css';

export default function SearchBar(){
   const dispatch = useDispatch()
   const [name, setName] = useState("")

   function handleInputChange(e){
      e.preventDefault();
      setName(e.target.value);
   }

   function handleSubmit(e){
      e.preventDefault();
      dispatch(getNameVideogames(name));
      document.getElementById('search').value = "";
   }

   return(
      <div>
         <input
         id="search"
         type= 'text'
         placeholder="Search Name...."
         onChange={(e) => handleInputChange(e)}
         className='input'/>
         <button type='submit' className='buttonSearch' onClick={(e) => handleSubmit(e)}>Search</button>
      </div>
   )
}
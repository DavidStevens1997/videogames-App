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
      setName("")
   }

   return(
      <div>
         <input
         type= 'text'
         placeholder="Search Name...."
         onChange={(e) => handleInputChange(e)}
         className='input'/>
         <button type='submit' className='buttonSearch' onClick={(e) => handleSubmit(e)}>Search</button>
      </div>
   )
}
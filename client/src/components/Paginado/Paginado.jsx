import React from 'react';
import "./Paginado.css";

export default function Paginado ({videogamesPerPage, allVideogames, paginado, currentPage}){
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='pagination'>
            { pageNumbers.map((num) =>{
                return <button onClick={() => paginado(num)}  className={num === currentPage ? 'active' : ''}>{num}</button>
            })}
        </div>
    )
}
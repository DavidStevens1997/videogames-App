import React from 'react';

export default function Paginado ({videogamesPerPage, allVideogames, paginado}){
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            { pageNumbers.map((num) =>{
                return <button onClick={() => paginado(num)}>{num}</button>
            })}
        </nav>
    )
}
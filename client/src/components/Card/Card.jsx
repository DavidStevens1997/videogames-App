import React from "react";
import '../Card/Card.css'

export default function GameCard({name, image, genres}){
    let genre = genres.join(', ');
    return (
        <div className="gameCard">
            <img src={image} alt="image not found"/>
            <div className="cardContainer">
                <h3>{name}</h3>
                <h5>{genre}</h5>
            </div>  
            
        </div>
    );
}

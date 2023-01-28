import React from "react";
import '../Card/Card.css';

export default function GameCard({id, name, image, genres, rating}){
    let genre = genres.join(', ');
    return (
        <div className="gameCard">
            <a href={'/home/' + id}>
            <img src={image} alt="image not found"/>
            </a>
            <div className="cardContainer">
                <h3>{name}</h3>
                <h5>{genre}</h5>
                <h5>☆&nbsp;&nbsp;{rating}</h5>
            </div>  
            
        </div>
    );
}

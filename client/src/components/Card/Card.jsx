import React from "react";

export default function GameCard({name, image, genres}){
    let genre = genres.join(', ');
    return (
        <div>
            <img src={image} alt="image not found" width="100%" height="250px" />
            <h3>{name}</h3>
            <h5>{genre}</h5>
        </div>
    );
}

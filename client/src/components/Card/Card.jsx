import React from "react";

export default function GameCard({name, background_image, genre}){
    return (
        <div>
            <img src={background_image} alt="image not found" width="200px" height="250px" />
            <h3>{name}</h3>
            <h5>{genre}</h5>
        </div>
    );
}

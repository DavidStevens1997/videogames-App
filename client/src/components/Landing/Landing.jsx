import React from "react";
import { Link } from 'react-router-dom';

 function LandingPage(){
    return(
    <div>
        <h1>Welcome to the best video game page!</h1>
        <Link to ='/home'>
            <button>Open videogame store</button>
        </Link>
    </div>
    );
}

export default LandingPage;
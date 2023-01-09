import React from "react";
import { Link } from 'react-router-dom';
import '../Landing/Landing.css'

 function LandingPage(){
    return(
    <div className="background">
        <div className="landing">
            <h1>WELCOME TO THE BEST VIDEOGAME PAGE!</h1>
            <Link to ='/home'>
                <button className="buttonOpen">OPEN VIDEOGAME DATABASE</button>
            </Link>
        </div>
    </div>
    );
}

export default LandingPage;
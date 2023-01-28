import React from "react";
import error404 from "../Gifs/Error404.gif";
import { Link } from "react-router-dom";
import "../NotFound/NotFound.css";

const NotFound = () => {
    return(
        <div className="backgroundError">
            <div className="pageError">
                <h1>404 NOT FOUND</h1>
                <Link to ='/'>
                    <button className="buttonOpen">GO BACK HOME</button>
                </Link>
            </div>
        </div>
        );
};

export default NotFound;

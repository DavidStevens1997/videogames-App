import React from "react";
import {useEffect} from 'react';
import {Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {videogameDetail} from '../../actions/index';


export default function Detail(props){
    const dispatch = useDispatch()
    
    /* const {id} = useParams(); */

    useEffect(() => {
        dispatch(videogameDetail(props.match.params.id));
        /* dispatch(videgameDetail(id)); */
      }, [dispatch]);

    const videogame = useSelector((state) => state.videogameDetail);

      return(
        <div>
          {
            videogame.name ? (
            <div>
              <img src={videogame.background_image} alt="imagen" width="500px" height="700px" />
              <h1>{videogame.name}</h1>
              <h5>{videogame.genres.map(e => e + ("  "))}</h5>
              <h5>{videogame.platforms.map(e => e + ("  "))}</h5>
              <h6>{videogame.rating}</h6>
              <h6>{videogame.released}</h6>
              <p>{videogame.description}</p>
            </div>
            ) : (
              <p>Loading...</p>
            )
          }
          <Link to = '/home'>
            <button>Back Home</button>
          </Link>
        </div>
      )
}
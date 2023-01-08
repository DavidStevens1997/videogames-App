import React from "react";
import {useEffect} from 'react';
import {Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {videogameDetail} from '../../actions/index';
import '../Detail/Detail.css'

export default function Detail(props){
    const dispatch = useDispatch()
    
    /* const {id} = useParams(); */

    useEffect(() => {
        dispatch(videogameDetail(props.match.params.id));
        /* dispatch(videgameDetail(id)); */
      }, [dispatch]);

    const videogame = useSelector((state) => state.videogameDetail);

      return(
        <div className="containerDetail">
          <Link to = '/home'>
            <button className="buttonBack">Back Home</button>
          </Link>
          {
            videogame.name ? (
            <div className="container">
              <div>
                <img src={videogame.background_image} alt="imagen" className="imgGame"/>
              </div>
              <div className="detail">
                <h1>Name: {videogame.name}</h1>
                <h5>Genres: {videogame.genres.map(e => e + ("  "))}</h5>
                <h5>Platforms: {videogame.platforms.map(e => e + ("  "))}</h5>
                <h6>Rating: {videogame.rating}</h6>
                <h6>Released: {videogame.released}</h6>
                <p>Description: {videogame.description}</p>
              </div>
            </div>
            ) : (
              <p>Loading...</p>
            )
          }
        </div>
      )
}
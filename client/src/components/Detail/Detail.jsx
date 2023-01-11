import React from "react";
import {useEffect} from 'react';
import {Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {videogameDetail} from '../../actions/index';
import '../Detail/Detail.css';
import Loading from "../Loading/Loading.jsx";

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
          <div>
            <Link to = '/home'>
              <button className="buttonBack">Back Home</button>
            </Link>
          </div>
          {
            videogame.name ? (
            <div className="container">
              <div>
                <img src={videogame.background_image} alt="imagen" className="imgGame"/>
              </div>
              <div className="detail">
                <h1>Name: {videogame.name}</h1>
                <h3>Genres: {videogame.genres.map(e => e + ("  "))}</h3>
                <h3>Platforms: {videogame.platforms.map(e => e + ("  "))}</h3>
                <h4>Rating: {videogame.rating}</h4>
                <h4>Released: {videogame.released}</h4>
                <p>Description: {videogame.description}</p>
              </div>
            </div>
            ) : (
              <div>
                  <Loading />
               </div>
            )
          }
        </div>
      )
}
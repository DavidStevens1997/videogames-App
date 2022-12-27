import React from "react";
import {useState, useEffect} from 'react';
import {Link, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {videgameDetail} from '../../actions/index';


export default function Detail(props){
    const dispatch = useDispatch()
    const videogame = useSelector((state) => state.videogameDetail);

    useEffect(() => {
        dispatch(fetchById(props.match.params.id));
      }, [dispatch]);

      return(
        <div>
    
        </div>
      )
}
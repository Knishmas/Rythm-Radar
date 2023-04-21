import React from 'react'
import './Styles/Card.css';

function Card(props) {
  return (
    <>
        <div className="card-container">
            <img src={props.image} alt={props.name} className="artist-pic" />
            <h1 className="artist-name">{props.name}</h1>
            <p>{props.genres}</p>
        </div>
    </>
  )
}

export default Card
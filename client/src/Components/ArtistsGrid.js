import React from 'react'
import Card from './Card';
import './Styles/ArtistGrid.css';
const ArtistsGrid = ({artists}) => (

  <>
     {artists && artists.length ? (
      <div className="grid">
        {artists.map((artist) => (
          <>
            <Card name={artist.name} image={artist.images[0].url}/>
           </>
      
     ))}
     </div>
    ) : (
      <p>no artists available!</p>
    )}
  </>

);

export default ArtistsGrid
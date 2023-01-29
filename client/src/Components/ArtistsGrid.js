import React from 'react'
import Card from './Card';
const ArtistsGrid = ({artists}) => (

  <>
     {artists && artists.length ? (
      <div>
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
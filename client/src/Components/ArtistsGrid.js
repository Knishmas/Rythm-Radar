import React from 'react'

const ArtistsGrid = ({artists}) => (

  <>
     {artists && artists.length ? (
      <div>
        {artists.map((artist) => (
          <>
            <h3>{artist.name}</h3>
            <img src={artist.images[0].url} alt={artist.name} />
           </>
      
     ))}
     </div>
    ) : (
      <p>no artists available!</p>
    )}
  </>

);

export default ArtistsGrid
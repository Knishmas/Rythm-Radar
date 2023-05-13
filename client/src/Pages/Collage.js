import React from 'react';
import { getUserTopArtists } from '../spotify';
import { useState, useEffect } from 'react';
import { catchErrors } from '../util';

const Collage = () =>{ 
  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    const fetchData = async () =>{
      const userTopArtists  = await getUserTopArtists();
      setTopArtists(userTopArtists.data);
    };
    catchErrors(fetchData());
  }, [])

  const images = topArtists?.items?.slice(0, 15).map((artist) => {
    return artist.images[0].url;
  });

  const imageStyles = images?.map(() => {
    const size = Math.floor(Math.random() * 300 + 100); // b/w 100 and 400

  
    return {
      width: `${size}px`,
      height: `${size}px`,
    };
  });

  return (
    <div>
      <h1>collage is working</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images && images.map((image, index) => (
          <img key={index} src={image} style={imageStyles[index]} alt={`Image ${index}`} />
        ))}
      </div>
    </div>
  );
}

export default Collage;

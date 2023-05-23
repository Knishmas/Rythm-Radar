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

  const containerStyle = {
    width: '600px',
    height: '600px',
    display: 'flex',
    flexWrap: 'wrap'
  };

  const imageStyle = (index) => {
    const size = `${100 - index * 5}%`;
    return {
      width: size,
      height: size,
      boxSizing: 'border-box',
      border: '2px solid white',
      overflow: 'hidden'
    };
  };

  return (
    <div>
      <h1>collage is working</h1>
      <div style={containerStyle}>
        {images && images.map((image, index) => (
          <div key={index} style={{ ...imageStyle(index), backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collage;

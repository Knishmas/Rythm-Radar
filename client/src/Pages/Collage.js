import React from 'react';

// array of image URLs
const images = [
  'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
  'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
  // ... add 13 more images here
];

const imageStyles = images.map(() => {
  const width = Math.floor(Math.random() * 300 + 100); // random width between 100 and 400 pixels
  const height = Math.floor(Math.random() * 300 + 100); // random height between 100 and 400 pixels

  return {
    width: `${width}px`,
    height: `${height}px`,
  };
});

function Collage() {
  return (
    <div>
      <h1>collage is working</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {images.map((image, index) => (
        <img key={index} src={image} style={imageStyles[index]} alt={`Image ${index}`} />
      ))}
    </div>
    </div>
  );
}

export default Collage;



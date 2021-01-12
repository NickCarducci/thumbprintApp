
/*import React from 'react';
import './imagelist.css';

const ImageList = (props) => {
    const imgs = props.foundImages.map(img => {
        return <img key={img.id} src={img.urls.regular} alt={img.alt_description} />
    });

    return (
        <div className="image__list">{imgs}</div>
    )
}

export default ImageList;
*/

import "./imagelist.css";
import React from "react";
import ImageCard from "./ImageCard";

const ImageList = props => {
  const images = props.images.map(image => {
    return <ImageCard key={image.id} image={image} />;
  });

  return <div className="image-list">{images}</div>;
};

export default ImageList;
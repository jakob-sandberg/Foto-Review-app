import React, { useState } from "react";

import { IoHeartOutline } from "react-icons/io5";
import { IoHeartDislikeOutline } from "react-icons/io5";
import "../css/CustomerLink.css";

const ImageCardCustomer = ({ image, handleLikedImage, handleUnlikedImage }) => {
  const [isHeartFilled, setIsHeartFilled] = useState();
  const [isHeartEmpty, setIsHeartEmpty] = useState();

  const handleLikePhoto = (image) => {
    setIsHeartFilled(true);
    handleLikedImage(image);
    setIsHeartEmpty(false);
  };

  const handleDislikePhoto = (image) => {
    setIsHeartEmpty(true);
    handleUnlikedImage(image);
    setIsHeartFilled(false);
  };
  return (
    <div className="cards">
      <img src={image.url} alt={image.name} />
      <div className="hearts">
        <IoHeartOutline
          color={isHeartFilled ? "#f54242" : ""}
          size={35}
          onClick={() => handleLikePhoto(image)}
        />
        <IoHeartDislikeOutline
          color={isHeartEmpty ? "#f54242" : ""}
          size={35}
          onClick={() => handleDislikePhoto(image)}
        />
      </div>
    </div>
  );
};

export default ImageCardCustomer;

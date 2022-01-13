import React from "react";
import "../css/ImageCard.css";

const ImageCard = ({ image, handleSelectImage }) => {
  return (
    <div className="cards">
      <img src={image.url} alt={image.name} />
      <form>
        <label>
          <input type="checkbox" onClick={() => handleSelectImage(image)} />
        </label>
      </form>
    </div>
  );
};

export default ImageCard;

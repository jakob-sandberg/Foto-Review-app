import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import useImages from "../hooks/useImages";
import ImageCardCustomer from "../components/ImageCardCustomer";

import { SRLWrapper } from "simple-react-lightbox";
import { v4 as uuidv4 } from "uuid";
import "../css/AlbumPage.css";
import "../css/CustomerLink.css";

const AlbumPageCustomer = () => {
  const photosQuery = useImages();
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  const handleLikedImage = (image) => {
    let index = selectedImages.findIndex(
      (select) => select.name === image.name
    );
    //removing the image if it all ready exist in array,
    if (index > -1) {
      selectedImages.splice(index, 1);
    }
    setSelectedImages([
      ...selectedImages,
      {
        name: image.name,
        size: image.size,
        type: image.type,
        owner: image.owner,
        isSelected: true,
      },
    ]);
  };

  const handleUnlikedImage = (image) => {
    let index = selectedImages.findIndex(
      (selection) => selection.name === image.name
    );
    //removing the image if it all ready exist in array,
    if (index > -1) {
      selectedImages.splice(index, 1);
    }
    setSelectedImages([
      ...selectedImages,
      {
        name: image.name,
        size: image.size,
        type: image.type,
        owner: image.owner,
        isSelected: false,
      },
    ]);
  };

  const numberLiked = selectedImages.filter(
    (liked) => liked.isSelected === true
  ).length;

  const handleNewAlbum = async () => {
    const owner = selectedImages && selectedImages[0].owner;
    // generate uuid for an album
    const albumId = uuidv4();
    //create new album name with date and time
    const albumName = `Album ${new Date().toLocaleString()}`;
    const albumRef = collection(db, "albums");
    await addDoc(albumRef, {
      created: serverTimestamp(),
      owner,
      albumName,
      albumId,
    });

    const likedImage = selectedImages.filter(
      (likedImage) => likedImage.isSelected === true
    );

    likedImage.forEach(async (image) => {
      const imageId = uuidv4();
      const storageFullPath = `images/${image.name}`;
      //reach out to specific storage
      const storageRef = ref(storage, storageFullPath);
      //get download url
      const url = await getDownloadURL(storageRef);
      //create ref to db 'images'
      const collectionRef = collection(db, "images");
      await addDoc(collectionRef, {
        created: serverTimestamp(),
        name: image.name,
        owner,
        path: storageRef.fullPath,
        size: image.size,
        type: image.type,
        imageId,
        albumId,
        url,
      });
    });
    navigate("/customerdone");
  };

  return (
    <div className="album-page-container">
      <h1>Your album</h1>

      {photosQuery.data && (
        <SRLWrapper>
          <div className="cardsContainer">
            {photosQuery.data.map((image, index) => (
              <ImageCardCustomer
                key={index}
                image={image}
                handleLikedImage={handleLikedImage}
                handleUnlikedImage={handleUnlikedImage}
              />
            ))}
          </div>
        </SRLWrapper>
      )}

      {/* show button only when there are uploaded images */}
      {photosQuery.data && photosQuery.data.length !== selectedImages.length ? (
        <button className="customer-button" onClick={handleNewAlbum} disabled>
          Please choose the pictures you like! <br />
          You must make a decision on every photo
        </button>
      ) : (
        <button className="customer-button-2" onClick={handleNewAlbum}>
          <span>
            You have liked {numberLiked} of{" "}
            {photosQuery.data && photosQuery.data.length} photos <br /> Send
          </span>
        </button>
      )}
    </div>
  );
};

export default AlbumPageCustomer;

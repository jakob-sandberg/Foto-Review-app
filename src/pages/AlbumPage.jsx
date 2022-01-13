import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import Dropzone from "../components/Dropzone";
import ImageCard from "../components/ImageCard";

import useImages from "../hooks/useImages";
import { SRLWrapper } from "simple-react-lightbox";
import { v4 as uuidv4 } from "uuid";
import "../css/AlbumPage.css";

const AlbumPage = () => {
  const photosQuery = useImages();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [selectedImages, setSelectedImages] = useState([]);

  //unique link to customer
  const linkToCustomer = window.location.href.replace("album", "review");

  const handleSelectImage = (image) => {
    let index = selectedImages.findIndex(
      (select) => select.name === image.name
    );

    //removing the image if it all ready exist in array,
    if (index > -1) {
      selectedImages.splice(index, 1);
      return;
    }

    //Adding image to array if it dont exists
    setSelectedImages([
      ...selectedImages,
      { name: image.name, size: image.size, type: image.type },
    ]);
    return;
  };

  const handleNewAlbum = async () => {
    const albumId = uuidv4();

    //AlbumName = date + time
    const albumName = `Album ${new Date().toLocaleString()}`;

    const albumRef = collection(db, "albums");

    await addDoc(albumRef, {
      created: serverTimestamp(),
      owner: currentUser.uid,
      albumName,
      albumId,
    });

    selectedImages.forEach(async (image) => {
      const imageId = uuidv4();
      const storageFullPath = `images/${image.name}`;

      //reach out to specific storage
      const storageRef = ref(storage, storageFullPath);

      //download url
      const url = await getDownloadURL(storageRef);

      // reference to the db "Images"
      const collectionRef = collection(db, "images");

      await addDoc(collectionRef, {
        created: serverTimestamp(),
        name: image.name,
        owner: currentUser.uid,
        path: storageRef.fullPath,
        size: image.size,
        type: image.type,
        imageId,
        albumId,
        url,
      });
    });
    navigate("/");
  };

  return (
    <div className="album-page-container">
      <h1>Your Photos</h1>
      <Dropzone />
      {photosQuery.data && (
        <SRLWrapper>
          <div className="cardsContainer">
            {photosQuery.data.map((image, index) => (
              <ImageCard
                key={index}
                image={image}
                handleSelectImage={handleSelectImage}
              />
            ))}
          </div>
        </SRLWrapper>
      )}
      <span className="url-style">
        Link to cusomer: <br />
        {linkToCustomer}
      </span>
      {photosQuery.data && !photosQuery.data.length ? (
        ""
      ) : selectedImages.length ? (
        <button onClick={handleNewAlbum}>
          Make a new album with selected photos
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default AlbumPage;

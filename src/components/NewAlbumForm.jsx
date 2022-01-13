import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

import "../index.css";

const NewAlbumForm = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [viewForm, setViewForm] = useState();
  const albumNameRef = useRef();

  const newAlbum = () => {
    setViewForm(!viewForm);
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (!albumNameRef.current.value) {
      return;
    }

    const albumId = uuidv4();

    //trying to get to the albums collection in the database
    const albumRef = collection(db, "albums");

    await addDoc(albumRef, {
      created: serverTimestamp(),
      owner: currentUser.uid,
      albumName: albumNameRef.current.value,
      albumId,
    });
    setViewForm(false);
    navigate(`/album/${albumId}`);
  };

  return (
    <div className="new-album-container">
      <button className="create-button" onClick={newAlbum}>
        {viewForm ? "Hide" : "Create Album"}
      </button>

      {viewForm ? (
        <form className="album-form" onSubmit={handleNameSubmit}>
          <input
            type="text"
            placeholder="Album Name"
            ref={albumNameRef}
            required
          />
          <button className="save-button">Save</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};
export default NewAlbumForm;

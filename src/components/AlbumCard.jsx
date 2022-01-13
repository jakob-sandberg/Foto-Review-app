import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../css/AlbumCard.css";
import { Card } from "react-bootstrap";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const AlbumCard = ({ album }) => {
  const nameChangeRef = useRef();
  const [viewForm, setViewForm] = useState();

  const handleEditName = () => {
    setViewForm(!viewForm);
  };

  const handleNameChange = async (e) => {
    e.preventDefault();

    if (!nameChangeRef.current.value) {
      return;
    }

    const albumNameRef = doc(db, "albums", album._id);

    await updateDoc(albumNameRef, {
      albumName: nameChangeRef.current.value,
    });

    setViewForm(false);
  };
  return (
    <div className="cardcontainer">
      <div className="album-Card">
        <Card className="m-5" style={{ width: "18rem" }}>
          <Link to={`/album/${album.albumId}`}>
            <Card.Img variant="top" src="assets/camera.png" />
          </Link>
          <Card.Body>
            <div className="album-name">
              <span>{album.albumName}</span>
            </div>
            <div className="change-name-container">
              <button onClick={handleEditName} className="change-name">
                Change name
              </button>
              {viewForm ? (
                <form
                  className="new-name-form"
                  onSubmit={(e) => handleNameChange(e)}
                >
                  <input
                    type="text"
                    placeholder="Name"
                    ref={nameChangeRef}
                    required
                  />
                  <button>Save</button>
                </form>
              ) : (
                ""
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AlbumCard;

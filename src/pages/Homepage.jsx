import React from "react";
import NewAlbumForm from "../components/NewAlbumForm";
import AlbumsList from "../components/AlbumsList";
import useAlbums from "../hooks/useAlbums";
import "../css/HomePage.css";

const Homepage = () => {
  const albumsQuery = useAlbums({ fetchOnlyCurrentUser: true });
  return (
    <div className="home-container">
      <span className="home-heading">Welcome back!</span>
      <span className="home-heading">Lets upload some masterpieces!</span>
      <NewAlbumForm />
      <AlbumsList albums={albumsQuery} />
    </div>
  );
};

export default Homepage;

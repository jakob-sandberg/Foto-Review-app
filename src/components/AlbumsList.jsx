import React from "react";
import AlbumCard from "./AlbumCard";

const AlbumsList = ({ albums }) => {
  return (
    <div>
      {albums.data &&
        albums.data.map((album) => (
          <AlbumCard album={album} key={album.albumId} />
        ))}
    </div>
  );
};

export default AlbumsList;

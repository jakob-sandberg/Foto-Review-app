import { useParams } from "react-router-dom";
import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";

import { useFirestoreQueryData } from "@react-query-firebase/firestore";

const useImages = () => {
  const { id } = useParams();
  //images collection in the db
  const colPhotosRef = collection(db, "images");

  const queryKey = ["images"];

  //looking for the right albumId
  const queryAlbumRef = query(
    colPhotosRef,
    where("albumId", "==", id),
    orderBy("created", "desc")
  );

  const photosQuery = useFirestoreQueryData(
    queryKey,
    queryAlbumRef,
    {
      idField: "_id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );

  return photosQuery;
};

export default useImages;

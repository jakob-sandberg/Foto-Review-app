import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7UoZSG9kH8OGVlW5J8Nf3Dib860KrVwg",
  authDomain: "foto-review-app.firebaseapp.com",
  projectId: "foto-review-app",
  storageBucket: "foto-review-app.appspot.com",
  messagingSenderId: "860377299254",
  appId: "1:860377299254:web:b5c1615c40b41835ea1b97",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get firebase auth instance
const auth = getAuth();

//get firebase firestore instance
const db = getFirestore(app);

//get storage
const storage = getStorage(app);

export { app as default, auth, db, storage };

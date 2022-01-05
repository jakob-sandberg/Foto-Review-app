import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get firebase auth instance
const auth = getAuth();

//get firebase firestore instance
const db = getFirestore(app);

//get storage
const storage = getStorage(app);

export { app as default, auth, db, storage };

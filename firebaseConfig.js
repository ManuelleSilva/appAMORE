
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMhQh5wphwCI9a0lvGxLLrYfGtElOIIYs",
  authDomain: "appamore.firebaseapp.com",
  projectId: "appamore",
  storageBucket: "appamore.firebasestorage.app",
  messagingSenderId: "237292512170",
  appId: "1:237292512170:web:dfd654c8535e66b41dc1d3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
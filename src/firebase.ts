import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBHpffYEUe1Xx6pV6r9oGRRhT4OYKsgF5Y",
    authDomain: "studio-8965658957-bbb9b.firebaseapp.com",
    projectId: "studio-8965658957-bbb9b",
    storageBucket: "studio-8965658957-bbb9b.firebasestorage.app",
    messagingSenderId: "852674847436",
    appId: "1:852674847436:web:cec3212f1b13a871729869"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOJVhtFZjUw5EE-Q0H6o9DVwg7-129M6w",
  authDomain: "streamgen-e4c2e.firebaseapp.com",
  projectId: "streamgen-e4c2e",
  storageBucket: "streamgen-e4c2e.firebasestorage.app",
  messagingSenderId: "187488800839",
  appId: "1:187488800839:web:95816ddd2bef821f436162",
  measurementId: "G-LVTD334YMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;

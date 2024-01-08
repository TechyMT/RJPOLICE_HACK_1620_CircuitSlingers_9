// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2bNrrfI0U9DvtRaXw9Lpxqys8_319BqU",
    authDomain: "rjpolicehackathon.firebaseapp.com",
    projectId: "rjpolicehackathon",
    storageBucket: "rjpolicehackathon.appspot.com",
    messagingSenderId: "943669126284",
    appId: "1:943669126284:web:c584ca6af2e655557e87a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { app, auth };
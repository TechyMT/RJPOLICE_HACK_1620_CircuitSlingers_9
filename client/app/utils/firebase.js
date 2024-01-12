// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getToken } from "firebase/messaging";

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

const storage = getStorage(app);
const uploadFiles = async (files, user) =>
{
    try
    {
        const urlList = [];
        console.log("uploading files", files);
        console.log(user);
        // Iterate over the array of files and upload each one
        for (const file of files)
        {
            const storageRef = ref(storage, `1234/${file.name}`);
            const uploadTask = await uploadBytesResumable(storageRef, file);
            const url = await getDownloadURL(uploadTask.ref);
            urlList.push(url);
            console.log("uploading state", uploadTask.state);


        }
        console.log("urlList", urlList);
        return urlList;
    }
    catch (error)
    {
        console.log(error);
        throw error;
    }
};




export { app, auth, uploadFiles };
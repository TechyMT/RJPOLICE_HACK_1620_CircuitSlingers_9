// "use client"
// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const VideoList = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     // Replace with your Firebase config
//     const firebaseConfig = {
//       apiKey: 'YOUR_API_KEY',
//       authDomain: 'YOUR_AUTH_DOMAIN',
//       projectId: 'YOUR_PROJECT_ID',
//       storageBucket: 'YOUR_STORAGE_BUCKET',
//       messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//       appId: 'YOUR_APP_ID',
//     };

//     if (!firebase.apps.length) {
//       firebase.initializeApp(firebaseConfig);
//     }

//     const db = firebase.firestore();

//     // Replace 'videos' with the name of your collection in Firebase
//     const videosCollection = db.collection('videos');

//     // Fetch videos from Firebase
//     const fetchVideos = async () => {
//       try {
//         const snapshot = await videosCollection.get();
//         const videoData = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setVideos(videoData);
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };

//     fetchVideos();
//   }, []);

//   return (
//     <div className="container mx-auto mt-8">
//       {videos.map((video) => (
//         <div key={video.id} className="mb-8">
//           <iframe
//             title={video.title}
//             width="560"
//             height="315"
//             src={video.link} // Assuming 'link' is the field in your Firebase document containing the video link
//             frameBorder="0"
//             allowFullScreen
//             className="mb-4"
//           ></iframe>
//           <p className="text-lg font-bold">{video.title}</p>
//           <p className="text-gray-600">{video.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VideoList;

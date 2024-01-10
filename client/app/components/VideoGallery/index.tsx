// VideoGallery.js
import React from 'react';
import YouTube from 'react-youtube';

const videos = [
  'youtube_video_url_1',
  'youtube_video_url_2',
  'youtube_video_url_3',
  // Add more YouTube video URLs as needed
];

const VideoGallery = () => {
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((videoUrl, index) => (
          <div key={index} className="relative">
            <YouTube videoId={getVideoId(videoUrl)} opts={opts} />
          </div>
        ))}
      </div>
    </div>
  );
};

const getVideoId = (url) => {
  // Extract video ID from YouTube URL
  const regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : '';
};

export default VideoGallery;

import React from "react";
import Heading from "../components/Heading";
import { videos } from "../data/constants";
const VideoDescriptionUI = () => {
  return (
    <>
      <Heading>Awareness and Training</Heading>

      <div className="flex flex-wrap p-8">
        {videos.map((video, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            {/* Video Section */}
            {/* <video
              className="w-full h-auto"
              controls
              src={video.url}
              type="video/mp4"
            /> */}
            <video className="w-full h-auto" controls>
              <source src={video.url} type="video/mp4" />
            </video>

            {/* Description Section */}
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">{video.heading}</h2>
              <p className="text-gray-700">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoDescriptionUI;

"use client"
import React, { useState } from 'react';
import axios from 'axios'; 

const TrackStatus = () => {
  const [trackId, setTrackId] = useState('');
  const [status, setStatus] = useState<any>(null);

  const handleSearch = async () => {
    try {
      // Replace the API_URL with the actual URL for fetching the status
      const response = await axios.get(`API_URL/track/${trackId}`);
      setStatus(response.data.status);
    } catch (error) {
      console.error('Error fetching track status:', error);
      setStatus('Error fetching status');
    }
  };

  return (
      <div className="container mx-auto mt-8  mb-48">
          <h1 className='text-3xl font-bold mb-4 text-black justify-center'>Track your complaint</h1>
      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Enter Track ID"
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-900 text-white px-4 py-2 rounded-r-md hover:bg-blue-500 focus:outline-none"
        >
          Search
        </button>
      </div>
      {status !== null && (
        <div className="mt-4">
          <p>Status: {status}</p>
        </div>
      )}
    </div>
  );
};

export default TrackStatus;

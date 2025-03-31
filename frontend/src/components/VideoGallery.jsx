import React from "react";

const VideoGallery = () => {
  // Array of YouTube video links
  const videos = [
    "https://www.youtube.com/embed/9x98hqgPxWs",
    "https://www.youtube.com/embed/NuRrTqLjrLQ",
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Video Gallery</h2>
      <div className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-120"
              src={video}
              title={`YouTube video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;

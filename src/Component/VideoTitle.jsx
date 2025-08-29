import React from 'react';

const VideoTitle = ({ title, overview, videoId }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-12 text-white absolute bg-gradient-to-r from-black">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-4 text-lg w-1/2">{overview}</p>

      <div className="flex gap-4 mt-4">
        {/* Play Button */}
        <a
          href={"https://youtu.be/dQw4w9WgXcQ?si=kL4KixEjv5RKOnFj"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-6 py-2 bg-red-700 text-white font-semibold rounded-md cursor-pointer
            hover:bg-red-700 hover:scale-105 transition-transform duration-200">
            ▶️ Play
          </button>
        </a>

        {/* More Info Button */}
        <a
          href="https://www.linkedin.com/feed/"  // link to your custom page
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-md cursor-pointer
            hover:bg-gray-900 hover:scale-105 transition-transform duration-200">
            More Info
          </button>
        </a>
      </div>
    </div>
  );
};

export default VideoTitle;

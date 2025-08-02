import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 text-center py-6 mt-10">
      <p className="text-sm">
        Questions? Call <span className="underline cursor-pointer">000-800-919-1694</span>
      </p>
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <p className="cursor-pointer hover:underline">FAQ</p>
        <p className="cursor-pointer hover:underline">Help Center</p>
        <p className="cursor-pointer hover:underline">Terms of Use</p>
        <p className="cursor-pointer hover:underline">Privacy</p>
      </div>
      <p className="text-xs mt-6">NetflixGpt © 2025</p>
    </footer>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center mt-auto p-4 bg-gray-800 text-white w-full">
      &copy; {new Date().getFullYear()} dollar to inr. All rights reserved.
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
      >
        Privacy & Policy
      </a>
    </footer>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center p-4 bg-gray-800 text-white w-full mt-auto fixed bottom-0">
      &copy; {new Date().getFullYear()} Dollar to INR. All rights reserved.
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

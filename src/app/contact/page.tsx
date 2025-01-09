import React from "react";

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Contact Us
        </h1>
        <p className="text-center text-lg text-gray-600 mb-6">
          Have any questions? Reach out to us via email!
        </p>

        <div className="text-center">
          <p className="text-lg text-gray-800 mb-2">Email us at:</p>
          <a
            href="mailto:contact@contact@dollartoinr.in"
            className="text-xl text-blue-600 hover:text-blue-800"
          >
            contact@dollartoinr.in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;

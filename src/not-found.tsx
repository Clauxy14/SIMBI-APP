import React from "react";
import notfoundIcon from "../public/assets/not-found.png";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-[#E1F2FD] p-10 rounded-lg">
          

      <img
        src={notfoundIcon}
        alt="Not Found"
        className="w-[200px] h-[200px] mb-6"/>
      <h1 className="text-3xl text-[#1C1D32] font-bold">Not Found</h1>
      <p className="text-xl text-[#1C1D32] mt-4">
        Could not find the requested resource.
      </p>
      <a
        href="/"
        className="mt-6 inline-block px-6 py-3 bg-[#E1F2FD] text-[#1C1D32] underline font-semibold text-lg rounded-lg hover:bg-[#2196F3] transition duration-300"
      >
        Return Home
      </a>
    </div>
  );
};

export default NotFound; 
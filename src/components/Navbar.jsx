import { useState } from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <div>
      <div className="px-[60px] pt-3 flex items-center justify-between max-sm:px-[10px]">
        <Link to="/" onClick={() => setSelectedBtn("button1")}>
          <h1 className="text-2xl font-bold">
            Movies<span className="text-2xl font-bold text-blue-500">DB</span>
          </h1>
        </Link>
        <div className="flex items-center justify-center">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
            alt="profile"
            className="h-7 w-7"
          />
          <p>Guest Mode</p>
        </div>
      </div>
    </div>
  );
};

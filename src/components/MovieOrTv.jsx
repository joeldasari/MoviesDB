import { useState } from "react";
import { Movies } from "../pages/Movies";
import { TvShows } from "../pages/TvShows";
export const MovieOrTv = () => {
  const [selectedBtn, setSelectedBtn] = useState("button1");
  return (
    <div>
      <div className="w-full flex justify-center p-3">
        <button
          onClick={() => setSelectedBtn("button1")}
          className={`p-2 rounded-sm text-sm ${
            selectedBtn === "button1" ? "bg-blue-500 text-white" : "bg-gray-50"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setSelectedBtn("button2")}
          className={`p-2 rounded-sm text-sm ${
            selectedBtn === "button2" ? "bg-blue-500 text-white" : "bg-gray-50"
          }`}
        >
          TV Shows
        </button>
      </div>
      {selectedBtn === "button1" ? <Movies /> : <TvShows />}
    </div>
  );
};

import React from "react";
import FlipWords from "./flip-words";

export function FlipWordsDemo() {
  const words = [
    "Explore", "Adventure", "Luxury", "Comfort",
    "Experience", "Journey", "Escape", "Wanderlust",
    "Relax", "Thrill", "Destination", "Stay",
    "Vacation", "Resort","Tour", "Explore"
  ];

  return (
    <div className="h-[40rem] flex justify-center items-center ">
      <div className="text-3xl mx-auto font-mono font-semibold text-black dark:black">
      BACKPACKERZ is a platform for {' '}
        <FlipWords words={ words} /> <br />
        We offering thrilling experiential stays in breathtaking properties and curated destination tours.
      </div>
    </div>
  );
}

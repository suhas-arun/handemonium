import React from "react";
import Button from "../components/Button";

function HomePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-7xl font-bold mb-10">Handemonium</h1>
      <div className="flex gap-4">
        <Button label="PLAY" />
        <Button label="SETTINGS" className="bg-gray-700 hover:bg-gray-800" />
      </div>
    </div>
  );
}

export default HomePage;

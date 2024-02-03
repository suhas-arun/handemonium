import React from "react";
import Button from "../components/Button";

function HomePage() {
  const logoPath = "/handemonium-logo.png";
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-white">
      <img src={logoPath} alt="Handemonium Logo" className="max-w-96" />
      <div className="flex gap-4 mt-8">
        <Button label="PLAY" />
        <Button label="SETTINGS" />
      </div>
    </div>
  );
}

export default HomePage;

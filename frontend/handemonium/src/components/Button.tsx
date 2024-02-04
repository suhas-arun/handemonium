"use client";
import React from "react";
// import { ensurePermission } from "@/utils/GetCameraPermission";
import { captureAndSendImage } from "@/utils/ImageCapture";

interface ButtonProps {
  label: string;
  className?: string;
  redirectUrl?: string;
}

const Button: React.FC<ButtonProps> = ({ label, className = "", redirectUrl = "" }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={() => {
        if (redirectUrl == "test") {
          console.log("test");
          // ensurePermission();
          captureAndSendImage("http://localhost:8000");
        } else {
          window.location.href = redirectUrl;
        }
      }}
    >
      {label}
    </button>
  );
};

export default Button;

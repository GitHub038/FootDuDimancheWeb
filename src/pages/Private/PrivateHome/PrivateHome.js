import React from "react";
import cat from "./cat.gif";
export default function PrivateHome() {
  return (
    <div className="container p-5">
      <h1 className="display-3 mb-4">Home Sweet Private Home</h1>
      <img src={cat} alt="" />
    </div>
  );
}

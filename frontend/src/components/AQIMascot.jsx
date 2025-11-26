import React from "react";
import "./AQIMascot.css";

export default function AQIMascot({ aqi }) {
  if (!aqi) return null;

  let img = "";
  let mood = "";

  if (aqi <= 50) {
    img = "/characters/healthy.jpg";     // you will place image here
    mood = "You're breathing clean air!";
  } else if (aqi <= 150) {
    img = "/characters/masked.webp";        // mild pollution
    mood = "Air quality is moderate. Mask recommended.";
  } else if (aqi <= 250) {
    img = "/characters/coughing.jpg";    // unhealthy
    mood = "Air quality is unhealthy!";
  } else {
    img = "/characters/coughing.jpg";      // extreme
    mood = "Dangerous air! Stay indoors.";
  }

  return (
    <div className="mascot-container">
      <img src={img} className="mascot-img" alt="AQI mascot" />
      <p className="mascot-text">{mood}</p>
    </div>
  );
}

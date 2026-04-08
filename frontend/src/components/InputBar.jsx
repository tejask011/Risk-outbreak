import { useState } from "react";

export default function InputBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [disease, setDisease] = useState("");

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <input
        placeholder="Disease"
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
      />

      <button
        onClick={() => {
          console.log("BUTTON CLICKED", city, disease); // 🔥 debug
          onSearch(city, disease);
        }}
      >
        Get Trend
      </button>
    </div>
  );
}
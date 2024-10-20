"use client"; // Required for client-side rendering

import { useState } from "react";

const SweetnessBitternessSlider = () => {
  const [sweetnessLevel, setSweetnessLevel] = useState(0); // Initial sweetness level
  const [bitternessLevel, setBitternessLevel] = useState(0); // Initial bitterness level
  const [suggestedWine, setSuggestedWine] = useState(""); // Suggested wine based on selections

  // Fake data for wines based on sweetness and bitterness levels
  const wines = [
    { id: 1, name: "Riesling", sweetness: 8, bitterness: 1 },
    { id: 2, name: "Chardonnay", sweetness: 5, bitterness: 3 },
    { id: 3, name: "Cabernet Sauvignon", sweetness: 2, bitterness: 7 },
    { id: 4, name: "Sauvignon Blanc", sweetness: 4, bitterness: 5 },
    { id: 5, name: "Merlot", sweetness: 3, bitterness: 4 },
    { id: 6, name: "Pinot Noir", sweetness: 3, bitterness: 2 },
    { id: 7, name: "Zinfandel", sweetness: 6, bitterness: 4 },
  ];

  // Function to suggest a wine based on sweetness and bitterness levels
  const suggestWine = () => {
    const foundWine = wines.find(
      (wine) =>
        wine.sweetness >= sweetnessLevel - 1 &&
        wine.sweetness <= sweetnessLevel + 1 &&
        wine.bitterness >= bitternessLevel - 1 &&
        wine.bitterness <= bitternessLevel + 1
    );

    if (foundWine) {
      setSuggestedWine(foundWine.name);
    } else {
      setSuggestedWine("No wine found for the selected levels.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Select Sweetness and Bitterness Levels</h2>

      <div>
        <h3>Sweetness Level: {sweetnessLevel}</h3>
        <div style={{ display: "flex", justifyContent: "space-between", width: "300px" }}>
          <span>Not Sweet</span>
          <span>Very Sweet</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value={sweetnessLevel}
          onChange={(e) => setSweetnessLevel(parseInt(e.target.value, 10))} // Parse to integer
          style={{ width: "300px" }}
        />
      </div>

      <div>
        <h3>Bitterness Level: {bitternessLevel}</h3>
        <div style={{ display: "flex", justifyContent: "space-between", width: "300px" }}>
          <span>Not Bitter</span>
          <span>Very Bitter</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value={bitternessLevel}
          onChange={(e) => setBitternessLevel(parseInt(e.target.value, 10))} // Parse to integer
          style={{ width: "300px" }}
        />
      </div>

      <button onClick={suggestWine} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Suggest Wine
      </button>

      {suggestedWine && (
        <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "bold" }}>
          Suggested Wine: {suggestedWine}
        </div>
      )}
    </div>
  );
};

export default SweetnessBitternessSlider;

"use client"; // Required for client-side rendering

import { useState } from "react";

// Fake data for wines
const wines = [
  { id: 1, name: "Riesling", sweetness: 8, bitterness: 1, choices: ["Fruity", "Rough", "Long"] },
  { id: 2, name: "Chardonnay", sweetness: 5, bitterness: 3, choices: ["Fiora", "Silky", "Medium"] },
  { id: 3, name: "Cabernet Sauvignon", sweetness: 2, bitterness: 7, choices: ["Spicy", "Rough", "Long"] },
  { id: 4, name: "Sauvignon Blanc", sweetness: 4, bitterness: 5, choices: ["Spicy", "Silky", "Short"] },
  { id: 5, name: "Merlot", sweetness: 3, bitterness: 4, choices: ["Fruity", "Silky", "Short"] },
  { id: 6, name: "Pinot Noir", sweetness: 3, bitterness: 2, choices: ["Fiora", "Silky", "Long"] },
  { id: 7, name: "Zinfandel", sweetness: 6, bitterness: 4, choices: ["Spicy", "Rough", "Medium"] },
];

const CombinedWineComponent = () => {
  // Sweetness and bitterness levels for slider
  const [sweetnessLevel, setSweetnessLevel] = useState(0);
  const [bitternessLevel, setBitternessLevel] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState({
    taste: "",
    texture: "",
    finish: "",
  });
  const [suggestedWine, setSuggestedWine] = useState("");

  // Suggest wine based on sweetness, bitterness, and user choices
  const suggestWine = () => {
    const foundWine = wines.find(
      (wine) =>
        wine.sweetness >= sweetnessLevel - 1 &&
        wine.sweetness <= sweetnessLevel + 1 &&
        wine.bitterness >= bitternessLevel - 1 &&
        wine.bitterness <= bitternessLevel + 1 &&
        wine.choices.includes(selectedChoices.taste) &&
        wine.choices.includes(selectedChoices.texture) &&
        wine.choices.includes(selectedChoices.finish)
    );

    if (foundWine) {
      setSuggestedWine(foundWine.name);
    } else {
      setSuggestedWine("No wine found matching your preferences.");
    }
  };

  // Handle user choice selection
  const handleChoiceChange = (category: string, choice: string) => {
    setSelectedChoices((prevChoices) => ({
      ...prevChoices,
      [category]: choice,
    }));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Wine Selector</h1>

      {/* Sweetness and Bitterness Slider Section */}
      <div style={{ marginBottom: "40px" }}>
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
            onChange={(e) => setSweetnessLevel(parseInt(e.target.value, 10))}
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
            onChange={(e) => setBitternessLevel(parseInt(e.target.value, 10))}
            style={{ width: "300px" }}
          />
        </div>
      </div>

      {/* Wine Choice Section */}
      <div style={{ marginBottom: "40px" }}>
        <h2>Select Your Preferences</h2>

        {/* Taste Choices */}
        <div>
          <h3>What taste do you prefer?</h3>
          <button
            style={{ marginRight: "20px", padding: "10px 20px", fontSize: "16px" }}
            onClick={() => handleChoiceChange("taste", "Fruity")}
          >
            Fruity
          </button>
          <button
            style={{ marginRight: "20px", padding: "10px 20px", fontSize: "16px" }}
            onClick={() => handleChoiceChange("taste", "Fiora")}
          >
            Fiora
          </button>
          <button
            style={{ padding: "10px 20px", fontSize: "16px" }}
            onClick={() => handleChoiceChange("taste", "Spicy")}
          >
            Spicy
          </button>
        </div>

        {/* Texture Choices */}
        <div style={{ marginTop: "20px" }}>
          <h3>What mouthfeel do you like?</h3>
          <button
            style={{ marginRight: "20px", padding: "10px 20px", fontSize: "16px" }}
            onClick={() => handleChoiceChange("texture", "Rough")}
          >
            Rough
          </button>
          <button
            style={{ padding: "10px 20px", fontSize: "16px" }}
            onClick={() => handleChoiceChange("texture", "Silky")}
          >
            Silky
          </button>
        </div>

        {/* Finish Choices */}
        <div style={{ marginTop: "20px" }}>
          <h3>What finish do you prefer?</h3>
          <button
            style={{ marginRight: "20px", padding: "10px 20px", fontSize: "16px" }}
            onClick={() => handleChoiceChange("finish", "Long")}
          >
            Long
          </button>
          <button
            style={{ marginRight: "20px", padding: "10px 20px", fontSize: "16px" }}
            onClick={() => handleChoiceChange("finish", "Medium")}
          >
            Medium
          </button>
          <button
            style={{ padding: "10px 20px", fontSize: "16px" }}
            onClick={() => handleChoiceChange("finish", "Short")}
          >
            Short
          </button>
        </div>
      </div>

      {/* Suggest Wine Button */}
      <button
        onClick={suggestWine}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Suggest Wine
      </button>

      {/* Suggested Wine Display */}
      {suggestedWine && (
        <div style={{ marginTop: "40px", fontSize: "20px", fontWeight: "bold" }}>
          Suggested Wine: {suggestedWine}
        </div>
      )}
    </div>
  );
};

export default CombinedWineComponent;

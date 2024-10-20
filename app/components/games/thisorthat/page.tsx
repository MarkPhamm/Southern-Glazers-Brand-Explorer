"use client"; 

import { useState } from "react";

// Fake wine data mapped to user choices
const wineRecommendations = [
  { choices: ["Fruity", "Rough", "Long"], wine: "Moscato" },
  { choices: ["Fiora", "Silky", "Long"], wine: "Riesling"},
  { choices: ["Spicy", "Silky", "Medium"], wine: "Cabernet"},
  { choices: ["Spicy", "Silky", "Short"], wine: "Sauvignon"},
  { choices: ["Fruity", "Rough", "Short"], wine: "Chardonnay"},
];

export default function WineSelectorGame() {
  const [step, setStep] = useState(1);            // Track which step the user is on
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);  // User's selected choices
  const [finalWine, setFinalWine] = useState<string | null>(null);  // The recommended wine

  // Function to handle user choice
  const handleChoice = (choice: string) => {
    // Add the selected choice to the choices array
    const updatedChoices = [...selectedChoices, choice];
    setSelectedChoices(updatedChoices);

    // Move to the next step or determine the final wine
    if (step === 1) {
      setStep(2);  // Move to step 2 (Rough or Silky mouthfeel)
    } else if (step === 2) {
      setStep(3); // Move to step 3 (Long or Medium or Short finish)
    } else if (step == 3) {
        // Find the wine recommendation based on the user's choices
      const wine = wineRecommendations.find(
        (recommendation) =>
          recommendation.choices[0] === updatedChoices[0] &&  // Match first choice (Fruity/Fiora/Spicy)
          recommendation.choices[1] === updatedChoices[1] &&  // Match second choice (Rough/Silky)
          recommendation.choices[2] === updatedChoices[2]     // Match third choice (Long/Medium/Short)
      );
      setFinalWine(wine?.wine || "Sorry, no wine matches your choice!");  // Set the final wine
    }
  };

  // Reset the game
  const resetGame = () => {
    setStep(1);
    setSelectedChoices([]);
    setFinalWine(null);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Wine Selector: This or That Game</h1>

      {finalWine ? (
        <div>
          <h2>Your perfect wine is: {finalWine}</h2>
          <button
            style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      ) : (
        <div>
          {step === 1 && (
            <>
              <h2>Do you prefer Fruity or Fiora or Spicy wine?</h2>
              <button
                style={{ marginRight: "20px", padding: "10px 20px", fontSize: "16px" }}
                onClick={() => handleChoice("Fruity")}
              >
                Fruity
              </button>
              <button
                style={{ marginRight: "20px", padding: "10px 20px", fontSize: "16px" }}
                onClick={() => handleChoice("Fiora")}
              >
                Fiora
              </button>
              <button
                style={{ marginRight: "20px", padding: "10px 20px", fontSize: "16px" }}
                onClick={() => handleChoice("Spicy")}
              >
                Spicy
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Would you like Rough or Silky mouthfeel?</h2>
              <button
                style={{ marginRight: "20px", padding: "10px 20px", fontSize: "16px" }}
                onClick={() => handleChoice("Rough")}
              >
                Rough
              </button>
              <button
                style={{ padding: "10px 20px", fontSize: "16px" }}
                onClick={() => handleChoice("Silky")}
              >
                Silky
              </button>
            </>
          )}

            {step === 3 && (
            <>
              <h2>Would you like Long or Medium or Short finish?</h2>
              <button
                style={{ marginRight: "20px", padding: "10px 20px", fontSize: "16px" }}
                onClick={() => handleChoice("Long")}
              >
                Long
              </button>
              <button
                style={{ marginRight: "20px", padding: "10px 20px", fontSize: "16px" }}
                onClick={() => handleChoice("Medium")}
              >
                Medium
              </button>
              <button
                style={{ marginRight: "20px", padding: "10px 20px", fontSize: "16px" }}
                onClick={() => handleChoice("Short")}
              >
                Short
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}


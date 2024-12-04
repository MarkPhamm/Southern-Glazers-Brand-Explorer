"use client"; // Required for client-side rendering

import { useState } from "react";

const SweetnessBitternessSlider = () => {
  const [inputs, setInputs] = useState({
    sweetnessLevel: 0,
    bitternessLevel: 0,
    alPercentage: 0,
    acidityLevel: 0,
    tanninLevel: 0,
    mouthFeel: "Select an option",
    finish: "Select an option",
  });

  const [suggestedWine, setSuggestedWine] = useState(""); // Suggested wine based on selections

  // Function to handle changes dynamically
  const handleChange = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  // Function to suggest a wine based on selections
  const suggestWine = async () => {
    try {
      const response = await fetch("/api/wine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch wine recommendation");
      }

      const { bestWine } = await response.json();
      setSuggestedWine(bestWine);
    } catch (error) {
      console.error("Error suggesting wine:", error);
    }
  };

  // Check if form is valid
  const isFormValid =
    inputs.mouthFeel !== "Select an option" && inputs.finish !== "Select an option";

  // List of input elements to generate
  const inputElements = [
    { label: "Sweetness Level", key: "sweetnessLevel", type: "range", min: 0, max: 10 },
    { label: "Bitterness Level", key: "bitternessLevel", type: "range", min: 0, max: 10 },
    { label: "Alcohol Percentage", key: "alPercentage", type: "range", min: 0, max: 100 },
    { label: "Acidity Level", key: "acidityLevel", type: "range", min: 0, max: 10 },
    { label: "Tannin Level", key: "tanninLevel", type: "range", min: 0, max: 10 },
    {
      label: "Mouth Feel",
      key: "mouthFeel",
      type: "array",
      options: ["Select an option", "Silky", "Rough", "Velvety"],
    },
    {
      label: "Finish",
      key: "finish",
      type: "array",
      options: ["Select an option", "Short", "Medium", "Long"],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-custom-gray min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-custom-white">Adjust Wine Characteristics</h2>

      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        {inputElements.map(({ label, key, type, min, max, options }) => (
          <div key={key} className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              {label}: <span className="text-custom-white-600">{inputs[key]}</span>
            </label>
            {type === "range" ? (
              <>
                <input
                  type={type}
                  min={min}
                  max={max}
                  value={inputs[key]}
                  onChange={(e) => handleChange(key, parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-custom-dark-yello rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring focus:ring-black-500"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{min}</span>
                  <span>{max}</span>
                </div>
              </>
            ) : type === "array" ? (
              <select
                value={inputs[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className={`w-full border ${
                  inputs[key] === "Select an option"
                    ? "border-red-500"
                    : "border-custom-dark-yello-300"
                } rounded-lg p-2 focus:outline-none focus:ring ${
                  inputs[key] === "Select an option"
                    ? "focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                value={inputs[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
              />
            )}
          </div>
        ))}

        <button
          onClick={suggestWine}
          disabled={!isFormValid}
          className={`w-full py-2 px-4 rounded-lg font-bold text-white transition ${
            isFormValid
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Suggest Wine
        </button>
      </div>

      {suggestedWine && (
        <div className="mt-8 w-full max-w-lg bg-gray-50 shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Suggested Wine Details:</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Suggested wine details go here */}
            <div>
            <p className="font-medium text-gray-600">Brand Name:</p>
            <p className="text-gray-800">{suggestedWine.corp_item_brand_name || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Alcohol Percentage:</p>
            <p className="text-gray-800">
              {suggestedWine.alcohol_percentage
                ? `${suggestedWine.alcohol_percentage}%`
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Sweetness Level:</p>
            <p className="text-gray-800">{suggestedWine.sweetness_level || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Acidity Level:</p>
            <p className="text-gray-800">{suggestedWine.acidity_level || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Tannin Level:</p>
            <p className="text-gray-800">{suggestedWine.tannin_level || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Body:</p>
            <p className="text-gray-800">{suggestedWine.body || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Serving Temperature:</p>
            <p className="text-gray-800">{suggestedWine.serving_temperature || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Vintage Year:</p>
            <p className="text-gray-800">{suggestedWine.vintage_year || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Grape Variety:</p>
            <p className="text-gray-800">{suggestedWine.grape_variety || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Region:</p>
            <p className="text-gray-800">{suggestedWine.region || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Food Pairing:</p>
            <p className="text-gray-800">{suggestedWine.food_pairing || "N/A"}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Aroma:</p>
            <p className="text-gray-800">{suggestedWine.aroma || "N/A"}</p>
          </div>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default SweetnessBitternessSlider;

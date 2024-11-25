"use client"; // Required for client-side rendering

import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const SweetnessBitternessSlider = () => {
  const [inputs, setInputs] = useState({
    sweetnessLevel: 0,
    bitternessLevel: 0,
    alPercentage: 0,
    acidityLevel: 0,
    tanninLevel: 0,
    mouthFeel: "Silky",
    finish: "Short",
  });

  const [currentStep, setCurrentStep] = useState(0); // Track the current slider step
  const [suggestedWine, setSuggestedWine] = useState(""); // Suggested wine based on selections

  // Function to handle changes dynamically
  const handleChange = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    setCurrentStep((prevStep) => prevStep + 1); // Move to the next slider
  };

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
      options: ["Silky", "Rough", "Velvety"],
    },
    {
      label: "Finish",
      key: "finish",
      type: "array",
      options: ["Short", "Medium", "Long"],
    },
  ];

  // Suggest wine (with fake fallback data if no API response is received)
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


  return (
    <>
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Adjust Wine Characteristics</h2>
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
          {inputElements.slice(0, currentStep + 1).map(({ label, key, type, min, max, options }) => (
            <div key={key} className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {label}: <span className="text-indigo-600">{inputs[key]}</span>
              </label>
              {type === "range" ? (
                <>
                  <input
                    type={type}
                    min={min}
                    max={max}
                    value={inputs[key]}
                    onChange={(e) => handleChange(key, parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring focus:ring-custom-gray"
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
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-custom-gray"
                >
                  <option value="" className="text-custom-gray">Select an option</option>
                  {options.map((option) => (
                    <option key={option} value={option} className="text-custom-gray">
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  value={inputs[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-custom-gray"
                />
              )}
            </div>
          ))}

          {currentStep >= inputElements.length && (
            <button
              onClick={suggestWine}
              className="w-full bg-custom-red hover:scale-x-90 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-900 transition"
            >
              Suggest Wine
            </button>
          )}
        </div>

        {suggestedWine && (
          <div className="mt-8 w-full max-w-lg bg-gray-50 shadow-md rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Suggested Wine Details:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-600">Brand Name:</p>
                <p className="text-gray-800">{suggestedWine.corp_item_brand_name || "N/A"}</p>
              </div>
              {/* Add more fields as needed */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SweetnessBitternessSlider;

"use client"; // Required for client-side rendering

import { useState } from "react";

const SweetnessBitternessSlider = () => {
  const [inputs, setInputs] = useState({
    sweetnessLevel: 0,
    bitternessLevel: 0,
    alPercentage: 0,
    acidityLevel: 0,
    tanninLevel: 0,
    mouthFeel: "",
    finish: "",
  });

  const [suggestedWine, setSuggestedWine] = useState(""); // Suggested wine based on selections

  // Function to handle changes dynamically
  const handleChange = (key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  // Function to suggest a wine based on selections
  const suggestWine = () => {
    setSuggestedWine(JSON.stringify(inputs, null, 2));
    console.log(inputs);
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

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Adjust Wine Characteristics</h2>

      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        {inputElements.map(({ label, key, type, min, max, options }) => (
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
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring focus:ring-indigo-500"
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
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-500"
              >
                <option value="">Select an option</option>
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
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Suggest Wine
        </button>
      </div>

      {suggestedWine && (
        <div className="mt-8 w-full max-w-lg bg-gray-50 shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Suggested Wine:</h3>
          <pre className="whitespace-pre-wrap text-sm bg-gray-200 rounded-lg p-4 text-gray-800 overflow-auto">
            {suggestedWine}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SweetnessBitternessSlider;

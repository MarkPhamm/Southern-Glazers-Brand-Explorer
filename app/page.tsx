'use client';
import { useState } from 'react';
import './styles/globals.css';
import AgeModal from './components/agemodal/AgeModal';
import NavBar from './components/Navbar';
// import ThisOrThat from './components/games/thisorthat'; // Assume this game is in the components folder
import Slider from './components/games/Slider'; // Assume this game is in the components folder

export default function Home() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          HELLO, Welcome to our recommendation system. Choose one of the two games below:
        </h1>
        <div className="game-container flex space-x-6">
          <button
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            // onClick={() => setSelectedGame('thisOrThat')}
          >
            This or That
          </button>
          <button
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200"
            onClick={() => setSelectedGame('slider')}
          >
            Slider
          </button>
        </div>
        <div className="mt-10 w-full max-w-3xl">
          {selectedGame === 'thisOrThat' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ThisOrThat />
            </div>
          )}
          {selectedGame === 'slider' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Slider />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
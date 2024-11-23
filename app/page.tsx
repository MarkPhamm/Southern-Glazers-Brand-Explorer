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
    <div className="min-h-screen bg-custom-gray">
      <NavBar />
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl font-southern text-white tracking-wide mb-8">
          Welcome to Southern Glazer's Recommendation System
        </h1>
        <p className="text-lg font-southern text-custom-dark-yello mb-12 max-w-2xl text-center">
          Choose one of the games below to get personalized recommendations tailored just for you.
        </p>
        <div className="flex space-x-8">
          <button
            className="px-8 py-4 bg-indigo-600 text-white font-medium text-lg rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            // onClick={() => setSelectedGame('thisOrThat')}
          >
            This or That
          </button>
          <button
            className="px-8 py-4 bg-teal-600 text-white font-medium text-lg rounded-md shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200"
            onClick={() => setSelectedGame('slider')}
          >
            Slider
          </button>
        </div>
        <div className="mt-16 w-full max-w-4xl">
          {selectedGame === 'thisOrThat' && (
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <ThisOrThat />
            </div>
          )}
          {selectedGame === 'slider' && (
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <Slider />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

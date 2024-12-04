'use client';
import { useState } from 'react';
import './styles/globals.css';
import AgeModal from './components/agemodal/AgeModal';
import NavBar from './components/Navbar';
import Slider from './components/games/Slider'; // Assume this game is in the components folder
import Chatbot from './components/chatbot';

export default function Home() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://assets.southernglazers.com/is/image/sgwscorp/supplier%20hero?wid=2000&hei=1125&fit=crop,0&qlt=80')`,
      }}
    >
      <NavBar />
      
      <div className="flex flex-col items-center justify-center py-16 bg-black bg-opacity-50">
        <h1 className="text-3xl font-southern text-white tracking-wide mb-8">
          Welcome to Southern Glazer's Recommendation System
        </h1>
        <p className="text-lg font-southern text-custom-dark-yello mb-12 max-w-2xl text-center">
          Play this game below to get personalized recommendations tailored just for you.
        </p>
        <div className="flex space-x-8">
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
        <div className="m-2">

        </div>
        <Chatbot/>
      </div>
    </div>
  );
}

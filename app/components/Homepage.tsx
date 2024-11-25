import React from 'react';
import Navbar from './Navbar';

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className='w-full h-screen'>
        <div>
          {/* Image */}
          <img
            src="https://assets.southernglazers.com/is/image/sgwscorp/supplier%20hero?wid=2000&hei=1125&fit=crop,0&qlt=80"
            alt="Hero" className='w-full h-full'
          />
        </div>

      </div>
      {/* Custom Yellow Div Centered */}
      <div className='w-full h-screen bg-custom-brown'>
        <div className='w-1/2 h-1/3 bg-custom-brown absolute inset-x-0 bottom-1 m-auto'>
          <div className='flex flex-col gap-1 justify-center lg:justify-center sm:flex sm:text-xl items-center text-white text-2xl py-8'>
            <div>
              <p>Welcome to Southern Glazer's Recommendation System</p>
            </div>
            <div className='mt-4'>
              <button className="bg-custom-red hover:bg-red-700 hover:scale-110 text-white font-bold py-2 px-4 mx-4 border-b-4 border-red-900 hover:border-red-950 rounded">
                This Or That
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-400 hover:scale-110 text-white font-bold py-2 px-4 mx-4 border-b-4 border-yellow-700 hover:border-yellow-700 rounded">
                Slider
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;

import React, { useState } from 'react';
import Link from 'next/link';
import { BsCart3 } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  return (
    <div>
      <nav className='fixed top-0 h-24 w-full bg-custom-brown shadow-lg flex flex-row justify-between items-center px-24 z-10'>
        <div>
          <a href="/">
            <img src='https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Southern_Glazer%27s_Wine_%26_Spirits_Logo.svg/1200px-Southern_Glazer%27s_Wine_%26_Spirits_Logo.svg.png' alt="Logo" className='h-12'/>
          </a>
        </div>

        <div>
          <ul className='flex flex-row items-center space-x-6'>
            <Link href={"/who"}>
              <li className='nav-link font-southern text-xl font-bold'>Who we are</li>
            </Link>
            <Link href={"/about"}>
              <li className='nav-link font-southern text-xl font-bold'>About</li>
            </Link>
            <Link href={"/games"}>
              <li className='nav-link font-southern text-xl font-bold'>Games</li>
            </Link>
            <Link href={"/explore"}>
              <li className='nav-link font-southern text-xl font-bold'>Explore</li>
            </Link>
            
            {/* Cart Icon with Hover Effect */}
            <span className='flex items-center justify-center cursor-pointer hover:bg-custom-yellow hover:text-custom-black transform hover:scale-150 hover:rounded-full transition-transform'>
              <BsCart3 className='font-bold text-xl'></BsCart3>
            </span>
            
            {/* Shop Proof Link */}
            <Link href='https://shop.sgproof.com/'>
              <div className='font-bold text-custom-black bg-custom-yellow text-xl px-4 py-1 rounded-2xl'>
                Shop Proof
              </div>
            </Link>

            {/* Menu Icon */}
            <span>
              <IoMdMenu className='text-3xl'></IoMdMenu>
            </span>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

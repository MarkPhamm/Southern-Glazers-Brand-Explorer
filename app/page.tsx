'use client';
import { useState } from 'react';
import './styles/globals.css';
import Navbar from './components/Navbar';

export default function Home() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar></Navbar>
    </div>
  );
}

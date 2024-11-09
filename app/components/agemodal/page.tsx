"use client";

import { useState } from 'react';
import AgeModal from './AgeModal';

export default function AgeModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Test Age Modal</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <AgeModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
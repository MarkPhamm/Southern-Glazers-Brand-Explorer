'use client';
import { useEffect, useState } from 'react';
import AgeModal from './components/agemodal/AgeModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <p>Welcome to Southern Glazer</p>
      
      {/* Render the AgeModal component */}
      <AgeModal isOpen={isModalOpen} onClose={handleCloseModal} />
      
      {/* Optional: Button to reopen the modal for testing */}
      {!isModalOpen && (
        <button onClick={() => setIsModalOpen(true)}>
          Reopen Age Verification
        </button>
      )}
    </div>
  );
}
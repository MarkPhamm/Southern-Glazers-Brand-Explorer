import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './AgeModal.module.css';

if (typeof window !== 'undefined') {
  Modal.setAppElement(document.body);
}

interface AgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AgeModal: React.FC<AgeModalProps> = ({ isOpen, onClose }) => {
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = () => {
    const birthDate = new Date(`${year}-${month}-${day}`);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age >= 21) {
      onClose();
    } else {
      setError("You are not allowed");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
      contentLabel="Age Verification"
    >
      <h2 className={styles.modalTitle}>Hello there, Care to show us some ID?</h2>
      <p className={styles.modalText}>Please, enter your birthdate:</p>

      <div className={styles.dateInputs}>
        <input
          type="number"
          placeholder="MM"
          min={1}
          max={12}
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className={`${styles.dateInput} ${styles.dateInputMonth}`}
        />
        <input
          type="number"
          placeholder="DD"
          min={1}
          max={31}
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className={`${styles.dateInput} ${styles.dateInputDay}`}
        />
        <input
          type="number"
          placeholder="YYYY"
          min={1900}
          max={new Date().getFullYear()}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className={`${styles.dateInput} ${styles.dateInputYear}`}
        />
      </div>

      <button onClick={handleSubmit} className={styles.submitButton}>
        Enter
      </button>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <p className={styles.termsText}>
        By entering this site you are agreeing to the Terms of Use and Privacy Policy.
      </p>
    </Modal>
  );
};

export default AgeModal;

import React from 'react';
import '../styles.css';

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <div className="alert">
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">Close</button>
    </div>
  );
};

export default Alert;

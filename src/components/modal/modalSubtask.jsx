import React from 'react';
import './Modal.css'; // Importa el archivo CSS para estilos

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;

import React, { FC, useState } from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  action: string;
  items?: string[];
  category: string;
  onSubmit: (selectedValue: string, category: string, action: string) => void; // Define the onSubmit prop
}

const Modal: FC<ModalProps> = ({ show, onClose, title, action, category, items, onSubmit }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(selectedValue, category, action);
    onClose(); // Close the modal after submitting
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <select onChange={(e) => handleSelectChange(e)}>
            <option value="">Select a value</option>
          {items ? items.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          )) : null}
        </select>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
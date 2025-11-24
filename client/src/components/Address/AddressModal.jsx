import React from "react";

const AddressModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default AddressModal;

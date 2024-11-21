import axios from 'axios';
import React, { useState } from 'react';
import { baseuRL } from '../../app/api';

const AddModalService = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = async () => {
    try {
      const response = await axios.post(`${baseuRL}/api/AdminControl/estimation-price`, {price : inputValue , email : "raheelsh653@gmail.com" });

      if (response.data) {
        const data = await response.json();
        console.log('Response:', data);
        onClose();
      } else {
        console.error('Failed to send data:', response.statusText);
        alert('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending data');
    }
  };

  if (!isOpen) return null; // Don't render anything if the modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Send Data</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group mb-4">
            <label htmlFor="input" className="block text-sm font-medium text-gray-700">
              Enter Value
            </label>
            <input
              type="text"
              id="input"
              name="input"
              value={inputValue}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter something..."
            />
          </div>
          <div className="modal-actions flex justify-end">
            <button
              type="button"
              onClick={handleSend}
              className="btn btn-primary bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModalService;

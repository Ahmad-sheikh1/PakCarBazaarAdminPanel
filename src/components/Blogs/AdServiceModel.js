import axios from 'axios';
import React, { useState } from 'react';
import { baseuRL } from '../../app/api';
import { useSelector } from 'react-redux';

const AddModelBlogs = ({ isOpen, onClose }) => {
  const AuthorID = useSelector((state) => state.login.User?.Id);
  console.log(AuthorID);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    author : AuthorID
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};


  const handleSend = async () => {
    try {
      const response = await axios.post(`${baseuRL}/api/Blogs/Create-Blog`, formData);

      if (response.status === 200) {
        console.log('Response:', response.data);
        alert('Data sent successfully!');
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
          {/* Title Input */}
          <div className="form-group mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter the title..."
            />
          </div>

          {/* Content Input */}
          <div className="form-group mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter the content..."
            ></textarea>
          </div>

          {/* Category Input */}
          <div className="form-group mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Lifestyle Blog">Lifestyle Blog</option>
            </select>
          </div>

          {/* Modal Actions */}
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

export default AddModelBlogs;

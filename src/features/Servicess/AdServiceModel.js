import React, { useState } from 'react';

const AddModalService = ({ isOpen, onClose, onSave }) => {
  const [newService, setNewService] = useState({
    title: '',
    price: Number,
    category: '',
    location: '',
    images: ["23423","23423","23423","23423"],
    description: '',
    postedBy : '66c62da70436ef36cef583fb',
    status : 'Pending'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewService({ ...newService, images: files });
  };

  const handleSubmit = () => {
    // You can further process the images here if needed before sending them to onSave
    onSave(newService);
    console.log(newService);

    setNewService({
      title: '',
      price: '',
      category: '',
      location: '',
      images: []
    });
    onClose(); // Close modal after saving
  };

  if (!isOpen) return null; // Don't render anything if the modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Service</h2>
        <form>
          {/* Existing form fields */}
          <div className="form-group mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newService.title}
              onChange={handleInputChange}
              className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newService.price}
              onChange={handleInputChange}
              className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={newService.category}
              onChange={handleInputChange}
              className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={newService.location}
              onChange={handleInputChange}
              className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">description</label>
            <input
              type="text"
              id="location"
              name="description"
              value={newService.description}
              onChange={handleInputChange}
              className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* <div className="form-group mb-4">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleFileChange}
              multiple
              className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div> */}
          <div className="modal-actions flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
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

import React, { useState } from 'react';

const AddModalMining = ({ isOpen, onClose, onSave }) => {
    const [newService, setNewService] = useState({
        Title: '',
        Section: '',
        Location: '',
        Description: '',
        images: ["2343","32423"]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewService({ ...newService, [name]: value });
    };

    const handleSubmit = () => {
        console.log(newService);
        
        onSave(newService);
        setNewService({
            Title: '',
            Section: '',
            Location: '',
            Description: '',
            images:  ["2343","32423"]
        });
        // onClose(); // Close modal after saving
    };

    if (!isOpen) return null; // Don't render anything if the modal is closed

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add New Service</h2>
                <form>
                    <div className="form-group mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="Title"
                            value={newService.Title}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Section</label>
                        <input
                            type="text"
                            id="price"
                            name="Section"
                            value={newService.Section}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            id="category"
                            name="Location"
                            value={newService.Location}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            id="location"
                            name="Description"
                            value={newService.Description}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/* <div className="form-group mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Images</label>
                        <input
                            type="text"
                            id="status"
                            name="images"
                            value={newService.images}
                            onChange={handleInputChange}
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

export default AddModalMining;

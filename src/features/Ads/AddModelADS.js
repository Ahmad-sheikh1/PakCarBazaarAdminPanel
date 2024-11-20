import React, { useState } from 'react';

const AddModalADS = ({ isOpen, onClose, onSave }) => {
    const intialobj = {
        user_id : '66d434590ef89c228c512522',
        status : 'pending',
        title: '',
        price: '',
        section: '',
        description: '',
        images: ['234234'],
        Adtype: ''
    }
    const [newService, setNewService] = useState(intialobj);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewService({ ...newService, [name]: value });
    };

    const handleSubmit = () => {
        onSave(newService);
        setNewService(intialobj);
        onClose(); // Close modal after saving
    };

    if (!isOpen) return null; // Don't render anything if the modal is closed

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-bold mb-4">Add New Ads</h2>
                <form>
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
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Section</label>
                        <input
                            type="text"
                            id="sex"
                            name="section"
                            value={newService.section}
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
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">images</label>
                        <input
                            type="text"
                            id="status"
                            name="images"
                            value={newService.images}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div> */}
                    <div className="form-group mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Adtype</label>
                        <input
                            type="text"
                            id="status"
                            name="Adtype"
                            value={newService.Adtype}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="modal-actions flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-secondary mr-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn btn-primary  bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddModalADS;

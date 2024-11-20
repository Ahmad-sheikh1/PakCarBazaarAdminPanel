import React, { useState } from 'react';

const AddModalJobUser = ({ isOpen, onClose, onSave }) => {
    const instialobj = {
        title: '',
        status: "Pending",
        city: '',
        userId: '66d434590ef89c228c512522',
        sex: '',
        section: '',
        yearsOfExperience: 7,
        nationality: '',
        subcategory: '',
        description: '',
        expectedSalary: '',
        academicQualification: '',
        drivingLicense: false,
        cv: '',
        careerLevel: '',
        careerType: "part-time",
        adType : '',
        isLookingForJob: true,
        isLookingForInternship: false
    }
    const [newService, setNewService] = useState(instialobj);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewService({ ...newService, [name]: value });
    };

    const handleSubmit = () => {
        console.log(newService);

        onSave(newService);
        setNewService(instialobj);
        // onClose(); // Close modal after saving
    };

    if (!isOpen) return null; // Don't render anything if the modal is closed

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-bold mb-4">Add New Service</h2>
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
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">academicQualification</label>
                        <input
                            type="text"
                            id="title"
                            name="academicQualification"
                            value={newService.academicQualification}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">description</label>
                        <input
                            type="text"
                            id="title"
                            name="description"
                            value={newService.description}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            id="price"
                            name="city"
                            value={newService.city}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Sex</label>
                        <input
                            type="text"
                            id="sex"
                            name="sex"
                            value={newService.sex}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Section</label>
                        <input
                            type="text"
                            id="location"
                            name="section"
                            value={newService.section}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/* <div className="form-group mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">careerType</label>
                        <input
                            type="text"
                            id="location"
                            name="careerType"
                            value={newService.careerType}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div> */}
                    <div className="form-group mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Years Of Action</label>
                        <input
                            type="text"
                            id="status"
                            name="yearsOfExperience"
                            value={newService.yearsOfExperience}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Nationality</label>
                        <input
                            type="text"
                            id="status"
                            name="nationality"
                            value={newService.nationality}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Sub category</label>
                        <input
                            type="text"
                            id="status"
                            name="subcategory"
                            value={newService.subcategory}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Expected Salary</label>
                        <input
                            type="text"
                            id="status"
                            name="expectedSalary"
                            value={newService.expectedSalary}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/* <div className="form-group mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Driving License</label>
                        <input
                            type="text"
                            id="status"
                            name="drivingLicense"
                            value={newService.drivingLicense}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div> */}
                    <div className="form-group mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">CV</label>
                        <input
                            type="text"
                            id="status"
                            name="cv"
                            value={newService.cv}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">adType</label>
                        <input
                            type="text"
                            id="status"
                            name="adType"
                            value={newService.adType}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">CareelLevel</label>
                        <input
                            type="text"
                            id="status"
                            name="careerLevel"
                            value={newService.careerLevel}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="modal-actions flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-secondary mr-2  bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn btn-primar  bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddModalJobUser;

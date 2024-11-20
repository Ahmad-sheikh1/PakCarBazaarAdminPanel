import React, { useState } from 'react';

const AddModalComJobs = ({ isOpen, onClose, onSave }) => {
    const [newJob, setNewJob] = useState({
        title: '',
        price: '',
        city: Number,
        description: '',
        adType: '',
        section: '',
        experienceNeeded: '',
        sex: '',
        subcategory: '',
        nationality: '',
        expectedSalary: '',
        academicQualifications: '',
        drivingLicense: false,
        careerLevel: '',
        careerType: 'full-time', // default value, you can change it as needed
        companyId: '66d434590ef89c228c512522', // default value, you can set it as needed
        status: 'Pending' // default value
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Handle boolean value conversion for drivingLicense
        setNewJob(prevState => ({
            ...prevState,
            [name]: name === 'drivingLicense' ? (value === 'true') : value
        }));
    };

    const handleSubmit = () => {
        onSave(newJob);
        // Reset the form fields
        setNewJob({
            title: '',
            price: '',
            city: '',
            description: '',
            adType: '',
            section: '',
            experienceNeeded: '',
            sex: '',
            subcategory: '',
            nationality: '',
            expectedSalary: '',
            academicQualifications: '',
            drivingLicense: false,
            careerLevel: '',
            careerType: 'full-time',
            companyId: '66d434590ef89c228c512522',
            status: 'Pending'
        });
        console.log(newJob);
        onClose(); // Close modal after saving
    };

    if (!isOpen) return null; // Don't render anything if the modal is closed

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-bold mb-4">Add New Job</h2>
                <form>
                    {/* Form fields */}
                    <div className="form-group mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newJob.title}
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
                            value={newJob.price}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={newJob.city}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={newJob.description}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="adType" className="block text-sm font-medium text-gray-700">Ad Type</label>
                        <input
                            type="text"
                            id="adType"
                            name="adType"
                            value={newJob.adType}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/* Additional fields */}
                    <div className="form-group mb-4">
                        <label htmlFor="section" className="block text-sm font-medium text-gray-700">Section</label>
                        <input
                            type="text"
                            id="section"
                            name="section"
                            value={newJob.section}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="experienceNeeded" className="block text-sm font-medium text-gray-700">Experience Needed</label>
                        <input
                            type="text"
                            id="experienceNeeded"
                            name="experienceNeeded"
                            value={newJob.experienceNeeded}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex</label>
                        <input
                            type="text"
                            id="sex"
                            name="sex"
                            value={newJob.sex}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">Subcategory</label>
                        <input
                            type="text"
                            id="subcategory"
                            name="subcategory"
                            value={newJob.subcategory}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality</label>
                        <input
                            type="text"
                            id="nationality"
                            name="nationality"
                            value={newJob.nationality}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700">Expected Salary</label>
                        <input
                            type="text"
                            id="expectedSalary"
                            name="expectedSalary"
                            value={newJob.expectedSalary}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="academicQualifications" className="block text-sm font-medium text-gray-700">Academic Qualifications</label>
                        <input
                            type="text"
                            id="academicQualifications"
                            name="academicQualifications"
                            value={newJob.academicQualifications}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="drivingLicense" className="block text-sm font-medium text-gray-700">Driving License</label>
                        <input
                            type="checkbox"
                            id="drivingLicense"
                            name="drivingLicense"
                            checked={newJob.drivingLicense}
                            onChange={(e) => handleInputChange({ target: { name: 'drivingLicense', value: e.target.checked } })}
                            className="input-class mt-1"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="careerLevel" className="block text-sm font-medium text-gray-700">Career Level</label>
                        <input
                            type="text"
                            id="careerLevel"
                            name="careerLevel"
                            value={newJob.careerLevel}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="careerType" className="block text-sm font-medium text-gray-700">Career Type</label>
                        <select
                            id="careerType"
                            name="careerType"
                            value={newJob.careerType}
                            onChange={handleInputChange}
                            className="input-class mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="full-time">Full-Time</option>
                            <option value="part-time">Part-Time</option>
                            <option value="hourly">Hourly</option>
                        </select>
                    </div>
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

export default AddModalComJobs;

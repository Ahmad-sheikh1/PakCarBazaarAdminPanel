import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {baseuRL} from "../../app/api"

const EditMode = ({ user, isOpen, onClose, onSave }) => {
  const [FormData, setFormData] = useState({
    accountName: '',
    email: '',
    role: '',
    whatsappNumber: '',
    areaOfSpecialization: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        accountName: user.accountName || '',
        email: user.email || '',
        role: user.role || '',
        whatsappNumber: user.whatsappNumber || '',
        areaOfSpecialization: user.areaOfSpecialization || '',
      });
    }
  }, [user]);

  

  const handleChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(FormData);

  const handleSubmit = async (e) => {
    console.log(user._id);
    
    e.preventDefault();
    console.log(FormData);
    const res = await axios.put(`${baseuRL}/api/account/updateuser/${user._id}` , FormData)
    console.log(res.data);
    if(res.data){
      onClose()
    }
    // Save logic here
    // For example: onSave(FormData);
    // onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-semibold mb-4">Edit User</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="accountName"
                value={FormData.accountName}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={FormData.email}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Role</label>
              <input
                type="text"
                name="role"
                value={FormData.role}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
              <input
                type="text"
                name="whatsappNumber"
                value={FormData.whatsappNumber}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Area of Specialization</label>
              <input
                type="text"
                name="areaOfSpecialization"
                value={FormData.areaOfSpecialization}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditMode;

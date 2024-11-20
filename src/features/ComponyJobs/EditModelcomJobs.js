import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseuRL } from '../../app/api';

const EditModelComJobs = ({ user, isOpen, onClose, onSave }) => {
  const [FormData, setFormData] = useState({
    title: '',
    price: '',
    city: '',
    description: '',
    adType : '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        title: user.title || '',
        price: user.price || '',
        description: user.description || '',
        Adtype: user.adType || '',
        city: user.city || ''
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
    const res = await axios.put(`https://arabic-application-01.vercel.app/api/jobs/compony/updatestatus/${user._id}`, FormData)
    console.log(res.data);
    if (res.data) {
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
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-auto">
          <h3 className="text-lg font-semibold mb-4">Edit User</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={FormData.title}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="text"
                name="price"
                value={FormData.price}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={FormData.city}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">description</label>
              <input
                type="text"
                name="description"
                value={FormData.description}
                onChange={handleChange}
                className="border rounded w-full px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Adtype</label>
              <input
                type="text"
                name="Adtype"
                value={FormData.Adtype}
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

export default EditModelComJobs;

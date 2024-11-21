import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { baseuRL } from '../../app/api';

const EditModelBlogs = ({ user, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    // Pre-fill the form when the user prop changes
    useEffect(() => {
        if (user) {
            setFormData({
                title: user.title || '',
                content: user.content || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedData = {
                ...formData,
                id: user._id, // Include the blog ID
            };

            console.log(updatedData);


            const res = await axios.put(
                `${baseuRL}/api/Blogs/UpdateBlog/${user._id}`,
                formData
            );

            console.log('Response:', res.data);
            onSave(true);
            if (res.data) {
                onClose();
            }
        } catch (error) {
            console.error('Error while updating data:', error);
            alert('Failed to update the data');
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h3 className="text-lg font-semibold mb-4">Edit Blog</h3>
                    <form onSubmit={handleSubmit}>
                        {/* Title Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="border rounded w-full px-3 py-2"
                                required
                            />
                        </div>

                        {/* Content Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Content</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                className="border rounded w-full px-3 py-2"
                                rows="4"
                                required
                            ></textarea>
                        </div>

                        {/* Modal Actions */}
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
};

export default EditModelBlogs;

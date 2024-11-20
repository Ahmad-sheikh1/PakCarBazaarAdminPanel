import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import TitleCard from '../../components/Cards/TitleCard';
import { baseuRL } from '../../app/api';
import axios from 'axios';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]); // Initialize blogs as an empty array
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${baseuRL}/api/Blogs/All-Blogs`);
            if (Array.isArray(response.data)) {
                setBlogs(response.data); // Ensure the response is an array
            } else {
                setError('Fetched data is not in the correct format.');
            }
        } catch (err) {
            console.error('Failed to fetch blogs:', err);
            setError('Failed to fetch blogs. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`${baseuRL}/api/Blogs/${id}`); // Call delete API
            setBlogs(blogs.filter(blog => blog.id !== id)); // Update state
        } catch (err) {
            console.error('Failed to delete blog:', err);
            alert('Failed to delete blog. Please try again.');
        }
    };

    return (
        <TitleCard title={'Blogs Management'} topMargin="mt-2">
            {loading ? (
                <p className="text-center">Loading blogs...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div>
                    <table className="min-w-full table-auto border-collapse text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="px-4 py-2 text-left">Title</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Author</th>
                                <th className="px-4 py-2 text-center">Upload Date</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.length > 0 ? (
                                blogs.map((blog, index) => (
                                    <tr key={blog._id} className="cursor-pointer hover:bg-gray-100">
                                        <td className="px-4 py-2 text-center">{index + 1}</td>
                                        <td className="px-4 py-2 text-left">{blog.title}</td>
                                        <td className="px-4 py-2 text-left">{blog.category.name}</td>
                                        <td className="px-4 py-2 text-left">{blog.author}</td>
                                        <td className="px-4 py-2 text-center">{blog.createdAt}</td>
                                        <td className="px-4 py-2 text-center">
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteBlog(blog._id);
                                                }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-gray-500">
                                        No blogs found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </TitleCard>
    );
};

export default BlogList;

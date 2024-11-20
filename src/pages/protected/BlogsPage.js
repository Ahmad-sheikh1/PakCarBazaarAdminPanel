import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import TitleCard from '../../components/Cards/TitleCard';
import { baseuRL } from '../../app/api';

const BlogList = () => {

    const [blogs, setBlogs] = useState([]); // State to store blogs
    const [loading, setLoading] = useState(true); 

    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${baseuRL}/api/Blogs/All-Blogs`); // Replace with your API endpoint
            setBlogs(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch blogs. Please try again later.');
            setLoading(false);
        }
    };
  

    useEffect(() => {
        fetchBlogs();
    }, []);

    const deleteBlog = (id) => {
        setBlogs(blogs.filter(blog => blog.id !== id));
    };

    return (
        <TitleCard title={'Blogs Managment'} topMargin="mt-2">
            <div className="">
                <table className="min-w-full table-auto border-collapse text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="px-4 py-2 text-center">Serial No.</th>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Author</th>
                            <th className="px-4 py-2">Upload Date</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog, index) => (
                            <tr key={blog.id} className="cursor-pointer hover:bg-gray-100">
                                <td className="px-4 py-2 text-center">{index + 1}</td>
                                <td className="px-4 py-2 text-left">{blog.title}</td>
                                <td className="px-4 py-2 text-left">{blog.author}</td>
                                <td className="px-4 py-2 text-center">{blog.uploadTime}</td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteBlog(blog.id);
                                        }}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {blogs.map(blog => (
                    <Link key={blog.id} to={`/blog/${blog.id}`} className="hidden">
                    </Link>
                ))
                }
            </div >
        </TitleCard>
    );
};

export default BlogList;
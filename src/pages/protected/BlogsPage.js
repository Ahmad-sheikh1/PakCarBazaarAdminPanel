import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import TitleCard from '../../components/Cards/TitleCard';
import { baseuRL } from '../../app/api';
import axios from 'axios';
import AddModelBlogs from '../../components/Blogs/AdServiceModel';
import EditModelBlogs from '../../components/Blogs/EditModelBlogs';
import { BiSolidEdit } from 'react-icons/bi';

const TopSideButtons = ({ HandleAddService }) => {

    return (
        <div className="inline-block float-right">
            {/* <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} /> */}
            <button
                onClick={HandleAddService}
                className="btn btn-primary ml-4"
            >
                Add Blog
            </button>
        </div>
    )
}

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [EditModelOpen, SetIsEditModalOpen] = useState(false);
    const [editUser, setEditUser] = useState();



    const fetchBlogs = async () => {
        try {
            const response = await axios.get(`${baseuRL}/api/Blogs/All-Blogs`);
            if (response.data?.blogs) {
                setBlogs(response.data.blogs);
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

    useEffect(() => {
        console.log('Blogs updated:', blogs);
    }, [blogs]);

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`${baseuRL}/api/Blogs/Del-Blog/${id}`);
            setBlogs(blogs.filter((blog) => blog._id !== id));
        } catch (err) {
            console.error('Failed to delete blog:', err);
            alert('Failed to delete blog. Please try again.');
        }
    };

    const handleAddBlogs = () => {
        setIsAddModalOpen(true);
    }

    const handleEdit = (user) => {
        // navigate(`/app/update/user/${user._id}`, { state: { user } });
        setEditUser(user);
        SetIsEditModalOpen(true);
    };

    const handleSave = (updatedUser) => {
        SetIsEditModalOpen(false);
        fetchBlogs();
      };

    return (
        <>
            <TitleCard title={'Blogs Management'} topMargin="mt-2" TopSideButtons={<TopSideButtons HandleAddService={handleAddBlogs} />}>
                {loading ? (
                    <p className="text-center">Loading blogs...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div>
                        <table className="min-w-full table-auto border-collapse text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left">#</th>
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
                                            <td className="px-4 py-2 text-left">{blog.category?.name || 'N/A'}</td>
                                            <td className="px-4 py-2 text-left">{blog.author?.email || 'N/A'}</td>
                                            <td className="px-4 py-2 text-center">{new Date(blog.createdAt).toLocaleDateString()}</td>
                                            <td className="px-4 py-2 text-center ">
                                                <button
                                                    className="text-red-500 hover:text-red-700 mr-4"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteBlog(blog._id);
                                                    }}
                                                >
                                                    <FaTrash />
                                                </button>
                                                <button onClick={() => handleEdit(blog)} className=" text-blue-500 w-6 h-6">
                                                    <BiSolidEdit />
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
            <AddModelBlogs
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
            <EditModelBlogs
            user={editUser}
            isOpen={EditModelOpen}
            onClose={() => SetIsEditModalOpen(false)}
            onSave={handleSave}
            />
        </>
    );
};

export default BlogList;

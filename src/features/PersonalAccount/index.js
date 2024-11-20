import React, { useEffect, useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import axios from 'axios';
import { baseuRL } from '../../app/api';
import { Link, useNavigate } from 'react-router-dom';
import EditModel from './EditModel';
import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashCan } from "react-icons/fa6";


const TopSideButtons = ({ applySearch }) => {

    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        applySearch(searchText);
    }, [searchText, applySearch]);

    return (
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
        </div>
    )
}

const PersonalIndex = () => {

    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [editUser, setEditUser] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const applySearch = (value) => {
        if (value === "") {
            setFilteredData(originalData);
        } else {
            const filtered = originalData.filter((user) =>
                user.email.toLowerCase().includes(value.toLowerCase()) ||
                user.accountName.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };
    const fetchData = async () => {
        try {
            const res = await axios.get(`${baseuRL}/api/personal-account/getallusers`);
            console.log(res.data);
            setOriginalData(res.data.Users);
            setFilteredData(res.data.Users);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleUserClick = (user) => {
        navigate(`/app/perdetailpage/${user._id}`, { state: { user } });
    };

    const handleEdit = (user) => {
        // navigate(`/app/update/user/${user._id}`, { state: { user } });
        setEditUser(user);
        setIsModalOpen(true);
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`${baseuRL}/api/personal-account/deleteuser/${userId}`);
            setOriginalData(originalData.filter(user => user._id !== userId));
            setFilteredData(filteredData.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSave = (updatedUser) => {
        setOriginalData(originalData.map(user =>
            user._id === updatedUser._id ? updatedUser : user
        ));
        setFilteredData(filteredData.map(user =>
            user._id === updatedUser._id ? updatedUser : user
        ));
        setIsModalOpen(false);
    };

    return (
        <>
            <TitleCard title={'Personal Account'} topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} />} >

                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Role</th>
                                <th>WhatsApp Number</th>
                                <th>interestedIn</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData && filteredData.length > 0 &&
                                filteredData?.map((user) => {
                                    return (
                                        <tr key={user._id}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">

                                                    </div>
                                                    <div>
                                                        <Link to={`/app/personal-user/${user._id.toString()}`}  className="cursor-pointer font-bold">{user.fullName}</Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.whatsappNumber}</td>
                                            <td>{user.interestedIn}</td>
                                            <td className='flex items-center justify-between gap-2'>
                                                <button onClick={() => handleEdit(user)} className="text-blue-500 w-6 h-6">
                                                <BiSolidEdit/>
                                                </button>
                                                <button onClick={() => handleDelete(user._id)} className="text-red-500 w-6 h-6">
                                                <FaRegTrashCan/>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
            <EditModel
                user={editUser}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
        </>
    )
}

export default PersonalIndex

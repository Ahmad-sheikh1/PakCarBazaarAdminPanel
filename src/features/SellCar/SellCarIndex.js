import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseuRL } from '../../app/api';
import AddModalService from './AdServiceModel';

const SellCarIndex = () => {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    const fetchData = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("No token found, user may not be authenticated.");
            return;
        }

        try {
            const res = await axios.get(`${baseuRL}/api/sellcar/List-Sale-Cars`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(res.data.List);
            setOriginalData(res.data.List);
            setFilteredData(res.data.List);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <TitleCard title={'Sales Car Listing'}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>City</th>
                                <th>Model</th>
                                <th>Price</th>
                                <th>Contact Information</th>
                                <th>Send Estimation Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData && filteredData.length > 0 &&
                                filteredData?.map((user) => {
                                    return (
                                        <tr key={user._id}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div>
                                                        <Link className="cursor-pointer font-bold">{user.userId.firstName}</Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{user.city}</td>
                                            <td>{user.model}</td>
                                            <td>{user.price}</td>
                                            <td>{user.contactInformation}</td>
                                            <td>
                                                <button
                                                    onClick={() => setModalOpen(true)}
                                                >
                                                    Estimation Price
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
            <AddModalService
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    )
}

export default SellCarIndex

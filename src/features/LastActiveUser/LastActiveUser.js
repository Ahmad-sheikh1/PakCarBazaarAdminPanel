import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseuRL } from '../../app/api';

const LastActiveIndex = () => {
    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("No token found, user may not be authenticated.");
            return;
        }

        try {
            const res = await axios.get(`${baseuRL}/api/TrackingUser/Recent-Active-Users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(res.data.data);
            setOriginalData(res.data.data);
            setFilteredData(res.data.data);
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
                                <th>#</th>
                                <th>Name</th>
                                <th>City</th>
                                <th>Model</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData && filteredData.length > 0 &&
                                filteredData?.map((user , index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>{user.firstName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.lastActive}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}

export default LastActiveIndex

import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import axios from 'axios';
import { baseuRL } from '../../app/api';
import { Link } from 'react-router-dom';


const AdminApprovelindex = () => {

    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async () => {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        if (!token) {
            console.log("No token found, user may not be authenticated.");
            return; // Optionally, handle the case where no token is found
        }

        try {
            const res = await axios.get(`${baseuRL}/api/carinspection/getallrequests`, {
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
            <TitleCard title={'Car Inspection Requests'}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>City</th>
                                <th>Model</th>
                                <th>City Area</th>
                                <th>Phone </th>
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
                                                        <Link className="cursor-pointer font-bold">{user.n}</Link>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{user.c}</td>
                                            <td>{user.m}</td>
                                            <td>{user.ca}</td>
                                            <td>{user.mn}</td>
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

export default AdminApprovelindex

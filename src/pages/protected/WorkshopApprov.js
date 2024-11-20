import React, { useEffect, useState } from 'react';
import TitleCard from '../../components/Cards/TitleCard';
import SearchBar from "../../components/Input/SearchBar";
import axios from 'axios';
import { baseuRL } from '../../app/api';
import { useNavigate } from 'react-router-dom';

const TopSideButtons = ({ applySearch, handleToggleAutoApprove, isAutoApproveEnabled }) => {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        applySearch(searchText);
    }, [searchText, applySearch]);

    return (
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
            <button
                onClick={handleToggleAutoApprove}
                className={`btn ${isAutoApproveEnabled ? 'btn-warning' : 'btn-primary'} ml-4`}
            >
                {isAutoApproveEnabled ? 'Disable Auto-Approval' : 'Enable Auto-Approval'}
            </button>
        </div>
    );
}

const AdminApprovalWorkshops = () => {
    const [originalWorkshops, setOriginalWorkshops] = useState([]);
    const [filteredWorkshops, setFilteredWorkshops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAutoApproveEnabled, setIsAutoApproveEnabled] = useState(false);
    const navigate = useNavigate();

    const applySearch = (value) => {
        if (value === "") {
            setFilteredWorkshops(originalWorkshops);
        } else {
            const filtered = originalWorkshops.filter((workshop) =>
                workshop.title.toLowerCase().includes(value.toLowerCase()) ||
                workshop.id.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredWorkshops(filtered);
        }
    };

    useEffect(() => {
        const fetchWorkshops = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${baseuRL}/api/workshops`);
                setOriginalWorkshops(res.data);
                setFilteredWorkshops(res.data);

                // Auto-approve if enabled
                if (isAutoApproveEnabled) {
                    const pendingWorkshops = res.data.filter(workshop => workshop.status === 'pending');
                    await Promise.all(pendingWorkshops.map(workshop =>
                        axios.patch(`${baseuRL}/api/workshops/${workshop.id}`, { status: 'approved' })
                    ));
                    setOriginalWorkshops(prevWorkshops =>
                        prevWorkshops.map(workshop =>
                            workshop.status === 'pending' ? { ...workshop, status: 'approved' } : workshop
                        )
                    );
                }
            } catch (error) {
                setError('Error fetching workshops');
            } finally {
                setLoading(false);
            }
        };

        fetchWorkshops();
    }, [isAutoApproveEnabled]);

    const handleStatusChange = async (workshopId, newStatus) => {
        setLoading(true);
        try {
            await axios.patch(`${baseuRL}/api/workshops/${workshopId}`, { status: newStatus });
            setOriginalWorkshops((prevWorkshops) =>
                prevWorkshops.map((workshop) =>
                    workshop.id === workshopId ? { ...workshop, status: newStatus } : workshop
                )
            );
            applySearch('');
        } catch (error) {
            setError('Failed to update workshop status');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAutoApprove = () => {
        setIsAutoApproveEnabled(prevState => !prevState);
    };

    const handleWorkshopClick = (workshop) => {
        navigate(`/app/workshop/${workshop.id}`, { state: { workshop } });
    };

    if (loading) return <p className="text-center">Loading...</p>;
    // if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <>
            <TitleCard title={'Workshop Approval'} topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} handleToggleAutoApprove={handleToggleAutoApprove} isAutoApproveEnabled={isAutoApproveEnabled} />} >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Workshop ID</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredWorkshops.length > 0 ? (
                                filteredWorkshops.map((workshop) => (
                                    <tr key={workshop.id}>
                                        <td>{workshop.id}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={workshop.imageUrl} alt="Workshop" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="cursor-pointer font-bold" onClick={() => handleWorkshopClick(workshop)}>
                                                    {workshop.title}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <select
                                                value={workshop.status}
                                                onChange={(e) => handleStatusChange(workshop.id, e.target.value)}
                                                className="select select-bordered w-full max-w-xs"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        No workshops available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    );
}

export default AdminApprovalWorkshops;

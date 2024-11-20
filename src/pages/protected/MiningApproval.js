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

const AdminApprovalMiningLocations = () => {
    const [originalLocations, setOriginalLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAutoApproveEnabled, setIsAutoApproveEnabled] = useState(false);
    const navigate = useNavigate();

    const applySearch = (value) => {
        if (value === "") {
            setFilteredLocations(originalLocations);
        } else {
            const filtered = originalLocations.filter((location) =>
                location.name.toLowerCase().includes(value.toLowerCase()) ||
                location.id.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredLocations(filtered);
        }
    };

    useEffect(() => {
        const fetchLocations = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${baseuRL}/api/mining-locations`);
                setOriginalLocations(res.data);
                setFilteredLocations(res.data);

                // Auto-approve if enabled
                if (isAutoApproveEnabled) {
                    const pendingLocations = res.data.filter(location => location.status === 'pending');
                    await Promise.all(pendingLocations.map(location =>
                        axios.patch(`${baseuRL}/api/mining-locations/${location.id}`, { status: 'approved' })
                    ));
                    setOriginalLocations(prevLocations =>
                        prevLocations.map(location =>
                            location.status === 'pending' ? { ...location, status: 'approved' } : location
                        )
                    );
                }
            } catch (error) {
                setError('Error fetching mining locations');
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, [isAutoApproveEnabled]);

    const handleStatusChange = async (locationId, newStatus) => {
        setLoading(true);
        try {
            await axios.patch(`${baseuRL}/api/mining-locations/${locationId}`, { status: newStatus });
            setOriginalLocations((prevLocations) =>
                prevLocations.map((location) =>
                    location.id === locationId ? { ...location, status: newStatus } : location
                )
            );
            applySearch('');
        } catch (error) {
            setError('Failed to update mining location status');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAutoApprove = () => {
        setIsAutoApproveEnabled(prevState => !prevState);
    };

    const handleLocationClick = (location) => {
        navigate(`/app/mining-location/${location.id}`, { state: { location } });
    };

    if (loading) return <p className="text-center">Loading...</p>;
    // if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <>
            <TitleCard title={'Mining Location Approval'} topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} handleToggleAutoApprove={handleToggleAutoApprove} isAutoApproveEnabled={isAutoApproveEnabled} />} >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Location ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLocations.length > 0 ? (
                                filteredLocations.map((location) => (
                                    <tr key={location.id}>
                                        <td>{location.id}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={location.imageUrl} alt="Location" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="cursor-pointer font-bold" onClick={() => handleLocationClick(location)}>
                                                    {location.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <select
                                                value={location.status}
                                                onChange={(e) => handleStatusChange(location.id, e.target.value)}
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
                                        No mining locations available
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

export default AdminApprovalMiningLocations;

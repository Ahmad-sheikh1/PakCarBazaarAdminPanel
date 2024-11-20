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

const AdminApprovalServices = () => {
    const [originalServices, setOriginalServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAutoApproveEnabled, setIsAutoApproveEnabled] = useState(false);
    const navigate = useNavigate();

    const applySearch = (value) => {
        if (value === "") {
            setFilteredServices(originalServices);
        } else {
            const filtered = originalServices.filter((service) =>
                service.title.toLowerCase().includes(value.toLowerCase()) ||
                service.id.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredServices(filtered);
        }
    };

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${baseuRL}/api/services`);
                setOriginalServices(res.data);
                setFilteredServices(res.data);

                // Auto-approve if enabled
                if (isAutoApproveEnabled) {
                    const pendingServices = res.data.filter(service => service.status === 'pending');
                    await Promise.all(pendingServices.map(service =>
                        axios.patch(`${baseuRL}/api/services/${service.id}`, { status: 'approved' })
                    ));
                    setOriginalServices(prevServices =>
                        prevServices.map(service =>
                            service.status === 'pending' ? { ...service, status: 'approved' } : service
                        )
                    );
                }
            } catch (error) {
                setError('Error fetching services');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [isAutoApproveEnabled]);

    const handleStatusChange = async (serviceId, newStatus) => {
        setLoading(true);
        try {
            await axios.patch(`${baseuRL}/api/services/${serviceId}`, { status: newStatus });
            setOriginalServices((prevServices) =>
                prevServices.map((service) =>
                    service.id === serviceId ? { ...service, status: newStatus } : service
                )
            );
            applySearch('');
        } catch (error) {
            setError('Failed to update service status');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAutoApprove = () => {
        setIsAutoApproveEnabled(prevState => !prevState);
    };

    const handleServiceClick = (service) => {
        navigate(`/app/service/${service.id}`, { state: { service } });
    };

    if (loading) return <p className="text-center">Loading...</p>;
    // if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <>
            <TitleCard title={'Service Approval'} topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} handleToggleAutoApprove={handleToggleAutoApprove} isAutoApproveEnabled={isAutoApproveEnabled} />} >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Service ID</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredServices.length > 0 ? (
                                filteredServices.map((service) => (
                                    <tr key={service.id}>
                                        <td>{service.id}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={service.imageUrl} alt="Service" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="cursor-pointer font-bold" onClick={() => handleServiceClick(service)}>
                                                    {service.title}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <select
                                                value={service.status}
                                                onChange={(e) => handleStatusChange(service.id, e.target.value)}
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
                                        No services available
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

export default AdminApprovalServices;

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

const AdminApproval = () => {
    const [originalAds, setOriginalAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAutoApproveEnabled, setIsAutoApproveEnabled] = useState(false);
    const navigate = useNavigate();

    const applySearch = (value) => {
        if (value === "") {
            setFilteredAds(originalAds);
        } else {
            const filtered = originalAds.filter((ad) =>
                ad.title.toLowerCase().includes(value.toLowerCase()) ||
                ad.id.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredAds(filtered);
        }
    };

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${baseuRL}/api/ads`);
                setOriginalAds(res.data);
                setFilteredAds(res.data);

                // Auto-approve if enabled
                if (isAutoApproveEnabled) {
                    const pendingAds = res.data.filter(ad => ad.status === 'pending');
                    await Promise.all(pendingAds.map(ad =>
                        axios.patch(`${baseuRL}/api/ads/${ad.id}`, { status: 'approved' })
                    ));
                    setOriginalAds(prevAds =>
                        prevAds.map(ad =>
                            ad.status === 'pending' ? { ...ad, status: 'approved' } : ad
                        )
                    );
                }
            } catch (error) {
                setError('Error fetching ads');
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, [isAutoApproveEnabled]);

    const handleStatusChange = async (adId, newStatus) => {
        setLoading(true);
        try {
            await axios.patch(`${baseuRL}/api/ads/${adId}`, { status: newStatus });
            setOriginalAds((prevAds) =>
                prevAds.map((ad) =>
                    ad.id === adId ? { ...ad, status: newStatus } : ad
                )
            );
            applySearch('');  // Re-apply search after status change
        } catch (error) {
            setError('Failed to update ad status');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAutoApprove = () => {
        setIsAutoApproveEnabled(prevState => !prevState);
    };

    const handleAdClick = (ad) => {
        navigate(`/app/ad/${ad.id}`, { state: { ad } });
    };

    if (loading) return <p className="text-center">Loading...</p>;
    // if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <>
            <TitleCard title={'Ad Approval'} topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} handleToggleAutoApprove={handleToggleAutoApprove} isAutoApproveEnabled={isAutoApproveEnabled} />} >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Ad ID</th>
                                <th>Image</th>
                                 <th>Title</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAds.length > 0 ? (
                                filteredAds.map((ad) => (
                                    <tr key={ad.id}>
                                        <td>{ad.id}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={ad.imageUrl} alt="Ad" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="cursor-pointer font-bold" onClick={() => handleAdClick(ad)}>
                                                    {ad.title}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <select
                                                value={ad.status}
                                                onChange={(e) => handleStatusChange(ad.id, e.target.value)}
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
                                        No ads available
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

export default AdminApproval;

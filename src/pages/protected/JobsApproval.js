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

const AdminApprovalJobs = () => {
    const [originalJobs, setOriginalJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAutoApproveEnabled, setIsAutoApproveEnabled] = useState(false);
    const navigate = useNavigate();

    const applySearch = (value) => {
        if (value === "") {
            setFilteredJobs(originalJobs);
        } else {
            const filtered = originalJobs.filter((job) =>
                job.title.toLowerCase().includes(value.toLowerCase()) ||
                job.id.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredJobs(filtered);
        }
    };

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${baseuRL}/api/jobs`);
                setOriginalJobs(res.data);
                setFilteredJobs(res.data);

                // Auto-approve if enabled
                if (isAutoApproveEnabled) {
                    const pendingJobs = res.data.filter(job => job.status === 'pending');
                    await Promise.all(pendingJobs.map(job =>
                        axios.patch(`${baseuRL}/api/jobs/${job.id}`, { status: 'approved' })
                    ));
                    setOriginalJobs(prevJobs =>
                        prevJobs.map(job =>
                            job.status === 'pending' ? { ...job, status: 'approved' } : job
                        )
                    );
                }
            } catch (error) {
                setError('Error fetching jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [isAutoApproveEnabled]);

    const handleStatusChange = async (jobId, newStatus) => {
        setLoading(true);
        try {
            await axios.patch(`${baseuRL}/api/jobs/${jobId}`, { status: newStatus });
            setOriginalJobs((prevJobs) =>
                prevJobs.map((job) =>
                    job.id === jobId ? { ...job, status: newStatus } : job
                )
            );
            applySearch('');  // Re-apply search after status change
        } catch (error) {
            setError('Failed to update job status');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAutoApprove = () => {
        setIsAutoApproveEnabled(prevState => !prevState);
    };

    const handleJobClick = (job) => {
        navigate(`/app/job/${job.id}`, { state: { job } });
    };

    if (loading) return <p className="text-center">Loading...</p>;
    // if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <>
            <TitleCard title={'Job Approval'} topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} handleToggleAutoApprove={handleToggleAutoApprove} isAutoApproveEnabled={isAutoApproveEnabled} />} >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Job ID</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <tr key={job.id}>
                                        <td>{job.id}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={job.imageUrl} alt="Job" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="cursor-pointer font-bold" onClick={() => handleJobClick(job)}>
                                                    {job.title}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <select
                                                value={job.status}
                                                onChange={(e) => handleStatusChange(job.id, e.target.value)}
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
                                        No jobs available
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

export default AdminApprovalJobs;

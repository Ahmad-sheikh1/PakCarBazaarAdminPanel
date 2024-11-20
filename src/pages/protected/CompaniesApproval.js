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

const AdminApprovalCompanies = () => {
    const [originalCompanies, setOriginalCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAutoApproveEnabled, setIsAutoApproveEnabled] = useState(false);
    const navigate = useNavigate();

    const applySearch = (value) => {
        if (value === "") {
            setFilteredCompanies(originalCompanies);
        } else {
            const filtered = originalCompanies.filter((company) =>
                company.name.toLowerCase().includes(value.toLowerCase()) ||
                company.id.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCompanies(filtered);
        }
    };

    useEffect(() => {
        const fetchCompanies = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${baseuRL}/api/companies`);
                setOriginalCompanies(res.data);
                setFilteredCompanies(res.data);

                // Auto-approve if enabled
                if (isAutoApproveEnabled) {
                    const pendingCompanies = res.data.filter(company => company.status === 'pending');
                    await Promise.all(pendingCompanies.map(company =>
                        axios.patch(`${baseuRL}/api/companies/${company.id}`, { status: 'approved' })
                    ));
                    setOriginalCompanies(prevCompanies =>
                        prevCompanies.map(company =>
                            company.status === 'pending' ? { ...company, status: 'approved' } : company
                        )
                    );
                }
            } catch (error) {
                setError('Error fetching companies');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, [isAutoApproveEnabled]);

    const handleStatusChange = async (companyId, newStatus) => {
        setLoading(true);
        try {
            await axios.patch(`${baseuRL}/api/companies/${companyId}`, { status: newStatus });
            setOriginalCompanies((prevCompanies) =>
                prevCompanies.map((company) =>
                    company.id === companyId ? { ...company, status: newStatus } : company
                )
            );
            applySearch('');
        } catch (error) {
            setError('Failed to update company status');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAutoApprove = () => {
        setIsAutoApproveEnabled(prevState => !prevState);
    };

    const handleCompanyClick = (company) => {
        navigate(`/app/company/${company.id}`, { state: { company } });
    };

    if (loading) return <p className="text-center">Loading...</p>;
    // if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <>
            <TitleCard title={'Company Approval'} topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} handleToggleAutoApprove={handleToggleAutoApprove} isAutoApproveEnabled={isAutoApproveEnabled} />} >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Company ID</th>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map((company) => (
                                    <tr key={company.id}>
                                        <td>{company.id}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-circle w-12 h-12">
                                                    <img src={company.logoUrl} alt="Company" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="cursor-pointer font-bold" onClick={() => handleCompanyClick(company)}>
                                                    {company.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <select
                                                value={company.status}
                                                onChange={(e) => handleStatusChange(company.id, e.target.value)}
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
                                        No companies available
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

export default AdminApprovalCompanies;

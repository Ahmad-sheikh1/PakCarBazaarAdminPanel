import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import axios from 'axios';
import { baseuRL } from '../../app/api';


const AdminApprovelindex = () => {

    const [ComponentChanger, SetComponentChanger] = useState('Jobs');
    const [jobsData, setJobsData] = useState([]);
    const [servicesData, setServicesData] = useState([]);
    const [adsData, setAdsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [jobSubSection, setJobSubSection] = useState('Interns');

    const fetchData = async (type, subtype = null) => {
        setLoading(true);
        try {
            let response;
            if (type === 'Jobs') {
                if (subtype === 'Interns') {
                    response = await axios.get(`${baseuRL}/api/jobs/personaluser/Allinternships`);
                    console.log(response.data);
                    setJobsData(response.data.jobUsers);
                } else if (subtype === 'Companies Offered') {
                    response = await axios.get(`${baseuRL}/api/jobs/Compony/AllJobs`);
                    console.log(response.data);
                    setJobsData(response.data.jobs);
                } else if (subtype === 'Employees Offered') {
                    response = await axios.get(`${baseuRL}/api/jobs/personaluser/Alljob`);
                    console.log(response.data);
                    setJobsData(response.data.jobUsers);
                }
            } else if (type === 'Services') {
                response = await axios.get(`${baseuRL}/api/services/AllServices`);
                console.log(response.data.services);

                setServicesData(response.data.services);
            } else if (type === 'ADS') {
                response = await axios.get(`${baseuRL}/api/ads/Get-Ads`);
                console.log(response.data.ads);
                setAdsData(response.data.ads);
            }
        } catch (error) {
            console.error(`Error fetching ${type} data:`, error);
        } finally {
            setLoading(false);
        }
    };

    const updateJobStatus = async (jobId, type) => {
        setLoading(true);
        try {
            if (type === 'Interns') {
                await axios.put(`https://arabic-application-01.vercel.app/api/jobs/personaluser/updateitnerneestatus/${jobId}`, { status: 'Approved' });
            } else if (type === 'Companies Offered') {
                await axios.put(`https://arabic-application-01.vercel.app/api/jobs/compony/updatestatus/${jobId}`, { status: 'Approved' });
            } else if (type === 'Employees Offered') {
                await axios.put(`https://arabic-application-01.vercel.app/personaluser/updatestatus/${jobId}`, { status: 'Hired' });
            }
            fetchData('Jobs', jobSubSection);
        } catch (error) {
            console.error("Error updating job status:", error);
        } finally {
            setLoading(false);
        }
    };


    const updateAdsStatus = async (adsId) => {
        console.log(adsId);

        setLoading(true);
        try {
            await axios.put(`${baseuRL}/api/ads/${adsId}`, { status: 'approved' });
            fetchData('ADS');
        } catch (error) {
            console.error("Error updating ads status:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateServicesStatus = async (serId) => {
        console.log(serId);

        setLoading(true);
        try {
            await axios.put(`${baseuRL}/api/services/update/${serId}`, { status: 'Hired' });
            fetchData('Services');
        } catch (error) {
            console.error("Error updating Services status:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = (type) => {
        SetComponentChanger(type)
        fetchData(type)
    }


    const handleSubSectionClick = (subType) => {
        setJobSubSection(subType);
        fetchData('Jobs', subType);
    }


    useEffect(() => {
        fetchData('Jobs')
    }, [])

    return (
        <>
            <TitleCard title={'Admin Approves'}>
                <div className='w-full flex justify-between '>
                    <button onClick={() => handleButtonClick('Jobs')} className="rounded-md w-48 mr-3 cursor-pointer  px-3 py-2 text-lg font-semibold outline hover:text-green-500 shadow-sm ">
                        Jobs
                    </button>
                    <button onClick={() => handleButtonClick('Services')} className="rounded-md w-48 mr-3 cursor-pointer  px-3 py-2 text-lg font-semibold outline hover:text-green-500 shadow-sm ">
                        Services
                    </button>
                    <button onClick={() => handleButtonClick('ADS')} className="rounded-md w-48 mr-3 cursor-pointer  px-3 py-2 text-lg font-semibold outline hover:text-green-500 shadow-sm ">
                        ADS
                    </button>
                </div>

                {
                    ComponentChanger === "Jobs" ? (
                        <>
                            <div className='w-full flex justify-between mt-4'>
                                <button onClick={() => handleSubSectionClick('Interns')} className="rounded-md w-48 mr-3 cursor-pointer px-3 py-2 text-lg font-semibold outline hover:text-green-500 shadow-sm ">
                                    Interns
                                </button>
                                <button onClick={() => handleSubSectionClick('Companies Offered')} className="rounded-md w-48 mr-3 cursor-pointer px-3 py-2 text-lg font-semibold outline hover:text-green-500 shadow-sm ">
                                    Companies Offered
                                </button>
                                <button onClick={() => handleSubSectionClick('Employees Offered')} className="rounded-md w-48 mr-3 cursor-pointer px-3 py-2 text-lg font-semibold outline hover:text-green-500 shadow-sm ">
                                    Employees Offered
                                </button>
                            </div>

                            {jobSubSection === 'Interns' && (
                                <table className="table mt-8 w-full">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>UserID</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            jobsData.map((job, index) => (
                                                <tr key={index}>
                                                    <td>{job.title}</td>
                                                    <td>{job.userId?.fullName}</td>
                                                    <button onClick={() => updateJobStatus(job._id, 'Interns')} className="rounded-md mr-3 w-24 cursor-pointer px-3 py-2 text-sm font-semibold outline shadow-sm ">
                                                        {job.status}
                                                    </button>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )}

                            {jobSubSection === 'Companies Offered' && (
                                <table className="table mt-8 w-full">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>ComonyID</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            jobsData.map((job, index) => (
                                                <tr key={index}>
                                                    <td>{job.title}</td>
                                                    <td>{job?.companyId?.accountName}</td>
                                                    <button onClick={() => updateJobStatus(job._id, 'Companies Offered')} className="rounded-md w-24 mr-3 cursor-pointer px-3 py-2 text-sm font-semibold outline shadow-sm ">
                                                        {job.status}
                                                    </button>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )}

                            {jobSubSection === 'Employees Offered' && (
                                <table className="table mt-8 w-full">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>UserID</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            jobsData.map((job, index) => (
                                                <tr key={index}>
                                                    <td>{job.title}</td>
                                                    <td>{job.userId?.fullName}</td>
                                                    <button onClick={() => updateJobStatus(job._id, 'Employees Offered')} className="rounded-md w-24 mr-3 cursor-pointer px-3 py-2 text-sm font-semibold outline shadow-sm ">
                                                        {job.status}
                                                    </button>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )}

                        </>
                    ) : ComponentChanger === 'Services' ? (
                        <>
                            <table className="table mt-8 w-full">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Cateogry</th>
                                        <th>Location</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicesData?.map((job, index) => (
                                        <tr key={index}>
                                            <td>{job.title}</td>
                                            <td>{job.user_id}</td>
                                            <td>{job.location}</td>
                                            <td>
                                                <button onClick={() => updateServicesStatus(job._id)} className="rounded-md w-24  mr-3 cursor-pointer  px-3 py-2 text-sm font-semibold outline  shadow-sm ">
                                                    {job.status}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : ComponentChanger === 'ADS' ? (
                        <>
                            <table className="table mt-8 w-full">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>UserID</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adsData?.map((job, index) => (
                                        <tr key={index}>
                                            <td>{job.title}</td>
                                            <td>{job?.user_id?.fullName}</td>
                                            <td>
                                                <button onClick={() => updateAdsStatus(job._id)} className="rounded-md w-24 mr-3 cursor-pointer  px-3 py-2 text-sm font-semibold outline  shadow-sm ">
                                                    {job.status}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : null
                }

            </TitleCard>
        </>
    )
}

export default AdminApprovelindex

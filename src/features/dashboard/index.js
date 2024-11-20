import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseuRL } from "../../app/api"
import {LoginUserData} from "../user/loginSlice";




function Dashboard() {

    const [compnayAccounts, setcompnayAccounts] = useState(0);
    const [agencyAccounts, setAgencyAccounts] = useState(0);
    const [personalAccounts, setPersonalAccounts] = useState(0);

    const [companies, setCompanies] = useState(0);

    const [TotalADS, setTotalADS] = useState(0);
    const [jobspen, setjobspen] = useState(0);
    const [PAJobs, setPAJobs] = useState(0);
    const [internships, setInternships] = useState(0);
    const [services, setservices] = useState(0);
    const [Minigservices, setMiningservices] = useState(0);
    let dispatch = useDispatch();

    const verifyToken = async (token) => {
        try {
          const response = await axios.post(
            `${baseuRL}/api/userAccount/IsUserLoggedIn`, // Replace with your API endpoint for token verification
            {token},
          );
          return response.data; 
          dispatch(LoginUserData(res.data.isExists));
        } catch (error) {
          console.error("Token verification failed:", error);
          return null; // If the token is invalid or any error occurs, return null
        }
      };
    
    useEffect( () => {
         const token = localStorage.getItem("token");

         if(token){
            verifyToken(token);
         }
    }, [])

    // /api/account/getusers
    // /api/personal-account/getallusers
    // /api/componie/get/allcomponies
    // /api/ads/Get-Ads
    // /api/jobs/Compony/AllJobs
    // /api/jobs/personaluser/Alljob
    // /api/jobs/personaluser/Allinternships
    // /api/services/AllServices
    // /api/miningservice/AllServices

    const statsData = [
        { title: "Government Accounts", value: agencyAccounts, icon: <UserGroupIcon className='w-8 h-8' />, description: "" },
        { title: "Personal Accounts", value: personalAccounts, icon: <UserGroupIcon className='w-8 h-8' />, description: "" },
        { title: "Companies Account", value: compnayAccounts, icon: '', description: "" },

        { title: "Companies", value: companies, icon: '', description: "" },
        { title: "Ads", value: TotalADS, icon: <CircleStackIcon className='w-8 h-8' />, description: "" },

        { title: "Jobs", value: jobspen, icon: <UsersIcon className='w-8 h-8' />, description: "" },
        { title: "Jobs Users", value: PAJobs, icon: <UsersIcon className='w-8 h-8' />, description: "Jobs seeking users" },
        { title: "Internship Users", value: internships, icon: <UsersIcon className='w-8 h-8' />, description: "Internship Seeking Users" },

        { title: "Services", value: services, icon: <UsersIcon className='w-8 h-8' />, description: "" },
        { title: "Mining Services", value: Minigservices, icon: <UsersIcon className='w-8 h-8' />, description: "" },
    ]

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }))
    }

    return (
        <>
            {/** ---------------------- Select Period Content ------------------------- */}
            {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} /> */}

            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1  gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k} />
                        )
                    })
                }
            </div>



            {/** ---------------------- Different charts ------------------------- */}
            <div className=''>
                <div className="grid lg:grid-cols-2 mt-4  grid-cols-1 gap-6">
                    {/* <LineChart /> */}
                    {/* <BarChart /> */}
                </div>
            </div>

            {/** ---------------------- Different stats content 2 ------------------------- */}

            {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div> */}

            {/** ---------------------- User source channels table  ------------------------- */}

            {/* <div className="grid  lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div> */}
        </>
    )
}

export default Dashboard
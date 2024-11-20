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
import { LoginUserData } from "../user/loginSlice";




function Dashboard() {

    const [ActiveUsersCount, setActiveUsersCount] = useState(0);
    const [SignUpCount, setSignUpCount] = useState(0);
    const [SellCarsCount, setSellCarsCount] = useState(0);

    let dispatch = useDispatch();

    const verifyToken = async (token) => {
        try {
            const response = await axios.post(
                `${baseuRL}/api/userAccount/IsUserLoggedIn`, // Replace with your API endpoint for token verification
                { token },
            );
            dispatch(LoginUserData(response.data.data));
            return response.data;
        } catch (error) {
            console.error("Token verification failed:", error);
            return null; // If the token is invalid or any error occurs, return null
        }
    };

    const FetchTrackingUsers = async () => {
        try {
            const one = await axios.get(`${baseuRL}/api/AdminControl/Sell_Car_Count`);
            console.log(one);
            setSellCarsCount(one.data.Count)

            const two = await axios.get(`${baseuRL}/api/TrackingUser/Active-User`);
            console.log(two);
            setActiveUsersCount(two.data.Active_Users)

            const three = await axios.get(`${baseuRL}/api/TrackingUser/Total_SignUps`);
            console.log(three);
            setSignUpCount(three.data.count)

        } catch (error) {

        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        FetchTrackingUsers();

        if (token) {
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
        { title: "Active User", value: ActiveUsersCount, icon: <UserGroupIcon className='w-8 h-8' />, description: "" },
        { title: "Total SignUp Users", value: SignUpCount, icon: <UserGroupIcon className='w-8 h-8' />, description: "" },
        { title: "Total Sell Cars", value: SellCarsCount, icon: '', description: "" },
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
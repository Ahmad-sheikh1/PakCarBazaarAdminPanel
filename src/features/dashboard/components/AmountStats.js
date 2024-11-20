import axios from "axios"
import { useEffect, useState } from "react"
import { baseuRL } from "../../../app/api";

function AmountStats({ }) {
    const [Totalservices, setTotalServices] = useState(0);
    const [pendingservices , setpendingservices] = useState(0)
    console.log(Totalservices);
    const ok = async () => {
        try {
            const res = await axios.get(`${baseuRL}/api/services/AllServices`);
            setTotalServices(res.data.services.length);
            const Pending = res.data.services.filter(ser => ser.status ===  "Pending")
            setpendingservices(Pending.length)
        } catch (error) {
            console.error("Error fetching services:", error);
            setTotalServices(0); // Optional: Set a fallback value in case of an error
        }
    }
    useEffect( () => {
        ok()
    }, [])

    return (
        <div className="stats bg-base-100 shadow">
            <div className="stat">
                <div className="stat-title">Services Offered</div>
                <div className="stat-value">{Totalservices}</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">View Services</button>
                </div>
            </div>

            <div className="stat">
                <div className="stat-title">Services Pending</div>
                <div className="stat-value">{pendingservices}</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">View List</button>
                </div>
            </div>
        </div>
    )
}

export default AmountStats
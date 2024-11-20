import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import SearchBar from "../../components/Input/SearchBar"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseuRL } from "../../app/api"


// const TopSideButtons = ({ applySearch }) => {

//     const [searchText, setSearchText] = useState("")

//     useEffect(() => {
//         applySearch(searchText);
//     }, [searchText, applySearch]);


//     return (
//         <div className="inline-block float-right">
//             <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
//         </div>
//     )
// }

const Allpostsindex = () => {

    const [originalData, setOriginalData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();

    // const applySearch = (value) => {
    //     if (value === "") {
    //         setFilteredData(originalData);
    //     } else {
    //         const filtered = originalData.filter((user) =>
    //             user.email.toLowerCase().includes(value.toLowerCase()) ||
    //             user.accountName.toLowerCase().includes(value.toLowerCase())
    //         );
    //         setFilteredData(filtered);
    //     }
    // };
    const fetchData = async () => {
        try {
            const res = await axios.get(`${baseuRL}/api/componies/get/allcomponies`);
            console.log(res.data);
            setOriginalData(res.data);
            setFilteredData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        
        fetchData();
    }, []);
    return (
        <>
            <TitleCard title={'All Posts'} topMargin="mt-2"  >

                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Free Text</th>
                                <th>Text </th>
                                <th>ImageURL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredData?.map((user) => {
                                    return (
                                        <tr key={user._id}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    {/* <div className="avatar">
                                                        <div className="mask mask-circle w-12 h-12">
                                                            <img src={user.entityLogo} alt="Avatar" />
                                                        </div>
                                                    </div> */}
                                                    <div>
                                                        <div className="font-bold cursor-pointer">{user.FreeText}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{user.Text}</td>
                                            <td>{user.ImageURL}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard >
        </>
    )
}

export default Allpostsindex

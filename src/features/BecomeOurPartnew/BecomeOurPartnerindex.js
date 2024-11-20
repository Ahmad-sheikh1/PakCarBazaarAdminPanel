import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import SearchBar from "../../components/Input/SearchBar";
import { Link } from 'react-router-dom';
import { BiSolidEdit } from 'react-icons/bi';
import { FaRegTrashCan } from 'react-icons/fa6';
import axios from 'axios';
import { baseuRL } from '../../app/api';
import EditModelSer from './EditModelService';
import AddModalService from './AdServiceModel';



const TopSideButtons = ({ applySearch, HandleAddService }) => {

  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    applySearch(searchText);
  }, [searchText, applySearch]);

  return (
    <div className="inline-block float-right">
      {/* <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} /> */}
      <button
        onClick={HandleAddService}
        className="btn btn-primary ml-4"
      >
        Add Service
      </button>
    </div>
  )
}

const Serviceindex = () => {

  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editUser, setEditUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchData = async () => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (!token) {
        console.log("No token found, user may not be authenticated.");
        return; // Optionally, handle the case where no token is found
    }

    try {
        const res = await axios.get(`${baseuRL}/api/becomeourpartner/getallrequests`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
            },
        });

        console.log(res.data.data);
        setOriginalData(res.data.data); // Assuming you're updating your state with this data
        setFilteredData(res.data.data);
    } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally handle errors (e.g., redirect to login if unauthorized)
    }
};

  useEffect(() => {


    fetchData();
  }, []);

    const handleSave = (updatedUser) => {
      // const updatedData = originalData.map((data) =>
      //   data._id === updatedUser._id ? updatedUser : data
      // );
      // setOriginalData(updatedData);
      // setFilteredData(updatedData);
     setIsModalOpen(false);
     fetchData();

  };

  // const applySearch = (value) => {
  //   if (value === "") {
  //     setFilteredData(originalData);
  //   } else {
  //     const filtered = originalData.filter((user) =>
  //       user.email.toLowerCase().includes(value.toLowerCase()) ||
  //       user.accountName.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setFilteredData(filtered);
  //   }
  // };

  // const handleEdit = (user) => {
  //   // navigate(`/app/update/user/${user._id}`, { state: { user } });
  //   setEditUser(user);
  //   setIsModalOpen(true);
  // };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://arabic-application-01.vercel.app/api/services/del/${userId}`);
      setOriginalData(originalData.filter(user => user._id !== userId));
      setFilteredData(filteredData.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  return (
    <>
      <TitleCard title={'Become Our Partner Requests'} topMargin="mt-2" >
      {/* <TitleCard title={'Services'} topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} HandleAddService={handleAddService} />} applySearch={applySearch} > */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Compony Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Phone </th>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.length > 0 &&
                filteredData?.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          {/* <div className="avatar">
                            <div className="mask mask-circle w-12 h-12">
                              <img src={user.title} alt="Avatar" />
                            </div>
                          </div> */}
                          <div>
                            <Link to={`/app/user/${user._id.toString()}`} className="cursor-pointer font-bold">{user.firstName}</Link>
                          </div>
                        </div>
                      </td>
                      <td>{user.companyName}</td>
                      <td>{user.email}</td>
                      <td>{user.city}</td>
                      <td>{user.mobileNumber}</td>
                      {/* <td className='flex items-center justify-between gap-2'>
                        <button onClick={() => handleEdit(user)} className=" text-blue-500 w-6 h-6">
                          <BiSolidEdit />
                        </button>
                        <button onClick={() => handleDelete(user._id)} className="text-red-500 w-6 h-6">
                          <FaRegTrashCan />
                        </button>
                      </td> */}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </TitleCard>
      {/* <EditModelSer
        user={editUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      /> */}
      {/* <AddModalService
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveAdd}
      /> */}
    </>
  )
}

export default Serviceindex

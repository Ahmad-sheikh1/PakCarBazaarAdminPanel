import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import SearchBar from "../../components/Input/SearchBar";
import { Link } from 'react-router-dom';
import { BiSolidEdit } from 'react-icons/bi';
import { FaRegTrashCan } from 'react-icons/fa6';
import axios from 'axios';
import { baseuRL } from '../../app/api';
import AddModalJobUser from './AdModeljobuser';
import EditModelJobUser from './EditModelJobsUser';




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
        Add Job User
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

    const res = await axios.get(`https://arabic-application-01.vercel.app/api/jobs/personaluser/Alljob`);
    console.log(res.data);
    // const agancyUsers = res.data.services.filter((user) => user.role === "CM")
    setOriginalData(res.data.jobUsers);
    setFilteredData(res.data.jobUsers);
    // }
  }
  useEffect(() => {


    fetchData();
  }, []);

  const handleSaveAdd = async (newService) => {
    try {
      const res = await axios.post(`https://arabic-application-01.vercel.app/api/jobs/personaluser/AddJob`, newService);
      console.log(res)
      setOriginalData([...originalData, res.data]);
      setFilteredData([...filteredData, res.data]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleAddService = () => {
    setIsAddModalOpen(true);
  }

  const handleSave = (updatedUser) => {
    // setOriginalData(originalData.map(user =>
    //   user._id === updatedUser._id ? updatedUser : user
    // ));
    // setFilteredData(filteredData.map(user =>
    //   user._id === updatedUser._id ? updatedUser : user
    // ));
    setIsModalOpen(false);
    fetchData();

  };

  const applySearch = (value) => {
    if (value === "") {
      setFilteredData(originalData);
    } else {
      const filtered = originalData.filter((user) =>
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.accountName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleEdit = (user) => {
    // navigate(`/app/update/user/${user._id}`, { state: { user } });
    setEditUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://arabic-application-01.vercel.app/api/jobs/personaluser/deluser/${userId}`);
      setOriginalData(originalData.filter(user => user._id !== userId));
      setFilteredData(filteredData.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  return (
    <>
      <TitleCard title={'Job Users'} topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} HandleAddService={handleAddService} />} applySearch={applySearch} >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>City</th>
                <th>Sex</th>
                <th>Section</th>
                <th>Status</th>
                <th>Action</th>
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
                            <Link to={`/app/user/${user._id.toString()}`} className="cursor-pointer font-bold">{user.title}</Link>
                          </div>
                        </div>
                      </td>
                      <td>{user.city}</td>
                      <td>{user.sex}</td>
                      <td>{user.section}</td>
                      <td>{user.status}</td>
                      <td className='flex items-center justify-between gap-2'>
                        <button onClick={() => handleEdit(user)} className=" text-blue-500 w-6 h-6">
                          <BiSolidEdit />
                        </button>
                        <button onClick={() => handleDelete(user._id)} className="text-red-500 w-6 h-6">
                          <FaRegTrashCan />
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </TitleCard>
      <EditModelJobUser
        user={editUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
      <AddModalJobUser
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveAdd}
      />
    </>
  )
}

export default Serviceindex

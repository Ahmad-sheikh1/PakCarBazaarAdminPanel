import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa';
import { baseuRL } from "../../app/api"

const UserAct = () => {

  // State to hold the users
  const [users, setUsers] = useState(null);


  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseuRL}/api/userAccount/AllUsers`); // Replace with your API endpoint
      setUsers(response.data.data);
    } catch (err) {
      console.log('Failed to fetch blogs. Please try again later.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const blockUserAPI = (id) => `/api/AdminControl/block/${id}`; // Replace with actual endpoint
  const unblockUserAPI = (id) => `/api/AdminControl/unblock/${id}`; // Replace with actual endpoint

  // Handle block/unblock user
  const handleBlockUnblock = async (id, isCurrentlyBlocked) => {
    try {
      const apiUrl = isCurrentlyBlocked ? unblockUserAPI(id) : blockUserAPI(id);
  
      // Get the token from localStorage
      const token = localStorage.getItem('token');
  
      // Make API call with Authorization header
      await axios.patch(`${baseuRL}${apiUrl}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token
        }
      });
  
      // Update the local state after successful API call
      setUsers(users.map(user =>
        user.id === id
          ? { ...user, isBlocked: !isCurrentlyBlocked } // Toggle block status
          : user
      ));
    } catch (error) {
      console.error('Error while updating user block status:', error);
      alert('Failed to update user status. Please try again.');
    }
  };
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Data</h2>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">role</th>
              <th className="py-2 px-4 text-left">IsBlocked</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user , index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4">{user.firstName}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">{`${user.isBlocked}`}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleBlockUnblock(user._id, user.isBlocked)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {user.isBlocked ? (
                      <FaUnlock /> // Unblock icon if user is blocked
                    ) : (
                      <FaLock /> // Block icon if user is not blocked
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAct;
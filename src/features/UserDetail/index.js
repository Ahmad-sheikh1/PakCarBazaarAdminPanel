import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseuRL } from "../../app/api";

const UserIndex = () => {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);

  const fetchData = async (userId) => {
    try {
      const res = await axios.get(`${baseuRL}/api/account/${userId}`);
      if (res.status === 200) {
        setCurrentUser(res.data.users);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  if (!currentUser) {
    return <div>User not found</div>;
  }

  return (
    <>
      <div className="border bg-gray-200 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
            <div className="inline-flex items-center justify-center bg-gray-200 text-gray-400">
              <img
                src={currentUser.entityLogo}
                alt="Profile"
                className="w-40 h-40 rounded-3xl"
              />
            </div>
            <div className="flex flex-col items-center text-center justify-center">
              <h2 className="font-medium title-font text-gray-900 text-lg">
                {currentUser.accountName}
              </h2>
              <p className="text-sm text-gray-500">
                {currentUser.entityInformation}
              </p>
            </div>
          </div>
          <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 sm:text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong className="text-black mr-2">Email:</strong>
                  <span>{currentUser.email}</span>
                </p>
                <p>
                  <strong className="text-black mr-2">Account Type:</strong>
                  {currentUser.accountType}
                </p>
                <p>
                  <strong className="text-black mr-2">Field Of Work:</strong>
                  {currentUser.fieldOfWork}
                </p>
                <p>
                  <strong className="text-black mr-2">Phone Number:</strong>
                  {currentUser.phoneNumber}
                </p>
                <p>
                  <strong className="text-black mr-2">State:</strong>
                  {currentUser.state}
                </p>
                <p>
                  <strong className="text-black mr-2">Website:</strong>
                  {currentUser.website}
                </p>
                <p>
                  <strong className="text-black mr-2">Department:</strong>
                  {currentUser.departmentInPlatform}
                </p>
                <p>
                  <strong className="text-black mr-2">Main Office:</strong>
                  {currentUser.mainOfficeLocation}
                </p>
                <p>
                  <strong className="text-black mr-2">Company Number:</strong>
                  {currentUser.companyNumber}
                </p>
                <p>
                  <strong className="text-black mr-2">Establishment Date:</strong>
                  {new Date(currentUser.establishmentDate).toLocaleDateString()}
                </p>
                <p>
                  <strong className="text-black mr-2">Tax Number:</strong>
                  {currentUser.taxNumber}
                </p>
                <p>
                  <strong className="text-black mr-2">Services Offered:</strong>
                  {currentUser.servicesOffered.join(', ')}
                </p>
              </div>
              <div>
                <img
                  src={currentUser.commercialRecordImage}
                  alt="Commercial Record"
                  className="w-full rounded-lg mb-4"
                />
                <img
                  src={currentUser.taxRecordImage}
                  alt="Tax Record"
                  className="w-full rounded-lg mb-4"
                />
                <p className="flex justify-end items-center">
                  <strong className="text-black mr-2">Role:</strong>
                  <span className="my-2 ml-4 px-3 py-1 text-sm rounded-full ">
                    {currentUser.role}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserIndex;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import { baseuRL } from "../../app/api";

// const UserIndex = () => {
//   const { id } = useParams();
//   // const location = useLocation();
//   // const user = location.state?.user;
//   // console.log("user" , user);
//   const [currentUser, setCurrentUser] = useState(null);

//   const fetchData = async (userId) => {
//     try {
//       const res = await axios.get(`${baseuRL}/api/account/${userId}`);
//       console.log(res.data);
//       if (res.status === 200) {
//         setCurrentUser(res.data.users);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     if (id) {
//       fetchData(id);
//     }
//   }, [id]);

//   if (!currentUser) {
//       return <div>User not found</div>;
//     }
    
//     console.log(currentUser)
//   return (
//     <>
//       <div className="border bg-gray-200 p-6 rounded-lg shadow-lg">
//         <div className="flex flex-col sm:flex-row">
//           <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
//             <div className="inline-flex items-center justify-center bg-gray-200 text-gray-400">
//               <img
//                 src={currentUser.entityLogo}
//                 alt="Profile"
//                 class="w-40 h-40 rounded-3xl"
//               />
//             </div>
//             <div className="flex flex-col items-center text-center justify-center">
//               <h2 class="font-medium title-font text-gray-900 text-lg">
//                 {currentUser.accountName}
//               </h2>
//             </div>
//           </div>
//           <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 sm:text-left">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//               <div>
//                 <p>
//                   <strong className="text-black mr-2">Email:</strong>
//                   <span>{currentUser.email}</span>
//                 </p>
//                 <p>
//                   <strong className="text-black mr-2">Account Type :</strong>
//                   {currentUser.accountType}
//                 </p>
//                 <p>
//                   <strong className="text-black mr-2">field Of Work :</strong>
//                   {currentUser.fieldOfWork}
//                 </p>
//                 <p className="my-1">
//                   <strong className="text-black mr-2">Phone Number :</strong>
//                   {currentUser.phoneNumber}
//                 </p>
//                 <p className="my-1">
//                   <strong className="text-black mr-2">state :</strong>
//                   {currentUser.state}
//                 </p>
//                 <p className="my-1">
//                   <strong className="text-black mr-2">WebSite :</strong>
//                   {currentUser.website}
//                 </p>
//                 <p className="my-1">
//                   <strong className="text-black mr-2">
//                     Department in Platform :
//                   </strong>
//                   {currentUser.departmentInPlatform}
//                 </p>
//                 <p class="flex justify-end items-center">
//                   <strong className="text-black mr-2">Role :</strong>
//                   <span class="my-2 ml-4 px-3 py-1 text-sm rounded-full ">
//                     {currentUser.role}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserIndex;

import React from 'react';
import { useLocation } from 'react-router-dom';

const PerUserDetailPage = () => {
    const location = useLocation();
    const user = location.state?.user;
    console.log(user);

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="border bg-gray-200 p-6 rounded-lg shadow-lg">
            <form className="flex flex-col">
                <div className="text-center mb-8">
                    <div className="flex flex-col items-center text-center justify-center mt-4">
                        <h2 className="font-medium title-font text-gray-900 text-lg">
                            {user.fullName}
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-black font-bold mb-2">Email:</label>
                        <input
                            type="email"
                            value={user.email}
                            className="w-full p-3 mb-6 border border-gray-300 rounded"
                            readOnly
                        />

                        <label className="block text-black font-bold mb-2">Phone Number:</label>
                        <input
                            type="text"
                            value={user.phoneNumber}
                            className="w-full p-3 mb-6 border border-gray-300 rounded"
                            readOnly
                        />

                        <label className="block text-black font-bold mb-2">WhatsApp Number:</label>
                        <input
                            type="text"
                            value={user.whatsappNumber}
                            className="w-full p-3 mb-6 border border-gray-300 rounded"
                            readOnly
                        />

                        <label className="block text-black font-bold mb-2">City:</label>
                        <input
                            type="text"
                            value={user.city}
                            className="w-full p-3 mb-6 border border-gray-300 rounded"
                            readOnly
                        />

                        <label className="block text-black font-bold mb-2">Website:</label>
                        <input
                            type="text"
                            value={user.website}
                            className="w-full p-3 mb-6 border border-gray-300 rounded"
                            readOnly
                        />
                    </div>

                    <div>
                        <label className="block text-black font-bold mb-2">Role:</label>
                        <input
                            type="text"
                            value={user.role}
                            className="w-full p-3 mb-6 border border-gray-300 rounded"
                            readOnly
                        />

                        <label className="block text-black font-bold mb-2">Interested In:</label>
                        <input
                            type="text"
                            value={user.interestedIn}
                            className="w-full p-3 mb-6 border border-gray-300 rounded"
                            readOnly
                        />

                        <label className="block text-black font-bold mb-2">Years of Experience:</label>
                        <input
                            type="number"
                            value={user.yearsOfExperience}
                            className="w-full p-3 mb-6 border border-gray-300 rounded"
                            readOnly
                        />

                        <label className="block text-black font-bold mb-2">Previous Experience Details:</label>
                        <textarea
                            value={user.previousExperienceDetails}
                            className="w-full p-3 mb-6 border border-gray-300 rounded"
                            readOnly
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PerUserDetailPage;

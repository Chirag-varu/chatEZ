import { useEffect, useState } from 'react';
import { useUserStore } from "../store/useUserStore";
import { FiSearch } from "react-icons/fi"; // Importing search icon from react-icons

const Admin = () => {
  const { users, isUsersLoading, getAllUsers } = useUserStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const isNameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const userDate = new Date(user.createdAt);
    const isDateInRange = (!startDate || userDate >= new Date(startDate)) &&
      (!endDate || userDate <= new Date(endDate));
    return isNameMatch && isDateInRange;
  });

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-gray-900 dark:text-gray-100">
        Admin Dashboard
      </h1>

      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border px-4 py-2 pl-10 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-100"
          />
          <FiSearch className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400 dark:text-gray-300" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <p className="flex justify-center items-center font-semibold text-lg text-gray-900 dark:text-gray-100">
            Select range:
          </p>
          <div className="flex gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-4 py-2 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-100"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-4 py-2 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      {isUsersLoading ? (
        <p className="text-center text-lg text-gray-700 dark:text-gray-300">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-500 dark:bg-blue-700 text-white">
                <th className="py-3 px-6 text-left">Profile Picture</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="py-4 px-6">
                      <img
                        src={user.profilePic}
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-gray-100">{user.name}</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-gray-100">{user.email}</td>
                    <td className="py-4 px-6 text-gray-900 dark:text-gray-100">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 px-6 text-center text-gray-700 dark:text-gray-300">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;

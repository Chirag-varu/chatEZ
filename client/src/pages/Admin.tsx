import { useEffect, useRef, useState } from 'react';
import { useUserStore } from "../store/useUserStore";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { users, isUsersLoading, getAllUsers } = useUserStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const getUsers = async () => {
    const response = await getAllUsers();
    console.log('====================================');
    console.log('response:', response);
    console.log('====================================');
    if (!response) {
      navigate('/admin-login');
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const isNameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const userDate = new Date(user.createdAt);
    const isDateInRange = (!startDate || userDate >= new Date(startDate)) &&
      (!endDate || userDate <= new Date(endDate));
    return isNameMatch && isDateInRange;
  });

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-gray-900 dark:text-gray-100">
        Admin Dashboard
      </h1>

      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="relative w-full sm:w-1/3 border rounded-lg border-gray-400">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border px-4 py-2 pl-10 rounded-lg bg-white dark:bg-gray-800 dark:text-gray-100"
          />
          <FiSearch className="absolute left-3 top-2/4 transform -translate-y-2/4 text-gray-400 dark:text-gray-300" />
          <div className='absolute p-3 right-3 top-2/4 transform -translate-y-2/4'>
            <kbd className="kbd kbd-sm m-2">ctrl</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </div>
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
              className="border px-4 py-2 rounded-lg border-gray-400 bg-white dark:bg-gray-800 dark:text-gray-100"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-4 py-2 rounded-lg border-gray-400 bg-white dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        </div>
      </div>

      {isUsersLoading ? (
        <p className="text-center text-lg text-gray-700 dark:text-gray-300">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600 dark:bg-blue-800 text-white">
                <th className="py-3 px-6 text-center text-sm font-semibold">Profile Picture</th>
                <th className="py-3 px-6 text-center text-sm font-semibold">Name</th>
                <th className="py-3 px-6 text-center text-sm font-semibold">Email</th>
                <th className="py-3 px-6 text-center text-sm font-semibold">Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-4 px-6 text-center">
                      <img
                        src={user.profilePic}
                        alt={user.name}
                        className="w-12 h-12 mx-auto rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-md hover:scale-105 transition-transform"
                      />
                    </td>
                    <td className="py-4 px-6 text-center text-gray-900 dark:text-gray-100 text-sm font-medium">
                      {user.name}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-900 dark:text-gray-100 text-sm font-medium">
                      {user.email}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-900 dark:text-gray-100 text-sm font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 px-6 text-center text-lg text-gray-700 dark:text-gray-300">
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

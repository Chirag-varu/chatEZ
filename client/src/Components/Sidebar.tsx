import { useEffect, useRef, useState } from 'react';
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
// import { FiMoreVertical } from "react-icons/fi";
// import { Users } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import Options from "./Options";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

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

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = users.filter((user) => {
        const isOnline = showOnlineOnly ? onlineUsers.includes(user._id) : true;
        const isNameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        return isOnline && isNameMatch;
    });

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-white dark:bg-gray-800">
            <div className="border-b border-base-300 w-full p-4 md:p-5 flex flex-col items-center">

                {/* Header */}
                <div className="w-full flex items-center justify-between">
                    <span className="font-medium text-gray-800 dark:text-gray-200">chatEZ</span>
                    {/* <FiMoreVertical className="text-gray-800 dark:text-gray-200 text-lg" /> */}
                    <Options />
                </div>

                {/* Search Input */}
                <div className="relative min-w-full sm:w-2/3 md:w-1/3 mt-3">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full border border-gray-300 px-4 py-2 pl-10 rounded-lg focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 
        focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300
        text-sm sm:text-base"
                    />

                    {/* Search Icon */}
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 text-base sm:text-lg" />

                    {/* Shortcut Keys (Hidden on very small screens) */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 items-center gap-1 hidden md:flex">
                        <kbd className="kbd kbd-sm">Ctrl</kbd>
                        <kbd className="kbd kbd-sm">K</kbd>
                    </div>
                </div>


                {/* Online Users (Hidden on Small Screens) */}
                <div className="mt-3 hidden md:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-sm dark:border dark:border-gray-500 transition-colors"
                        />
                        <span className="text-sm text-gray-800 dark:text-gray-200">Show online only</span>
                    </label>
                    <span className="text-xs text-zinc-500">
                        ({onlineUsers.length - 1} online)
                    </span>
                </div>
            </div>


            <div className="overflow-y-auto w-full py-3">
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 dark:hover:bg-gray-700 transition-all rounded-lg ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300 dark:bg-gray-700 dark:ring-gray-500" : ""
                            }`}
                    >
                        <div className="relative mx-auto lg:mx-0 border-spacing-2 border-slate-800">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.name}
                                className="size-12 object-cover rounded-full dark:border dark:border-gray-500 transition-transform transform hover:scale-105"
                            />
                            {onlineUsers.includes(user._id) && (
                                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full" />
                            )}
                        </div>

                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate text-gray-800 dark:text-gray-200">{user.name}</div>
                            <div className="text-sm text-zinc-400 dark:text-zinc-500">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No online users</div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;

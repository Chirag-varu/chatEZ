import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { FiSearch } from "react-icons/fi";
import { useRef, useState } from "react";
import Options3 from "./Option3";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    // const { messages } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchMessage, setSearchMessage] = useState<string>('');
    const [searchBar, setSearchBar] = useState<boolean>(false);

    const handleSearchMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchMessage(e.target.value);
    }

    // const filterMessages = messages.filter((message) => {
    //     const isMessageMatch = message.text.toLowerCase().includes(searchMessage.toLowerCase());
    //     console.log('====================================');
    //     console.log('isMessageMatch', isMessageMatch);
    //     console.log('====================================');
    //     return isMessageMatch;
    // });

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUser !== null ? 'name' in selectedUser ? selectedUser.profilePic : selectedUser?.groupPic : "/avatar.png"} alt={selectedUser !== null ? 'name' in selectedUser ? selectedUser.name : selectedUser?.groupName : "Chat header"} />
                        </div>
                    </div>

                    {/* User info */}
                    <div>
                        <h3 className="font-medium">{selectedUser !== null ? 'name' in selectedUser ? selectedUser.name : selectedUser?.groupName : "user info"}</h3>
                        <p className="text-sm text-base-content/70 dark:text-white">
                            {selectedUser?._id && onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
                {searchBar && (
                    <div className="relative w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto">
                        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400 transition-all">
                            {/* Search Icon */}
                            <FiSearch className="text-gray-400 dark:text-gray-300 text-base sm:text-lg" />

                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search messages..."
                                value={searchMessage}
                                onChange={handleSearchMessage}
                                className="flex-1 bg-transparent outline-none px-2 text-sm sm:text-base dark:text-gray-100"
                            />

                            {/* Close Button */}
                            <X
                                onClick={() => setSearchBar(false)}
                                className="cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-all"
                            />
                        </div>
                    </div>
                )}

                <div className="flex justify-center items-center gap-6">
                    {/* Close button */}
                    <button onClick={() => setSelectedUser(null)}>
                        <X />
                    </button>

                    {/* More Options */}
                    <Options3 setSearchBar={setSearchBar} />
                </div>
            </div>
        </div>
    );
};
export default ChatHeader;
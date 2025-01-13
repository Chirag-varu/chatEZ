import { useChatStore } from "../store/useChatStore";
import Sidebar from "../Components/Sidebar";
import NoChatSelected from "../Components/NoChatSelected";
import ChatContainer from "../Components/ChatContainer";

const Chat = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200 dark:bg-gray-900">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

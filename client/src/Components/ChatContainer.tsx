import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/Components/ui/scroll-area";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import Options2 from "./Options2";
import { MoreVertical } from "lucide-react";

const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
    } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef<HTMLDivElement>(null);

    const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id);
        }

        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
        setSelectedMessage(null);
    }, [messages]);

    const handleMenuClick = (event: React.MouseEvent, messageId: string) => {
        event.stopPropagation(); // Prevent event bubbling

        const rect = event.currentTarget.getBoundingClientRect();
        setSelectedMessage(selectedMessage === messageId ? null : messageId);
        setMenuPosition({
            top: rect.top + window.scrollY, // Position relative to the page
            left: rect.left + rect.width + 10, // Offset right of the button
        });
    };

    if (isMessagesLoading) {
        return (
            <Card className="flex flex-col h-full w-9/12 dark:bg-gray-800">
                <ChatHeader />
                <CardContent className="flex-1 p-0">
                    <MessageSkeleton />
                </CardContent>
                <CardFooter className="p-0">
                    <MessageInput />
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col h-full w-9/12 dark:bg-gray-800" onClick={() => setSelectedMessage(null)}>
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <ScrollArea className="h-[calc(100vh-180px)] p-4">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message._id}
                                className={`relative chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
                                ref={messageEndRef}
                                onMouseEnter={() => setHoveredMessage(message._id)}
                                onMouseLeave={() => setHoveredMessage(null)}
                            >
                                {/* Avatar */}
                                <div className="chat-image avatar">
                                    <div className="size-10 rounded-full border">
                                        <img
                                            src={
                                                message.senderId === authUser?._id
                                                    ? authUser.profilePic || "/avatar.png"
                                                    : selectedUser?.profilePic || "/avatar.png"
                                            }
                                            alt="profile pic"
                                        />
                                    </div>
                                </div>

                                {/* Message Header (Time) */}
                                <div className="chat-header mb-1">
                                    <time className="text-xs opacity-50 ml-1">
                                        {formatMessageTime(new Date(message.createdAt))}
                                    </time>
                                </div>

                                <div className="flex items-center gap-2 relative">
                                    {/* Hover Icon (⋮) */}
                                    {hoveredMessage === message._id && (message.receiverId === authUser?._id ? null : (
                                        <button
                                            className="p-1 rounded-full hover:bg-gray-300 transition"
                                            onClick={(e: any) => {
                                                setSelectedMessage(selectedMessage === message._id ? null : message._id)
                                                handleMenuClick(e, message._id)
                                            }
                                            }
                                        >
                                            <MoreVertical size={20} className="text-gray-500" />
                                        </button>
                                    ))}

                                    <div>
                                        {/* Message Bubble */}
                                        <div className="chat-bubble flex flex-col">
                                            {message.image && (
                                                <img
                                                    src={message.image}
                                                    alt="Attachment"
                                                    className="sm:max-w-[200px] rounded-md mb-2"
                                                />
                                            )}
                                            {message.text && <p>{message.text}</p>}
                                        </div>
                                    </div>

                                    {hoveredMessage === message._id && (message.receiverId === authUser?._id ? (
                                        <button
                                            className="p-1 rounded-full hover:bg-gray-300 transition"
                                            onClick={(e: any) => {
                                                setSelectedMessage(selectedMessage === message._id ? null : message._id)
                                                handleMenuClick(e, message._id)
                                            }
                                            }
                                        >
                                            <MoreVertical size={20} className="text-gray-500" />
                                        </button>
                                    ) : null)}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Message Options (Positioned Next to Clicked Button) */}
                {selectedMessage && menuPosition && (
                    <div
                        className="absolute bg-gray-800 shadow-md rounded-md p-2 z-10"
                        style={{
                            top: `${menuPosition.top}px`,
                            left: `${menuPosition.left}px`,
                        }}
                    >
                        {messages?.find((m) => m._id === selectedMessage) && (
                            <Options2 message={messages.find((m) => m._id === selectedMessage)!} />
                        )}
                    </div>
                )}

                <MessageInput />
            </div>
        </Card>
    );
};

export default ChatContainer;

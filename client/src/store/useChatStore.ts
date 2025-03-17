import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_MESSAGE_SECRET_KEY;

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  text: string;
  image: string;
  createdAt: string;
}

interface GroupMessage {
  _id: string;
  groupId: string;
  senderId: string;
  text: string;
  message: string;
  image: string;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
  createdAt: string;
}

interface Group {
  _id: string;
  groupName: string;
  Admin: string;
  groupPic: string;
  members: string[];
  messages: string;
  createdAt: string;
}

interface ChatStore {
  messages: Message[];
  groupMessages: GroupMessage[];
  users: User[];
  selectedUser: User | Group | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  getGroupMessages: (groupId: string) => Promise<void>;
  sendMessage: (message: {
    content: string;
    image?: string | ArrayBuffer | null;
  }) => Promise<void>;
  sendGroupMessage: (message: {
    content: string;
    image?: string | ArrayBuffer | null;
  }) => Promise<void>;
  deleteMessage: (messageId: string) => Promise<boolean>;
  deleteGroupMessage: (messageId: string) => Promise<boolean>;
  deleteAllMessages: () => Promise<boolean>;
  deleteAllGroupMessages: () => Promise<boolean>;
  deleteGroup: () => Promise<boolean>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  setSelectedUser: (selectedUser: User | Group | null) => void;
}

const decryptMessage = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const message = bytes.toString(CryptoJS.enc.Utf8);
  return message;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  groupMessages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      if (!res || !res.data) {
        throw new Error("API response is undefined");
      }
      const msg = res.data;

      const decryptMessages = msg.map((obj: any) => {
        return {
          ...obj,
          text: decryptMessage(obj.text),
        };
      });

      set({ messages: decryptMessages });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  getGroupMessages: async (groupId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(
        `group/message/getMessages/${groupId}`
      );

      if (!res || !res.data) {
        throw new Error("API response is undefined");
      }

      const msg = res.data;

      const decryptMessages = msg.map((obj: any) => {
        return {
          ...obj,
          text: decryptMessage(obj.message),
        };
      });

      set({ groupMessages: decryptMessages });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      if (!res || !res.data) {
        console.error("Message sending failed: ", res);
        throw new Error("No response from server");
      }
      const msg = res.data;

      const decryptMessages = {
        ...msg,
        text: decryptMessage(msg.text),
      };

      set({ messages: [...messages, decryptMessages] });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },

  sendGroupMessage: async (messageData) => {
    const { selectedUser, groupMessages } = get();

    if (!selectedUser) {
      toast.error("No Group selected");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `group/message/send/${selectedUser._id}`,
        messageData
      );

      if (!res || !res.data) {
        console.error("Message sending failed: ", res);
        throw new Error("No response from server");
      }
      const msg = res.data;

      const decryptMessages = {
        ...msg,
        text: decryptMessage(msg.message),
      };

      set({ groupMessages: [...groupMessages, decryptMessages] });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },

  deleteMessage: async (messageId: string) => {
    const { messages } = get();
    try {
      await axiosInstance.delete(`/message/delete/${messageId}`);
      const updatedMessages = messages.filter((msg) => msg._id !== messageId);
      set({ messages: updatedMessages });
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return false;
    }
  },

  deleteGroupMessage: async (messageId: string) => {
    const { groupMessages } = get();
    try {
      await axiosInstance.delete(`/group/message/delete/${messageId}`);
      const updatedMessages = groupMessages.filter(
        (msg) => msg._id !== messageId
      );
      set({ groupMessages: updatedMessages });
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return false;
    }
  },

  deleteAllMessages: async () => {
    const { selectedUser } = get();
    if (!selectedUser) return false;

    try {
      const res = await axiosInstance.delete(
        `/message/deleteAll/${selectedUser._id}`
      );
      toast.success(res.data.message);
      set({ messages: [] });
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return false;
    }
  },

  deleteAllGroupMessages: async () => {
    const { selectedUser } = get();
    if (!selectedUser) return false;

    try {
      const res = await axiosInstance.delete(
        `/group/message/deleteAllGroupMessages/${selectedUser._id}`
      );
      toast.success(res.data.message);
      set({ groupMessages: [] });
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return false;
    }
  },

  deleteGroup: async () => {
    const { selectedUser } = get();
    if (!selectedUser) return false;

    try {
      const res = await axiosInstance.delete(
        `/group/deleteGroup/${selectedUser._id}`
      );
      toast.success(res.data.message);
      set({ groupMessages: [] });
      set({ selectedUser: null });
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return false;
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage: Message) => {
      const isMobile = window.innerWidth <= 768;
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      const decryptMessages = {
        ...newMessage,
        text: decryptMessage(newMessage.text),
      };
      toast.success(
        `📩 New message from ${
          "name" in selectedUser ? selectedUser.name : selectedUser.groupName
        }: "${decryptMessages.text}"`,
        {
          position: isMobile ? "top-center" : "bottom-right",
          duration: 4000, // Keeps it visible for 4 seconds
          style: {
            background: "#2d2f33",
            color: "#ffffff",
            borderRadius: "10px",
            padding: "12px",
            fontSize: "14px",
            borderLeft: "5px solid #22c55e", // Green accent
          },
          icon: "💬", // Chat bubble icon
        }
      );

      set({
        messages: [...get().messages, decryptMessages],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_MESSAGE_SECRET_KEY;

interface Message {
  _id: string;
  senderId: string;
  content: string;
  text: string;
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

interface ChatStore {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (message: {
    content: string;
    image?: string | ArrayBuffer | null;
  }) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  setSelectedUser: (selectedUser: User | null) => void;
}

const decryptMessage = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const message = bytes.toString(CryptoJS.enc.Utf8);
  return message;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
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
      console.log('====================================');
      console.log(res);
      console.log('====================================');

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

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage: Message) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      const decryptMessages = {
        ...newMessage,
        text: decryptMessage(newMessage.text),
      };

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

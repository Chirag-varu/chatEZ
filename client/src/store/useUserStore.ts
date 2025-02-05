import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

interface User {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  createdAt: Date;
  // Add any other properties your user object has
}

interface UserStore {
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  getAllUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  selectedUser: null,
  isUsersLoading: false,

  getAllUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/user/getAllUsers");
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
}));

import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

interface User {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  createdAt: Date;
}

interface Admin {
  _id: string;
  name: string;
  email: string;
}

interface UserStore {
  authAdmin: Admin | null;
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isDeletingUser: boolean;
  isCheckingAuth: boolean;
  checkAuthAdmin: () => Promise<boolean>;
  getAllUsers: () => Promise<boolean>;
  deleteUser: (userId: string) => Promise<void>;
  Adminlogout: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  authAdmin: null,
  users: [],
  selectedUser: null,
  isCheckingAuth: true,
  isUsersLoading: false,
  isDeletingUser: false,

  checkAuthAdmin: async () => {
    try {
      const res = await axiosInstance.get("/user/checkAdmin");
      set({ authAdmin: res.data });
      return true;
    } catch (error: any) {
      console.log("Error in checkAuth:", error);
      set({ authAdmin: null });
      return false;
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  Adminlogout: async () => {
    try {
      await axiosInstance.post("/user/Adminlogout");
      set({ authAdmin: null });
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },

  getAllUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/user/getAllUsers");
      set({ users: res.data });
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isUsersLoading: false });
    }
  },

  deleteUser: async (userId: string) => {
    set({ isDeletingUser: true });
    try {
      await axiosInstance.delete(`/user/deleteUser/${userId}`);
      set((state) => ({
        users: state.users.filter((user) => user._id !== userId),
      }));
      toast.success("User deleted successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isDeletingUser: false });
    }
  },
}));

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import io, { type Socket } from "socket.io-client";
// import io from "socket.io-client";

// Define the types for the state
interface AuthUser {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
  createdAt: string;
  // Add other fields that are part of the `authUser` object if needed
}

interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isVerify_OTP: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isUpdatingPassword: boolean;
  isDeletingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: typeof Socket | null;

  checkAuth: () => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  sendOTP: (data: { email: string }) => Promise<boolean>;
  verify_otp: (data: { email: string; otp: string }) => Promise<boolean>;
  verify_otp2: (data: { email: string; otp: string }) => Promise<boolean>;
  login: (data: { email: string; password: string }) => Promise<void>;
  adminLogin: (data: { email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: { name: string; profilePic: string }) => Promise<void>;
  updatePassword: (data: { email: string; password: string }) => Promise<boolean>;
  deleteProfile: (data: { email: string }) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isVerify_OTP: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isUpdatingPassword: false,
  isDeletingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error: any) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      await axiosInstance.post("/auth/signup", data);
      toast.success("OTP send successfully");
      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  sendOTP: async (data) => {
    set({ isVerify_OTP: true });
    try {
      await axiosInstance.post("/auth/sendOTP", data);
      toast.success("OTP verified successfully");
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isVerify_OTP: false });
    }
  },

  verify_otp: async (data: { email: string; otp: string }) => {
    set({ isVerify_OTP: true });
    try {
      const res = await axiosInstance.post("/auth/verify-otp", data);
      set({ authUser: res.data });
      toast.success("OTP verified successfully");
      return true;
      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isVerify_OTP: false });
    }
  },

  verify_otp2: async (data: { email: string; otp: string }) => {
    set({ isVerify_OTP: true });
    try {
      await axiosInstance.post("/auth/verify-otp2", data);
      toast.success("OTP verified successfully");
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isVerify_OTP: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  adminLogin: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/adminLogin", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      return true;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  updatePassword: async (data) => {
    set({ isUpdatingPassword: true });
    try {
      await axiosInstance.put("/auth/update-password", data);
      toast.success("Password updated successfully");
      return true;
    } catch (error: any) {
      console.log("error in update password:", error);
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isUpdatingPassword: false });
    }
  },

  deleteProfile: async (data) => {
    set({ isDeletingProfile: true });
    try {
      await axiosInstance.delete("/auth/delete-account", { data });
      set({ authUser: null });
      toast.success("Profile deleted successfully");
    } catch (error: any) {
      console.error("Error in deleting profile: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isDeletingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket && socket.connected) socket.disconnect();
  },
  
}));

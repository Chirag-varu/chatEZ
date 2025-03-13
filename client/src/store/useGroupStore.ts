import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

interface Group {
  _id: string;
  groupName: string;
  Admin: string;
  groupPic: string;
  members: string[];
  messages: string;
  createdAt: string;
}

interface GroupStore {
  groups: Group[];
  selectedGroup: Group | null;
  isGroupsLoading: boolean;
  isMessagesLoading: boolean;

  createGroup: (data: {
    groupName: string;
    members: string[];
    Admin: string;
  }) => Promise<void>;
  getGroups: (id: string) => Promise<void>;
}

export const useGroupStore = create<GroupStore>((set) => ({
  groups: [],
  selectedGroup: null,
  isGroupsLoading: false,
  isMessagesLoading: false,

  createGroup: async (data) => {
    try {
      const res = await axiosInstance.post("/group/createGroup", data);
      set((state) => ({
        groups: [...state.groups, res.data],
      }));

      if (res) toast.success("Group created successfully");
      else toast.error("Failed to create group");
    } catch (error: any) {
      toast.error("Failed to create group", error.response.data.message);
    }
  },

  getGroups: async (id) => {
    set({ isGroupsLoading: true });
    try {
      const res = await axiosInstance.get(`/group/getGroups/${id}`);
      console.log("====================================");
      console.log(res);
      console.log("====================================");
      set({ groups: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isGroupsLoading: false });
    }
  },
}));

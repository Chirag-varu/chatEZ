"use client";

import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { BadgePlus } from "lucide-react";
import { useId, useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useGroupStore } from "../store/useGroupStore";
import Select from "react-select";
// import toast from "react-hot-toast";

interface Modal2Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (groupName: string, selectedUsers: string[]) => void;
}

export default function Modal2({ isOpen, onClose, onConfirm }: Modal2Props) {
    const id = useId();
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const { getUsers, users } = useChatStore();
    const { authUser } = useAuthStore();
    // const { selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { createGroup } = useGroupStore();

    // Fetch users from API
    useEffect(() => {
        if (!isOpen) return;
        getUsers();
    }, []);

    const handleCreateGroup = async () => {
        if (groupName.trim() === "" || selectedUsers.length === 0) return;
        await createGroup({ groupName, members: selectedUsers, Admin: authUser?._id || "" });
        onConfirm(groupName, selectedUsers);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <div className="flex flex-col items-center gap-2">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full border">
                        <BadgePlus className="opacity-80" size={16} />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">Create Group</DialogTitle>
                        <DialogDescription className="sm:text-center">
                            Enter a group name and select members to add.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5">
                    <div className="*:not-first:mt-2">
                        <Label htmlFor={id}>Group Name</Label>
                        <Input
                            id={id}
                            type="text"
                            placeholder="Enter Group Name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>

                    {/* User Selection */}
                    <div className="*:not-first:mt-2">
                        <Label>Select Users</Label>
                        <Select
                            isMulti
                            options={users.map(user => ({ value: user._id, label: user.name }))}
                            onChange={(selectedOptions) => setSelectedUsers(selectedOptions.map(opt => opt.value))}
                            placeholder="Select members..."
                            isLoading={users.length === 0}
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="flex-1 bg-black/10 hover:border-black/8" onClick={onClose}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="button" className="flex-1" disabled={groupName === "" || selectedUsers.length === 0} onClick={handleCreateGroup}>
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

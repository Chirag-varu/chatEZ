"use client";

import { useState } from "react";
import { MoreVertical, Search, Trash, X, MessageSquareOff } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { useChatStore } from "../store/useChatStore";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import toast from "react-hot-toast";

export default function Options3({ setSearchBar }: { setSearchBar: (value: boolean) => void }) {
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState<"clearChat" | "deleteGroup" | null>(null);
    const { setSelectedUser, deleteAllMessages, selectedUser, deleteAllGroupMessages, deleteGroup } = useChatStore();

    const handleConfirmAction = async () => {
        try {
            let res = false;
            if (dialogType === "clearChat") {
                res = selectedUser !== null
                    ? "name" in selectedUser
                        ? await deleteAllMessages()
                        : await deleteAllGroupMessages()
                    : false;
            } else if (dialogType === "deleteGroup") {
                res = await deleteGroup();
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }

            if (!res) {
                toast.error("Server TimeOut: try again later.");
            }
        } catch (error: any) {
            toast.error("Action failed.");
        } finally {
            setDialogType(null);
        }
    };

    const handleFeature = () => {
        toast("This feature is not available yet!");
        setSearchBar(false); // make it true to view search bar
    }

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className="group dark:bg-gray-900" variant="outline" size="icon" aria-label={open ? "Close options" : "Open options"}>
                        <MoreVertical className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 dark:bg-gray-900" align="end">
                    <div className="grid gap-4">
                        <Button
                            variant="ghost"
                            className="w-full justify-start dark:hover:bg-gray-800"
                            onClick={handleFeature}
                        >
                            <Search className="mr-2 h-4 w-4" />
                            <span>Search Messages</span>
                        </Button>
                        <Button
                            variant="ghost"
                            className="w-full justify-start dark:hover:bg-gray-800"
                            onClick={() => setSelectedUser(null)}
                        >
                            <X className="mr-2 h-4 w-4" />
                            <span>Close Chat</span>
                        </Button>
                        <Button
                            variant="destructive"
                            className="w-full justify-start dark:hover:bg-gray-800"
                            onClick={() => setDialogType("clearChat")}
                        >
                            <MessageSquareOff className="mr-2 h-4 w-4" />
                            <span>Clear Chat</span>
                        </Button>

                        {selectedUser && "groupName" in selectedUser && (
                            <Button
                                variant="destructive"
                                className="w-full justify-start dark:hover:bg-gray-800"
                                onClick={() => setDialogType("deleteGroup")}
                            >
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Delete Group</span>
                            </Button>
                        )}
                    </div>
                </PopoverContent>
            </Popover>

            {/* Confirmation Modal */}
            <Dialog open={dialogType !== null} onOpenChange={() => setDialogType(null)}>
                <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>
                            {dialogType === "clearChat" ? "Clear Chat" : "Delete Group"}
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {dialogType === "clearChat"
                            ? "This will permanently delete all messages in this chat. This action cannot be undone."
                            : "This will permanently delete the group and all its messages. This action cannot be undone."}
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogType(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmAction}>
                            {dialogType === "clearChat" ? "Yes, Clear Chat" : "Yes, Delete Group"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

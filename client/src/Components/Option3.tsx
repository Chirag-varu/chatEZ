"use client";

import { useState } from "react";
import { MoreVertical, Search, Trash, X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { useChatStore } from "../store/useChatStore";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import toast from "react-hot-toast";

export default function Options3({ setSearchBar }: { setSearchBar: (value: boolean) => void }) {
    const [open, setOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { setSelectedUser, deleteAllMessages } = useChatStore();

    const handleDeleteAllMessages = async () => {
        try {
            const res = await deleteAllMessages();
            if (!res) {
                toast.error("Server TimeOut: try after some time");
            }
        } catch (error) {
            toast.error("Failed to clear chat");
        } finally {
            setIsDialogOpen(false);
        }
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
                            onClick={() => setSearchBar(true)}
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
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Clear Chat</span>
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Confirmation Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                <DialogContent aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        This will permanently delete all messages in this chat. This action cannot be undone.
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteAllMessages}
                        >
                            Yes, Clear Chat
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

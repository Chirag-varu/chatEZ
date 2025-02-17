"use client"

import { useState } from "react"
import { MoreVertical, User, Users } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover"
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore";

export default function Options() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { authUser } = useAuthStore();

    const handleCreateGroup = () => {
        navigate(`/joinRoom/${authUser?.name}`);
    }

    return (
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
                        onClick={() => {
                            navigate("/profile");
                        }}
                    >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start dark:hover:bg-gray-800  "
                        onClick={handleCreateGroup}
                    >
                        <Users className="mr-2 h-4 w-4" />
                        <span>Create Group</span>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}


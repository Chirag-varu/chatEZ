import { useState } from "react";
import { Clipboard, Reply, Trash, Check } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import toast from "react-hot-toast";
import { useChatStore } from "@/store/useChatStore";

interface Message {
  _id: string
  senderId: string
  receiverId: string
  content: string
  text: string
  image: string
  createdAt: string
}

export default function MessageOptions({ message }: { message: Message }) {
  const { deleteMessage } = useChatStore();
  const [copying, setCopying] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopying(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopying(false), 1000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  }

  const handleDelete = async () => {
    try {
      const deleted = await deleteMessage(message._id);
      if (deleted) {
        toast.success("Message deleted successfully");
      } else {
        toast.error("Failed to delete message");
      }
    } catch (err) {
      toast.error("Failed to delete message");
      console.log(err);
    }
  };

  const handleReply = () => {
    toast("This feature is not available yet");
  }

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={handleCopy} className="flex items-center gap-1.5">
              {copying ? <Check size={16} className="text-green-500" /> : <Clipboard size={16} />}
              Copy
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy message text</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={handleReply} className="flex items-center gap-1.5">
              <Reply size={16} />
              Reply
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reply to this message</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive" size="sm" onClick={handleDelete} className="flex items-center gap-1.5">
              <Trash size={16} />
              Delete
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete this message</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

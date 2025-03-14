import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { sendMessage, sendGroupMessage, selectedUser } = useChatStore();

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e: any) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
            let response: any;

            if (selectedUser !== null) {
                if ("name" in selectedUser) {
                    response = await sendMessage({
                        content: text.trim(),
                        image: imagePreview,
                    });
                } else {
                    response = await sendGroupMessage({
                        content: text.trim(),
                        image: imagePreview,
                    });
                }
            } else {
                toast("Something went wrong!");
                return;
            }

            console.log("handleSendMessage Response:", response); // Debugging step

            // Assuming success if no error is thrown

            // Clear form
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error: any) {
            console.error("Failed to send message:", error);
            toast.error(error.message || "Failed to send message");
        }
    };

    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={typeof imagePreview === "string" ? imagePreview : undefined}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center dark:text-black"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <Input type="file" accept="image/*" className="hidden dark:bg-zinc-900" ref={fileInputRef} onChange={handleImageChange} />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className={`hidden dark:bg-zinc-900 bg-slate-100 sm:flex ${imagePreview ? "text-emerald-500" : ""}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image className="h-4 w-4" />
                    </Button>
                    <Input
                        type="text"
                        className="flex-1 dark:bg-zinc-900"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <Button type="submit" size="icon" className="dark:bg-zinc-200" disabled={!text.trim() && !imagePreview}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
    );
};

export default MessageInput;

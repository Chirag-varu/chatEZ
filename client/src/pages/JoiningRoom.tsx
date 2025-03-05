import { useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

const JoiningRoom = () => {
    const [url, setUrl] = useState("");

    const handleJoinRoom = () => {
        if (url.trim() !== "") {
            window.location.href = url;
        } else {
            alert("Please enter a valid URL!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-black dark:text-white px-6 transition-colors duration-300">
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">🔗 Join Room</h2>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                    Enter the room URL to join the room.
                </p>

                <div className="flex flex-col gap-4">
                    <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="http://chat.ez/joinRoom/roomID"
                        className="w-full px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                        onClick={handleJoinRoom}
                        className="w-full px-6 py-2 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
                    >
                        Join Room
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default JoiningRoom;

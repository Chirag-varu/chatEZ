import logo from "../assets/favicon_T.png";

const NoChatSelected = () => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 dark:bg-gray-800/50">
            <div className="max-w-md text-center space-y-6">
                {/* Icon Display */}
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div
                            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce dark:bg-primary/20"
                        >
                            <img src={logo} alt="chatEZ" className="w-10 h-10" />
                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to chatEZ!</h2>
                <p className="text-base-content/60 dark:text-gray-400">
                    Select a conversation from the sidebar to start chatting
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected;

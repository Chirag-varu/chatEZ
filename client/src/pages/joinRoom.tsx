import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
// import { Button } from "@/Components/ui/button";
import { ZegoConfig } from "@/lib/zegoConfig";
import { useEffect, useRef } from "react";
// import { ArrowLeft } from "lucide-react"
// import { useNavigate } from "react-router-dom";

const JoinRoom = () => {
    const { authUser } = useAuthStore();
    const { Host } = useParams<{ Host: string }>();
    const containerRef = useRef<HTMLDivElement | null>(null);
    // const navigate = useNavigate();

    const randomID = () => {
        return Math.floor(10000 + Math.random() * 90000).toString();
    };

    // const handleGoBack = () => {
    //     navigate("/chat");
    // }

    useEffect(() => {
        const appID = ZegoConfig.appID;
        const serverSecret = ZegoConfig.serverSecret;
        const roomCode = randomID();
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomCode,
            authUser?._id || randomID(),
            authUser?.name || "Guest"
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: containerRef.current, // Attach to div
            sharedLinks: [
                {
                    name: "Copy link",
                    url:
                        window.location.protocol +
                        "//" +
                        window.location.host +
                        window.location.pathname +
                        "?roomID=" +
                        roomCode,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: false,
            enableUserSearch: true,
        });

        return () => zp.destroy(); // Cleanup to prevent memory leaks

    }, [Host, authUser]); // Only run when `roomCode` or `authUser` changes

    return (
        <>
            {/* <div className="min-h-screen dark:bg-gray-900 bg-gray-50 pt-16 flex flex-col items-center justify-center">
                <div>
                    <Button onClick={handleGoBack} className="my-2 ml-2 flex items-center gap-2 hover:bg-black hover:text-white dark:bg-gray-800" variant="outline">
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </Button>
                </div>
            </div> */}
            <div ref={containerRef} className="w-full h-screen" />
        </>
    );
};

export default JoinRoom;

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { ZegoConfig } from "@/lib/zegoConfig";
import { useEffect, useRef } from "react";

const JoinRoom = () => {
    const { authUser } = useAuthStore();
    const { roomID } = useParams<{ roomID: string }>(); // Get roomID from URL
    const containerRef = useRef<HTMLDivElement | null>(null);

    const randomID = () => Math.floor(10000 + Math.random() * 90000).toString();

    useEffect(() => {
        if (!roomID || !authUser?.name) {
            console.log('====================================');
            console.log("roomID: ", roomID);
            console.log("auth name: ", authUser?.name);
            console.log('====================================');
        }

        const appID = ZegoConfig.appID;
        const serverSecret = ZegoConfig.serverSecret;

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            (roomID ? roomID.toString() : "321476"), // Use the same roomID for all participants
            authUser?._id || randomID(),
            authUser?.name || "Guest"
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: containerRef.current,
            sharedLinks: [
                {
                    name: "Copy link",
                    url: `${window.location.origin}/joinRoom/${roomID}`,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton: false,
            enableUserSearch: true,
        });

        return () => {
            zp.destroy();
            containerRef.current = null;
        };

    }, [roomID, authUser]);

    return <div ref={containerRef} className="w-full h-screen" />;
};

export default JoinRoom;

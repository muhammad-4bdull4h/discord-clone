import { Hash } from "lucide-react";
import React from "react";
import MobileToggle from "../MobileToggle";
import UserAvatar from "../UserAvatar";
import SocketIndicator from "../SocketIndicator";
import ChatVideoButton from "./ChatVideoButton";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversations";
  imageUrl?: string;
}

function ChatHeader({ serverId, name, type, imageUrl }: ChatHeaderProps) {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversations" && (
        <UserAvatar src={imageUrl} className="h-8 w-8 mr-2 md:h-8 md:w-8" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
      <div className="ml-auto flex items-center">
        {type === "conversations" && <ChatVideoButton />}
        {process.env.ENVIRONMENT !== "production" ? <SocketIndicator /> : ""}
      </div>
    </div>
  );
}

export default ChatHeader;

"use client";
import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import ActionToolTip from "./ActionToolTip";
import { ModelType, useModel } from "@/hooks/use-model-store";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const IconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

function ServerChannel({ channel, server, role }: ServerChannelProps) {
  const router = useRouter();
  const params = useParams();
  const { onOpen } = useModel();

  const Icon = IconMap[channel.type];
  const onClick = () => {
    router.push(`/servers/${params.serverId}/channels/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModelType) => {
    e.stopPropagation();
    onOpen(action, { channel, server });
  };
  return (
    <div
      onClick={onClick}
      className={cn(
        "group px-2 cursor-pointer py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionToolTip side="top" align="center" label="Edit">
            <Edit
              onClick={(e) => onAction(e,"editChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionToolTip>
          <ActionToolTip side="top" align="center" label="Delete">
            <Trash
              onClick={(e) => onAction(e,"deleteChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionToolTip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="hidden ml-auto group-hover:block w-4 h-4 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
      )}
    </div>
  );
}

export default ServerChannel;

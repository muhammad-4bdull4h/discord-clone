"use client";
import { ChannelType, MemberRole } from "@prisma/client";
import React from "react";
import { ServerWithMembersWithProfile } from "../../types";
import ActionToolTip from "./ActionToolTip";
import { Plus, Settings } from "lucide-react";
import { useModel } from "@/hooks/use-model-store";

interface ServerSectionProps {
  label: string;
  role: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfile;
}

function ServerSection({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerSectionProps) {
  const { onOpen } = useModel();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>

      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionToolTip side="top" align="center" label="Create a channel">
          <div
            onClick={() => onOpen("createChannel", { channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="w-4 h-4" />
          </div>
        </ActionToolTip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionToolTip side="top" align="center" label="Manage Members">
          <div
            onClick={() => onOpen("members", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="w-4 h-4" />
          </div>
        </ActionToolTip>
      )}
    </div>
  );
}

export default ServerSection;

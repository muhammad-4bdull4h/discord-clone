"use client";
import React from "react";
import { MemberRole } from "@prisma/client";
import { ServerWithMembersWithProfile } from "../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useModel } from "@/hooks/use-model-store";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfile;
  role: MemberRole;
  mobile?: boolean;
}

function ServerHeader({ server, role, mobile }: ServerHeaderProps) {
  const { onOpen } = useModel();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={`focus:outline-none ${mobile ? "mt-5" : ""}`}
      >
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 text-xs font-medium text-black dark:text-neutral-400
      space-y-[2px]"
      >
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server: server })}
            className="text-indigo-600 px-3 py-2 cursor-pointer dark:text-indigo-400"
          >
            Invite peopel
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className="cursor-pointer px-3 py-3 text-sm "
          >
            Server Settings
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { server })}
            className="cursor-pointer px-3 py-3 text-sm "
          >
            Manage Members
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel", { server })}
            className="cursor-pointer px-3 py-3 text-sm "
          >
            Create Channels
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("deleteServer", { server })}
            className="cursor-pointer text-rose-500 px-3 py-3 text-sm "
          >
            Delete Server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("leaveServer", { server })}
            className="cursor-pointer text-rose-500 px-3 py-3 text-sm "
          >
            Leave Server
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ServerHeader;

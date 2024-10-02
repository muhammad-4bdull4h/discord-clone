"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModel } from "@/hooks/use-model-store";
import qs from "query-string";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { ServerWithMembersWithProfile } from "../../../types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
const roleIconMap = {
  ADMIN: <ShieldAlert className="h-4 2-4  text-red-500" />,
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
};

function MembersServerModal() {
  const { type, isOpen, onClose, onOpen, data } = useModel();

  const [loadingId, setloadingId] = useState("");
  const router = useRouter();

  const isModelOpen = isOpen && type === "members";
  const { server } = data as { server: ServerWithMembersWithProfile };

  const [loading, setLoading] = useState(false);

  const onKick = async (memberId: string) => {
    setloadingId(memberId);
    try {
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const res = await axios.delete(url);

      router.refresh();
      onOpen("members", { server: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      setloadingId("");
    }
  };

  const onRoleChnge = async (memberId: string, role: MemberRole) => {
    setloadingId(memberId);
    try {
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const res = await axios.patch(url, { role });
      router.refresh();
      onOpen("members", { server: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      setloadingId("");
    }
  };

  return (
    <div className="model server">
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Manage Menmbers
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              {server?.members?.length} members
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-8 max-h-[420px] pr-6">
            {server?.members?.map((member) => (
              <div
                key={member.profile?.id}
                className="flex items-center gap-x-2 mb-6"
              >
                <UserAvatar src={member.profile?.imageUrl} />
                <div className="flex flex-col gap-y-1">
                  <div className="text-xs gap-x-1 font-semibold flex items-center">
                    {member.profile?.name}
                    {roleIconMap[member?.role]}
                  </div>
                  <p className="text-xs text-zinc-500">
                    {member.profile?.email}
                  </p>
                </div>
                {server.profileId !== member.profileId &&
                  loadingId !== member.id && (
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4 text-zinc-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center">
                              <ShieldQuestion className="w-4 h-4 mr-2" />
                              <span>role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    onRoleChnge(member.id, "GUEST")
                                  }
                                >
                                  <Shield className="h-4 w-4 mr-2" />
                                  Guest
                                  {member.role === "GUEST" && (
                                    <Check className="h-4 w-4 ml-auto" />
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    onRoleChnge(member.id, "MODERATOR")
                                  }
                                >
                                  <ShieldCheck className="h-4 w-4 mr-2" />
                                  Moderator
                                  {member.role === "MODERATOR" && (
                                    <Check className="h-4 w-4 ml-auto" />
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onKick(member.id)}>
                            <Gavel className="h-w w-4 mr-2" />
                            Kick
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                {loadingId === member.id && (
                  <Loader2 className="animate-spin text-zinc-500 ml-auto  w-4 h-4" />
                )}
              </div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MembersServerModal;

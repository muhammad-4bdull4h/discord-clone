"use client";
import React from "react";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Video, VideoOff } from "lucide-react";
import ActionToolTip from "../ActionToolTip";

function ChatVideoButton() {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isVideo = searchParams?.get("video");
  const Icon = isVideo ? VideoOff : Video;
  const toolTipLabel = isVideo ? "End video call" : "Start video call";

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathName || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  };
  return (
    <ActionToolTip side="bottom" label={toolTipLabel}>
      <div onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
      </div>
    </ActionToolTip>
  );
}

export default ChatVideoButton;

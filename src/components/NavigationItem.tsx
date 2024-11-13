"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import ActionToolTip from "./ActionToolTip";
import { cn } from "@/lib/utils";
import Image from "next/image";

function NavigationItem({
  id,
  name,
  imageUrl,
}: {
  id: string;
  name: string;
  imageUrl: string;
}) {
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionToolTip side="right" align="center" label={name}>
      <div onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId !== id && "group-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden ",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image src={imageUrl} alt="channel" fill />
        </div>
      </div>
    </ActionToolTip>
  );
}

export default NavigationItem;
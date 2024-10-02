"use client";
import { Plus } from "lucide-react";
import React from "react";
import ActionToolTip from "./ActionToolTip";
import { useModel } from "@/hooks/use-model-store";

function NavigationAction() {
  const { onOpen } = useModel();
  return (
    <div className="">
      <ActionToolTip side="right" align="center" label="Add a server">
        <div
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div className="flex group mx-3 h-[48px]  w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              size={25}
              className="group-hover:text-white group transition text-emerald-500"
            />
          </div>
        </div>
      </ActionToolTip>
    </div>
  );
}

export default NavigationAction;

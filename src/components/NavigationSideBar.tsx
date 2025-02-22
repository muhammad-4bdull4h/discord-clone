import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import NavigationAction from "./NavigationAction";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import NavigationItem from "./NavigationItem";
import { ModeToggle } from "./mode-toggel";
import { UserButton } from "@clerk/nextjs";

async function NavigationSideBar() {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="space-y-4 flex flex-col text-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div className="mb-6" key={server.id}>
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex flex-col items-center gap-y-4 ">
        <ModeToggle />
        <UserButton appearance={
          {
            elements:{
              avatarBox:"h-[48px] w-[48px]"
            }
          }
        } />
      </div>
    </div>
  );
}

export default NavigationSideBar;

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Message } from "@prisma/client";
import { Item } from "@radix-ui/react-dropdown-menu";
import { NextResponse } from "next/server";

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Un Authorized", { status: 401 });
    }
    if (!channelId) {
      return new NextResponse("Channel Id missing", { status: 404 });
    }

    let messages: Message[] = [];

    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        where: {
          channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }

    return NextResponse.json(
      {
        Item: messages,
        nextCursor,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("FETCHING_MESSAGES_ERROR_IN_/api/messages", error);
    return new NextResponse("Internel error", { status: 500 });
  }
}

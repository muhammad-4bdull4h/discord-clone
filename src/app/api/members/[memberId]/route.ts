import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Rewind } from "lucide-react";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("unAuthorized Request", { status: 400 });
    }

    if (!serverId) {
      return new NextResponse("sever id missing", { status: 404 });
    }

    if (!params.memberId) {
      return new NextResponse("member id missing", { status: 404 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("MMembers id patch", error);
    return new NextResponse("unAuthorized Request", { status: 400 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("unAuthorized Request", { status: 400 });
    }

    if (!serverId) {
      return new NextResponse("sever id missing", { status: 404 });
    }

    if (!params.memberId) {
      return new NextResponse("member id missing", { status: 404 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("MMembers id DELETE", error);
    return new NextResponse("unAuthorized Request", { status: 400 });
  }
}

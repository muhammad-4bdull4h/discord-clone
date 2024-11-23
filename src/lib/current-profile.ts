import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }
  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });
  const user = await currentUser();
  if (profile?.imageUrl !== user?.imageUrl) {
    const updatedProfile = await db.profile.update({
      where: {
        userId,
      },
      data: {
        imageUrl: user?.imageUrl,
      },
    });
    return updatedProfile;
  } else {
    return profile;
  }
};

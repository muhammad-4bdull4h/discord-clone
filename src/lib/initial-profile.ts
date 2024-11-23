import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "./db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return auth().redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (profile) {
    if (user.imageUrl !== profile.imageUrl) {
      const updatedProfile = await db.profile.update({
        where: {
          userId: user.id,
        },
        data: {
          imageUrl: user.imageUrl,
        },
      });
      return updatedProfile;
    } else {
      return profile;
    }
  }
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  return newProfile;
};

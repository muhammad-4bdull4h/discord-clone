// global.d.ts
import { PrismaClient } from "@prisma/client";

declare global {
  /* eslint-disable no-var */
  var prisma: PrismaClient | undefined;
}

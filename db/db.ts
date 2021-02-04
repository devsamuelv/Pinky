import { PrismaClient } from "@prisma/client";
import { Blocklist } from "./Commands/Blocklist/Blocklist";
import { Freeze } from "./Commands/Freeze/Freeze";

export class db {
  static prisma = new PrismaClient();
  static freeze = new Freeze();
  static blocklist = new Blocklist();
}

import { PrismaClient } from "@prisma/client";
import { Blocklist } from "./Commands/Blocklist/Blocklist";
import { Freeze } from "./Commands/Freeze/Freeze";
import { Ignore } from "./Commands/Ignore/Ignore";
import { watch } from "./Commands/watch/watch";

export class db {
  static prisma = new PrismaClient();
  static freeze = new Freeze();
  static blocklist = new Blocklist();
  static ignore = new Ignore();
  static watch = new watch();
}

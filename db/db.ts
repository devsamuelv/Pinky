import { PrismaClient } from "@prisma/client";
import { Blocklist } from "./Commands/Blocklist";
import { Freeze } from "./Commands/Freeze";
import { Ignore } from "./Commands/Ignore";
import { List } from "./Commands/List";
import { Status } from "./Commands/Status";
import { watch } from "./Commands/watch/watch";

export class db {
	static prisma = new PrismaClient();
	static freeze = new Freeze();
	static blocklist = new Blocklist();
	static ignore = new Ignore();
	static watch = new watch();
	static list = new List();
	static status = new Status();
}

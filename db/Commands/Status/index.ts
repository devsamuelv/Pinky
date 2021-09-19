import { watch_event } from ".prisma/client";
import { db } from "../../db";

export class Status {
	public Create = async (_data: watch_event) =>
		await db.prisma.watch_event.create({
			data: _data,
		});
}

import { db } from "../../db";
import { Rec } from "../../types/List";

export class List {
	// Create List Record
	public Rec = (rec: Rec) =>
		new Promise(async (resolve) => {
			const _result = await db.prisma.list.create({
				data: rec,
			});

			resolve(_result);
		});
}

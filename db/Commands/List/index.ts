import { db } from "../../db";
import { Rec } from "../../types/List";

export class List {
	// Create List Record
	public Rec = (rec: Rec) =>
		new Promise<Rec>(async (resolve) => {
			const _result = await db.prisma.list.create({
				data: rec,
			});

			resolve(_result);
		});

	public Get = (content: string) =>
		new Promise<Rec[]>(async (resolve) => {
			const _result = await db.prisma.list.findMany({
				where: {
					message: content,
				},
			});

			resolve(_result);
		});
}

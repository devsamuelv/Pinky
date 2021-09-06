import { db } from "../../db";

// cooldown will occur every time a user cusses the cooldown time will increase 10 seconds
export class cooldown {
	public add = async (id: string, until: Date, reason: string) =>
		await db.prisma.cooldown.update({
			data: {
				id,
				reason,
				until,
			},
			where: {
				id,
			},
		});
}

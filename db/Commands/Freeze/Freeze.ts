import { db } from "../../db";

export class Freeze {
  public Add = (user: string) =>
    new Promise(async (resolve) => {
      const doc = await db.prisma.frozen.create({
        data: {
          username: user,
        },
      });

      resolve(doc);
    });

  public Remove = (user: string) =>
    new Promise(async (resolve) => {
      const doc = db.prisma.frozen.delete({
        where: {
          username: user,
        },
      });

      resolve(doc);
    });

  public Get = async () =>
    new Promise<IFrozenUser[]>(async (resolve) => {
      resolve(await db.prisma.frozen.findMany());
    });
}

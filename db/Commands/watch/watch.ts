import { db } from "../../db";
import { IWatch } from "../../types/Watch";

export class watch {
  public Add = (id: string) =>
    new Promise(async (resolve) => {
      const doc = await db.prisma.watch.create({
        data: {
          id: `${id}`,
        },
      });
      resolve(doc);
    });

  public Remove = (id: string) =>
    new Promise(async (resolve) => {
      const doc = await db.prisma.watch.delete({
        where: {
          id: `${id}`,
        },
      });
      resolve(doc);
    });

  public Get = () =>
    new Promise<IWatch[]>(async (resolve) => {
      const docs = await db.prisma.watch.findMany();
      resolve(docs);
    });
}

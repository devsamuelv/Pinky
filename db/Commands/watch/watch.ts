import { db } from "../../db";
import { IWatch } from "../../types/Watch";

export class watch {
  public Add = (tag: string) =>
    new Promise(async (resolve) => {
      const doc = await db.prisma.watch.create({
        data: {
          UsernameAndTag: `${tag}`,
        },
      });
      resolve(doc);
    });

  public Remove = (tag: string) =>
    new Promise(async (resolve) => {
      const doc = await db.prisma.watch.delete({
        where: {
          UsernameAndTag: `${tag}`,
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

import { v4 } from "uuid";
import { db } from "../../db";

class History {
  public Add = (word: string, username: string) =>
    new Promise(async (resolve) => {
      const doc = await db.prisma.history.create({
        data: {
          id: v4(),
          message: word,
          username: username,
        },
      });

      resolve(doc);
    });

  public Get = (username: string) =>
    new Promise<IHistoryEntry[]>(async (resolve) => {
      const docs = await db.prisma.history.findMany({
        where: {
          username: {
            equals: username,
            mode: "insensitive",
          },
        },
      });

      const keys = Object.keys(docs);

      for (var i = 0; i != docs.length; i++) {
        const doc: any = docs[i];

        keys.map(() => {
          if (doc.id) {
            delete doc.id;
          }
        });
      }

      resolve(docs);
    });
}

export class Blocklist {
  public History = new History();

  public Add = (word: string) =>
    new Promise<IBlockedWord>(async (resolve) => {
      const doc = await db.prisma.blocklist.create({
        data: {
          word: word,
        },
      });

      resolve(doc);
    });

  public Remove = (word: string) =>
    new Promise<IBlockedWord>(async (resolve) => {
      const doc = await db.prisma.blocklist.delete({
        where: {
          word: word,
        },
      });

      resolve(doc);
    });

  public Get = () =>
    new Promise<IBlockedWord[]>(async (resolve) => {
      const docs = await db.prisma.blocklist.findMany();

      resolve(docs);
    });
}

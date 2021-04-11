import { db } from "../../db";
import { IgnoreChannel } from "../../types/Ignore";

export class Ignore {
  public Add = (id: string) =>
    new Promise<IgnoreChannel>((resolve) => {
      const doc = db.prisma.ignore.create({
        data: {
          channelId: id,
        },
      });

      resolve(doc);
    });

  public Get = () =>
    new Promise<IgnoreChannel[]>((resolve) => {
      const docs = db.prisma.ignore.findMany();

      resolve(docs);
    });

  public Remove = (id: string) =>
    new Promise<IgnoreChannel>((resolve) => {
      const doc = db.prisma.ignore.delete({
        where: {
          channelId: id,
        },
      });

      resolve(doc);
    });
}

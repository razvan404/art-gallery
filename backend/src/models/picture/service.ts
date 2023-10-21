import { db } from "../../utils/database";
import { type Picture } from "./model";

export const findAll = async (): Promise<Picture[]> => {
  return await db.picture.findMany({
    select: {
      id: true,
      createdAt: true,
      title: true,
      url: true,
      authorId: true,
      typeId: true,
    },
  });
};

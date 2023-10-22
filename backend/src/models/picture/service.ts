import { db } from "../../utils/database";
import { type Picture, type PictureMini } from "./model";

export const findAll = async (): Promise<Picture[]> => {
  return await db.picture.findMany({
    select: {
      id: true,
      createdAt: true,
      title: true,
      description: true,
      image: true,
      authorId: true,
      typeId: true,
    },
  });
};

export const findAllMini = async (): Promise<PictureMini[]> => {
  return await db.picture.findMany({
    select: {
      id: true,
      title: true,
      image: true,
      author: { select: { username: true, profileImage: true } },
    },
  });
};

export const findById = async (id: string): Promise<Picture | null> => {
  return await db.picture.findUnique({
    where: { id },
    select: {
      id: true,
      createdAt: true,
      title: true,
      description: true,
      image: true,
      authorId: true,
      typeId: true,
    },
  });
};

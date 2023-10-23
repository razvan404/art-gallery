import { db } from "../../utils/database";
import { PictureToSave, type Picture, type PictureMini } from "./model";
import uploadsService from "../../raw/uploadsService";

export default {
  findAll: async (): Promise<Picture[]> => {
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
  },
  findAllMini: async (): Promise<PictureMini[]> => {
    return await db.picture.findMany({
      select: {
        id: true,
        title: true,
        image: true,
        author: { select: { username: true, profileImage: true } },
      },
    });
  },
  findById: async (id: string): Promise<Picture | null> => {
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
  },
  create: async (picture: PictureToSave): Promise<Picture> => {
    const image = await uploadsService.save(
      picture.rawImage.dataUrl,
      uploadsService.generatePath(picture.rawImage.format)
    );
    return await db.picture.create({
      data: {
        title: picture.title,
        description: picture.description,
        image: image,
        authorId: picture.authorId,
        typeId: picture.typeId,
      },
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
  },
  update: async (picture: Picture): Promise<Picture> => {
    return await db.picture.update({
      where: { id: picture.id },
      data: {
        title: picture.title,
        description: picture.description,
        image: picture.image,
        typeId: picture.typeId,
      },
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
  },
};

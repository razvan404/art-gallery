import { db } from "../../utils/database";
import { PictureToSave, type Picture, type PictureMini } from "./types";
import uploadsService from "../../raw/uploads/service";
import webSockets from "../../webSockets";

export default {
  findAll: async (
    queryFilters: any,
    skip?: number,
    take?: number
  ): Promise<PictureMini[]> => {
    return await db.picture.findMany({
      where: { ...queryFilters },
      select: {
        id: true,
        title: true,
        image: true,
        author: { select: { username: true, profileImage: true } },
      },
      skip: skip,
      take: take,
    });
  },
  findAllByAuthorId: async (authorId: string): Promise<PictureMini[]> => {
    return await db.picture.findMany({
      where: { authorId },
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
    const savedPicture = await db.picture.create({
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
    if (savedPicture) {
      webSockets.sendToAll("PICTURE_SAVED", savedPicture);
    }
    return savedPicture;
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
  delete: async (id: string, userId: string): Promise<void> => {
    const picture = await db.picture.findUnique({
      where: { id },
      select: { authorId: true },
    });
    if (picture?.authorId !== userId) {
      throw new Error("You can only delete your own pictures");
    }
    await db.picture.delete({ where: { id } });
    webSockets.sendToAll("PICTURE_DELETED", id);
  },
};

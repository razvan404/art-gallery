import { User } from "../user/types";
import { PictureType } from "../pictureType/types";

export type Picture = {
  id?: string;
  createdAt?: Date;
  title: string;
  description?: string;
  image: string;
  author?: User;
  authorId?: string;
  type?: PictureType;
  typeId?: number;
};

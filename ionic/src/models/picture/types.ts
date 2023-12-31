import { User } from "../user/types";
import { PictureType } from "../pictureType/types";
import { Photo } from "@capacitor/camera";
import { Geoloc } from "../../map/types";

export type PictureToSave = {
  id?: string;
  title?: string;
  image?: string;
  rawImage?: Photo;
  description?: string;
  authorId?: string;
  typeId?: number;
  geoloc?: Geoloc;
};

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
  geoloc?: Geoloc;
};

export type OptimisticPicture = (Picture | PictureToSave) & {
  isPending?: boolean;
};

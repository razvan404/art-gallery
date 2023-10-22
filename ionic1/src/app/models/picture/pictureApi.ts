import * as React from "react";
import * as API from "../../api";
import { Picture } from "./types";
import { logger } from "../../core/logger";

const log = logger("PicturesAPI");
const resourceUrl = API.resourceURL("pictures");

export default {
  findAll: async () => {
    try {
      log("findAll - started");
      const pictures = await API.get<Picture[]>(resourceUrl);
      log("findAll - succeeded");
      return pictures;
    } catch (err: any) {
      log("findAll - failed -", err.message);
      throw err;
    }
  },
  findById: async (id: string) => {
    try {
      log("findPictureById - started");
      const picture = await API.get<Picture>(`${resourceUrl}/${id}`);
      log("findPictureById - succeeded");
      return picture;
    } catch (err: any) {
      log("findPictureById - failed -", err.message);
      throw err;
    }
  },
  save: async (picture: Picture) => {
    try {
      log("savePicture - started");
      if (!picture.id) {
        const addedPicture = await API.post<Picture>(resourceUrl, picture);
        log("savePicture - succeeded");
        return addedPicture;
      } else {
        const updatedPicture = await API.put<Picture>(
          `${resourceUrl}/${picture.id}`,
          picture
        );
        log("savePicture - succeeded");
        return updatedPicture;
      }
    } catch (err: any) {
      log("savePicture - failed -", err.message);
      throw err;
    }
  },
  delete: async (id: string) => {
    try {
      log("deletePicture - started");
      await API.del<Picture>(`${resourceUrl}/${id}`);
      log("deletePicture - succeeded");
    } catch (err: any) {
      log("deletePicture - failed -", err.message);
      throw err;
    }
  },
} as const;

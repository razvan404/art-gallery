import galleryRoute from "../gallery/route";
import pictureRoute, { editPictureRoute } from "../picture/route";
import DefaultRoute from "./defaultRoute";
import NotFoundRoute from "./notFoundRoute";
import { RouteProps } from "./types";

export const routes: readonly RouteProps[] = [
  galleryRoute,
  pictureRoute,
  editPictureRoute,
] as const;
export { DefaultRoute, NotFoundRoute };

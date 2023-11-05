import galleryRoute from "../gallery/route";
import pictureRoute, {
  createPictureRoute,
  editPictureRoute,
} from "../picture/route";
import loginRoute from "../login/route";
import DefaultRoute from "./defaultRoute";
import { RouteProps } from "./types";

export const routes: readonly RouteProps[] = [
  galleryRoute,
  editPictureRoute,
  pictureRoute,
  createPictureRoute,
  loginRoute,
] as const;
export { DefaultRoute };

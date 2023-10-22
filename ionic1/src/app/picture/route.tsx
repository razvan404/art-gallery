import { RouteProps } from "../routes/types";
import PicturePage from "./page";

const pictureRoute = {
  path: "/pictures/:id",
  component: PicturePage,
} as RouteProps;

export default pictureRoute;

const editPictureRoute = {
  path: "/pictures/:id/edit",
  component: PicturePage,
} as RouteProps;

export { editPictureRoute };

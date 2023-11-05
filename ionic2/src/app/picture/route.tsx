import { RouteProps } from "../routes/types";
import PicturePage, { EditPicturePage, SavePicturePage } from "./page";

const pictureRoute = {
  path: "/pictures/:id",
  exact: true,
  component: PicturePage,
} as RouteProps;

export default pictureRoute;

const createPictureRoute = {
  path: "/pictures/create",
  exact: true,
  component: SavePicturePage,
} as RouteProps;

const editPictureRoute = {
  path: "/pictures/:id/edit",
  exact: true,
  component: EditPicturePage,
} as RouteProps;

export { createPictureRoute, editPictureRoute };

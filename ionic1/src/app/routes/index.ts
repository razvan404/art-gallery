import GalleryRoute from "../gallery/route";
import DefaultRoute from "./defaultRoute";
import NotFoundRoute from "./notFoundRoute";
import { RouteProps } from "./types";

export const routes: readonly RouteProps[] = [GalleryRoute] as const;
export { DefaultRoute, NotFoundRoute };

import { Route } from "react-router";
import GalleryPage from "./page";

const GalleryRoute = () => (
  <Route path="/gallery">
    <GalleryPage />
  </Route>
);

export default GalleryRoute;

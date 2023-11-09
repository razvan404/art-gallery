import * as React from "react";
import DefaultOverlay from "../overlay";
import PictureList from "./pictureList";
import { Picture, PictureAPI } from "../models";

const GalleryPage = () => {
  const [pictures, setPictures] = React.useState<Picture[]>([]);
  React.useEffect(() => {
    PictureAPI.findAll().then((pictures) => {
      setPictures(pictures);
    });
  }, []);

  return (
    <DefaultOverlay title={"Gallery"}>
      <PictureList pictures={pictures} />
    </DefaultOverlay>
  );
};

export default GalleryPage;

import * as React from "react";
import DefaultOverlay from "../overlay";
import PictureList from "./pictureList";
import { Picture, PictureAPI } from "../models";

const GalleryPage = () => {
  const [pictures, setPictures] = React.useState<Picture[]>([]);
  const [scrolledEnough, setScrolledEnough] = React.useState(false);
  const loadingAtOneTime = 3;
  React.useEffect(() => {
    PictureAPI.findAll({ skip: 0, take: loadingAtOneTime }).then((pictures) => {
      setPictures(pictures);
    });
  }, []);

  const onScroll = React.useCallback(
    (ev: CustomEvent<void>) => {
      if (scrolledEnough) {
        (ev.target as HTMLIonInfiniteScrollElement).complete();
        return;
      }
      PictureAPI.findAll({
        skip: pictures.length,
        take: loadingAtOneTime,
      }).then((newPictures) => {
        if (newPictures.length < loadingAtOneTime) {
          setScrolledEnough(true);
        }
        setPictures([...pictures, ...newPictures]);
        (ev.target as HTMLIonInfiniteScrollElement).complete();
      });
    },
    [scrolledEnough, pictures]
  );

  return (
    <DefaultOverlay title={"Gallery"} onScroll={onScroll}>
      <PictureList pictures={pictures} />
    </DefaultOverlay>
  );
};

export default GalleryPage;

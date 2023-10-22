import DefaultOverlay from "../overlay";
import PictureList from "./pictureList";

const GalleryPage = () => {
  return (
    <DefaultOverlay title={"Gallery"}>
      <PictureList />
    </DefaultOverlay>
  );
};

export default GalleryPage;

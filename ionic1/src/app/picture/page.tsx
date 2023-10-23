import DefaultOverlay from "../overlay/defaultOverlay";
import PictureComponent from "./pictureComponent";
import CreatePicture from "./savePicture";
import { IonLoading } from "@ionic/react";
import useParamsPicture from "./useParamsPicture";
import SavePicture from "./savePicture";

const PicturePage = () => {
  const picture = useParamsPicture();

  return (
    <DefaultOverlay
      title={picture?.title}
      color={"medium"}
      backHref={"/gallery"}
      editHref={`/pictures/${picture?.id}/edit`}
    >
      <IonLoading isOpen={!picture} />
      {picture && <PictureComponent picture={picture} />}
    </DefaultOverlay>
  );
};

export default PicturePage;

const SavePicturePage = () => {
  return (
    <DefaultOverlay
      color={"medium"}
      title={"Upload Picture"}
      backHref={"/gallery"}
    >
      <SavePicture />
    </DefaultOverlay>
  );
};

const EditPicturePage = () => {
  const picture = useParamsPicture();

  return (
    <DefaultOverlay
      color={"medium"}
      title={`Edit ${picture?.title}`}
      backHref={`/pictures/${picture?.id}`}
    >
      <IonLoading isOpen={!picture} />
      {picture && <SavePicture picture={picture} />}
    </DefaultOverlay>
  );
};

export { SavePicturePage, EditPicturePage };

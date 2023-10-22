import DefaultOverlay from "../overlay/defaultOverlay";
import PictureComponent from "./pictureComponent";
import CreatePicture from "./createPicture";
import EditPicture from "./editPicture";
import { IonLoading } from "@ionic/react";
import useParamsPicture from "./useParamsPicture";

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

const CreatePicturePage = () => {
  return (
    <DefaultOverlay
      color={"medium"}
      title={"Create Picture"}
      backHref={"/gallery"}
    >
      <CreatePicture />
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
      {picture && <EditPicture picture={picture} />}
    </DefaultOverlay>
  );
};

export { CreatePicturePage, EditPicturePage };

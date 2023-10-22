import * as React from "react";
import { useParams } from "react-router-dom";
import { Picture, PictureAPI } from "../models";
import DefaultOverlay from "../overlay/defaultOverlay";
import PictureComponent from "./pictureComponent";
import { IonLoading } from "@ionic/react";

const PicturePage = () => {
  const { id } = useParams<{ id: string }>();
  const [picture, setPicture] = React.useState<Picture | undefined>();

  React.useEffect(() => {
    PictureAPI.findById(id).then((fetchedPicture) => {
      setPicture(fetchedPicture);
    });
  }, [id]);

  return (
    <DefaultOverlay
      title={picture?.title}
      color={"medium"}
      backHref={"/gallery"}
      editHref={`/pictures/${id}/edit`}
    >
      <IonLoading isOpen={!picture} />
      {picture && <PictureComponent picture={picture} />}
    </DefaultOverlay>
  );
};

export default PicturePage;

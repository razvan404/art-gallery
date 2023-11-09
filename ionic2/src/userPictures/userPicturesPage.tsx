import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { Link } from "react-router-dom";
import PictureList from "../gallery/pictureList";
import { usePictures } from "../models";
import DefaultOverlay from "../overlay";

const UserPicturesPage = () => {
  const { pictures } = usePictures();
  return (
    <DefaultOverlay
      title={"My pictures"}
      color={"secondary"}
      fixedComponent={
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <Link to="/pictures/create">
            <IonFabButton>
              <IonIcon size="large" icon={add} />
            </IonFabButton>
          </Link>
        </IonFab>
      }
    >
      <PictureList pictures={pictures} />
    </DefaultOverlay>
  );
};

export default UserPicturesPage;

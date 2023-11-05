import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import DefaultOverlay from "../overlay";
import PictureList from "./pictureList";
import { Link } from "react-router-dom";

const GalleryPage = () => {
  return (
    <DefaultOverlay
      title={"Gallery"}
      fixedComponent={
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <Link to="/pictures/create">
            <IonFabButton>
              <IonIcon icon={add} />
            </IonFabButton>
          </Link>
        </IonFab>
      }
    >
      <PictureList />
    </DefaultOverlay>
  );
};

export default GalleryPage;

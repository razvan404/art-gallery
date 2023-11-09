import usePictures from "../models/picture/usePictures";
import { IonList, IonFabButton, IonIcon, IonFab } from "@ionic/react";
import PicturePreview from "./picturePreview";

import styles from "./styles/pictureList.module.css";
import { Picture } from "../models";

type Props = {
  pictures: Picture[];
};

const PictureList = ({ pictures }: Props) => {
  return (
    <>
      <IonList className={styles.pictureListContainer}>
        {pictures.map((picture) => (
          <PicturePreview picture={picture} key={picture.id} />
        ))}
      </IonList>
    </>
  );
};

export default PictureList;

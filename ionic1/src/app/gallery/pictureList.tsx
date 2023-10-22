import usePictures from "../models/picture/usePictures";
import { IonList } from "@ionic/react";
import PicturePreview from "./picturePreview";

import styles from "./styles/pictureList.module.css";

const PictureList = () => {
  const { pictures } = usePictures();
  console.log(pictures);
  return (
    <IonList className={styles.pictureListContainer}>
      {pictures.map((picture) => (
        <PicturePreview picture={picture} key={picture.id} />
      ))}
    </IonList>
  );
};

export default PictureList;

import { IonButton, IonImg, IonLabel } from "@ionic/react";
import { Picture } from "../models";
import { imageUrl } from "../api";
import MiniThumbnail from "../user/miniThumbnail";

import styles from "./styles/pictureComponent.module.css";

type Props = {
  picture: Picture;
};

const PictureComponent = ({ picture }: Props) => {
  const pictureLink = imageUrl(picture.image);
  return (
    <div className={styles.container}>
      <IonImg src={pictureLink} alt={picture.title} />
      <div className={styles.uploaderRow}>
        <div className={styles.uploader}>
          <IonLabel className={styles.uploaderText}>Uploaded by</IonLabel>
          {<MiniThumbnail user={picture.author} />}
        </div>
        <div className={styles.topButtons}>
          <IonButton>Download</IonButton>
          <IonButton>Share</IonButton>
        </div>
      </div>
      <div className={styles.detailsRow}>
        <IonLabel className={styles.title}>{picture.title}</IonLabel>
        <IonLabel className={styles.description}>
          "{picture.description}"
        </IonLabel>
      </div>
    </div>
  );
};

export default PictureComponent;

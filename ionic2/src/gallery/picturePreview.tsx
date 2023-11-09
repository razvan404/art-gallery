import { Picture } from "../models";
import { imageUrl } from "../api";
import { IonCard, IonImg, IonLabel } from "@ionic/react";

import styles from "./styles/picturePreview.module.css";
import MiniThumbnail from "../user/miniThumbnail";
import { Link } from "react-router-dom";

type Props = {
  picture: Picture;
};

const PicturePreview = ({ picture }: Props) => {
  const pictureLink = imageUrl(picture.image ?? "default.png");

  return (
    <Link to={`/pictures/${picture.id}`} className={styles.container}>
      <IonCard className={styles.container}>
        <IonImg
          className={styles.image}
          src={pictureLink}
          alt={picture.title}
        />
        <div className={styles.shadowOverlay} />
        <MiniThumbnail
          className={styles.authorContainer}
          user={picture.author}
        />
      </IonCard>
    </Link>
  );
};

export default PicturePreview;

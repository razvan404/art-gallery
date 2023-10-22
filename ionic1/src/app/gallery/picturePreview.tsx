import { Picture } from "../models";
import { imageUrl } from "../api";
import { IonImg } from "@ionic/react";
import { Link } from "react-router-dom";

import styles from "./styles/picturePreview.module.css";

type Props = {
  picture: Picture;
};

const PicturePreview = ({ picture }: Props) => {
  const pictureLink = imageUrl(picture.image ?? "default.png");

  return (
    <Link className={styles.container} to={`/pictures/${picture.id}`}>
      <IonImg src={pictureLink} alt={picture.title} />
    </Link>
  );
};

export default PicturePreview;

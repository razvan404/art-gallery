import React from "react";
import {
  IonAlert,
  IonButton,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonLoading,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import { camera, trashBin } from "ionicons/icons";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Picture, PictureAPI, usePictureTypes, PictureToSave } from "../models";
import { imageUrl } from "../api";

import styles from "./styles/savePicture.module.css";

type Props = {
  picture?: Picture;
};

const SavePicture = ({ picture }: Props) => {
  const [pictureToSave, setPictureToSave] = React.useState<PictureToSave>({
    ...picture,
  });
  const { pictureTypes } = usePictureTypes();
  const [error, setError] = React.useState<string>();
  const [success, setSuccess] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);

  const selectPicture = React.useCallback(async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });
    setPictureToSave({
      ...pictureToSave,
      rawImage: image,
    });
  }, [pictureToSave]);

  const isNewPicture = !picture;
  const validatePicture = React.useCallback(() => {
    const errors = [];
    if (!pictureToSave?.title) {
      errors.push("Title is required");
    }
    if (!pictureToSave?.description) {
      errors.push("Description is required");
    }
    if (isNewPicture && !pictureToSave?.rawImage) {
      errors.push("Image is required");
    }
    if (!pictureToSave?.typeId) {
      errors.push("Type is required");
    }
    setError(errors.join("; "));
    return errors.length === 0;
  }, [pictureToSave, isNewPicture]);

  const savePicture = React.useCallback(async () => {
    if (!validatePicture()) {
      return;
    }
    setLoading(true);
    try {
      await PictureAPI.save(pictureToSave);
      setSuccess("Picture saved successfully");
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }, [pictureToSave, validatePicture]);

  const pictureUrl = picture?.image && imageUrl(picture?.image);

  return (
    <>
      <IonLoading isOpen={loading} message="Please wait..." />
      <div className={styles.container}>
        {!isNewPicture ? (
          <IonImg src={pictureUrl} alt={picture.title} />
        ) : !pictureToSave?.rawImage ? (
          <IonButton
            className={styles.button}
            color="light"
            onClick={selectPicture}
          >
            <IonIcon slot="start" icon={camera} />
            <IonLabel>Select Image</IonLabel>
          </IonButton>
        ) : (
          <div className={styles.uploadedImageContainer}>
            <IonImg
              className={styles.uploadedImage}
              src={pictureToSave.rawImage.dataUrl}
            />
            <IonButton
              className={styles.retakeUploadedImage}
              color="light"
              shape="round"
              onClick={selectPicture}
            >
              <IonIcon slot="start" icon={camera} />
              <IonLabel>Retake</IonLabel>
            </IonButton>
            <IonButton
              className={styles.removeUploadedImage}
              color="danger"
              shape="round"
              onClick={() => {
                setPictureToSave({
                  ...pictureToSave,
                  rawImage: undefined,
                });
              }}
            >
              <IonIcon slot="start" icon={trashBin} />
              <IonLabel>Remove</IonLabel>
            </IonButton>
          </div>
        )}
        <IonInput
          label={isNewPicture ? "Title" : "Updated Title"}
          placeholder="Enter the desired title"
          fill="outline"
          labelPlacement="floating"
          clearInput
          value={pictureToSave?.title}
          onIonInput={(ev) => {
            setPictureToSave({
              ...pictureToSave,
              title: ev.detail.value ?? undefined,
            });
          }}
        />
        <IonTextarea
          className={styles.description}
          label={isNewPicture ? "Description" : "Updated Descrption"}
          placeholder="Enter the desired description"
          fill="outline"
          labelPlacement="floating"
          value={pictureToSave?.description}
          counter
          maxlength={300}
          counterFormatter={(inputLength, maxLength) =>
            `${maxLength - inputLength} characters remaining`
          }
          onIonInput={(ev) => {
            setPictureToSave({
              ...pictureToSave,
              description: ev.detail.value ?? undefined,
            });
          }}
        />
        <IonSelect
          label={isNewPicture ? "Type" : "Updated Type"}
          placeholder="Select the desired type"
          fill="outline"
          labelPlacement="floating"
          value={pictureToSave?.typeId}
          onIonChange={(ev) => {
            setPictureToSave({
              ...pictureToSave,
              typeId: ev.detail.value,
            });
          }}
        >
          {Object.values(pictureTypes).map((pictureType) => (
            <IonSelectOption key={pictureType.id} value={pictureType.id}>
              {pictureType.name}
            </IonSelectOption>
          ))}
        </IonSelect>
        <IonButton
          className={styles.button}
          color="warning"
          onClick={savePicture}
        >
          {isNewPicture ? "Upload picture" : "Save changes"}
        </IonButton>
        <IonAlert
          isOpen={!!error}
          header="Error"
          subHeader={`An error occurred while ${
            isNewPicture ? "uploading" : "updating"
          } the picture`}
          message={error}
          buttons={[{ text: "OK", handler: () => setError(undefined) }]}
        />
        <IonAlert
          isOpen={!!success}
          header="Success"
          message={`The picture has been ${
            isNewPicture ? "uploaded" : "updated"
          } successfully`}
          buttons={[
            {
              text: "OK",
              handler: () => {
                setSuccess(undefined);
                window.location.href = "/gallery";
              },
            },
          ]}
        />
      </div>
    </>
  );
};

export default SavePicture;

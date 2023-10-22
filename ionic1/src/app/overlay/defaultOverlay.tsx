import React from "react";
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonBackButton,
  IonButton,
  IonIcon,
} from "@ionic/react";
import OverlayMenu from "./overlayMenu";
import { Link } from "react-router-dom";
import { constructOutline } from "ionicons/icons";

type OverlayProps = {
  title?: string;
  children?: React.ReactNode;
  disableButtons?: boolean;
  backHref?: string;
  color?: string;
  editHref?: string;
};

const DefaultOverlay = ({
  title,
  children,
  disableButtons,
  backHref,
  color = "success",
  editHref,
}: OverlayProps) => {
  return (
    <>
      <OverlayMenu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar color={color}>
            {!disableButtons && (
              <>
                <IonButtons slot="start">
                  <IonMenuButton />
                  {backHref && <IonBackButton defaultHref={backHref} />}
                </IonButtons>
                {editHref && (
                  <IonButtons slot="end">
                    <Link to={editHref}>
                      <IonButton color={"light"}>
                        <IonIcon size={"large"} icon={constructOutline} />
                      </IonButton>
                    </Link>
                  </IonButtons>
                )}
              </>
            )}
            {title && <IonTitle>{title}</IonTitle>}
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">{children}</IonContent>
      </IonPage>
    </>
  );
};

export default DefaultOverlay;

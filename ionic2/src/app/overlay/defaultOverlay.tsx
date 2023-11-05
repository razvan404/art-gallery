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
  IonInfiniteScroll,
} from "@ionic/react";
import OverlayMenu from "./overlayMenu";
import { constructOutline } from "ionicons/icons";

import styles from "./styles/defaultOverlay.module.css";
import { Link } from "react-router-dom";

type OverlayProps = {
  title?: string;
  children?: React.ReactNode;
  disableButtons?: boolean;
  backHref?: string;
  color?: string;
  editHref?: string;
  fixedComponent?: React.ReactNode;
  withScrolling?: boolean;
};

const DefaultOverlay = ({
  title,
  children,
  disableButtons,
  backHref,
  color = "success",
  editHref,
  fixedComponent,
  withScrolling = true,
}: OverlayProps) => {
  console.log("Hello!");
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
        <IonContent className="ion-padding">
          {withScrolling ? (
            <IonInfiniteScroll>{children}</IonInfiniteScroll>
          ) : (
            children
          )}
          {fixedComponent}
        </IonContent>
      </IonPage>
    </>
  );
};

export default DefaultOverlay;

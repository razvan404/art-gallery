import React from "react";
import {
  IonButtons,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { Link } from "react-router-dom";

import styles from "./styles/defaultOverlay.module.css";
import useUsers from "../models/user/useUsers";

type OverlayProps = {
  title?: string;
  children?: React.ReactNode;
};

const DefaultOverlay = ({ title, children }: OverlayProps) => {
  const { currentUser, logout } = useUsers();

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Art Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className={styles.menuContent}>
          <IonList className={styles.menuList}>
            <Link className={styles.menuLink} to="/gallery">
              <IonItem button>Gallery</IonItem>
            </Link>
            <Link className={styles.menuLink} to="/about">
              <IonItem button>
                <IonLabel>About</IonLabel>
              </IonItem>
            </Link>
            <Link className={styles.menuLink} to="/contact">
              <IonItem button>Contact</IonItem>
            </Link>
          </IonList>
          <IonList className={styles.menuList}>
            {currentUser ? (
              <>
                <Link className={styles.menuLink} to="/profile">
                  <IonItem button>Your Profile</IonItem>
                </Link>
                <IonItem button onClick={logout}>
                  Logout
                </IonItem>
              </>
            ) : (
              <Link className={styles.menuLink} to="/login">
                <IonItem button>Login</IonItem>
              </Link>
            )}
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar color="danger">
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            {title && <IonTitle>{title}</IonTitle>}
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">{children}</IonContent>
      </IonPage>
    </>
  );
};

export default DefaultOverlay;

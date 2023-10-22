import { Link } from "react-router-dom";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import useUsers from "../models/user/useUsers";

import styles from "./styles/overlayMenu.module.css";

const OverlayMenu = () => {
  const { currentUser, logout } = useUsers();

  return (
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
  );
};

export default OverlayMenu;

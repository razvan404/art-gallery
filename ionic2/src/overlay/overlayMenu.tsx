import * as React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonList,
  IonItem,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import MiniThumbnail from "../user/miniThumbnail";
import { useNetwork } from "../core/useNetwork";

import styles from "./styles/overlayMenu.module.css";

const MenuLink = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Link className={styles.menuLink} to={to}>
      <IonItem button onClick={onClick}>
        {children}
      </IonItem>
    </Link>
  );
};

const OverlayMenu = () => {
  const { currentUser, logout } = useAuth();
  const { networkStatus } = useNetwork();

  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Art Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.menuContent}>
        <IonList className={styles.menuList}>
          <MenuLink to="/gallery">Gallery</MenuLink>
          {!!currentUser && (
            <>
              <MenuLink to="/pictures">My Pictures</MenuLink>
              <MenuLink to="/pictures/create">Upload Picture</MenuLink>
            </>
          )}
        </IonList>
        <IonList className={styles.menuList}>
          {!!currentUser ? (
            <>
              <MenuLink to="/profile">
                <MiniThumbnail user={currentUser} />
              </MenuLink>
              <MenuLink to="/gallery" onClick={logout}>
                Logout
              </MenuLink>
            </>
          ) : (
            <>
              <MenuLink to="/login">Login</MenuLink>
              <MenuLink to="/register">Register</MenuLink>
            </>
          )}
          <IonItem>
            Internet status: {networkStatus.connected ? "Online" : "Offline"}
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default React.memo(OverlayMenu);

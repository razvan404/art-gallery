import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonTitle,
  IonMenuToggle,
} from "@ionic/react";

type OverlayProps = {
  children?: React.ReactNode;
};

const DefaultOverlay = ({ children }: OverlayProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton onClick={() => setMenuOpen(true)} />
          <IonTitle>Main Page</IonTitle>
          <IonMenuToggle
            open={menuOpen}
            onToggle={() => setMenuOpen(!menuOpen)}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>{/* Main page content here */}</IonContent>
      <IonMenu open={menuOpen}>
        <IonContent>
          <IonList>
            <IonItem routerLink="/gallery">Gallery</IonItem>
            <IonItem routerLink="/uploads">Your Uploads</IonItem>
            <IonItem routerLink="/login">Login</IonItem>
            <IonItem routerLink="/exit">Exit</IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
    </IonApp>
  );
};

export default DefaultOverlay;

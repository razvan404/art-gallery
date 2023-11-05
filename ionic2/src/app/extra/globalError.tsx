import * as React from "react";
import { IonAlert } from "@ionic/react";

type Props = {
  error?: string | null;
  setError: (arg0?: string) => void;
};

const GlobalError = ({ error, setError }: Props) => {
  return (
    <IonAlert
      isOpen={!!error}
      header={"Error"}
      subHeader={"An error occurred while loading the page"}
      message={error ?? ""}
      buttons={[
        {
          text: "Ok",
          handler: () => {
            setError();
          },
        },
      ]}
    />
  );
};

export default GlobalError;

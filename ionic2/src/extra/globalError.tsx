import * as React from "react";
import { IonAlert } from "@ionic/react";

type Props = {
  title?: string;
  subtitle?: string;
  error?: string | null;
  setError: (arg0?: string) => void;
};

const GlobalError = ({ error, setError }: Props) => {
  return (
    <IonAlert
      isOpen={!!error}
      header={"Error"}
      subHeader={"Something went wrong"}
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

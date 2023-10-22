import * as React from "react";
import { useParams } from "react-router-dom";
import { Picture, PictureAPI, UserAPI } from "../models";

const useParamsPicture = () => {
  const { id } = useParams<{ id: string }>();
  const [picture, setPicture] = React.useState<Picture | undefined>();

  React.useEffect(() => {
    PictureAPI.findById(id)
      .then((fetchedPicture) => {
        setPicture(fetchedPicture);
        return fetchedPicture;
      })
      .then((fetchedPicture) => {
        if (!fetchedPicture || !fetchedPicture.authorId) return null;
        return UserAPI.findById(fetchedPicture.authorId);
      })
      .then((fetchedUser) => {
        if (!fetchedUser) return null;
        setPicture(
          (prevPicture) =>
            prevPicture && {
              ...prevPicture,
              author: fetchedUser,
            }
        );
      });
  }, [id]);

  return picture;
};

export default useParamsPicture;

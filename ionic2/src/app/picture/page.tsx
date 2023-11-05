import DefaultOverlay from "../overlay/defaultOverlay";
import PictureComponent from "./pictureComponent";
import useParamsPicture from "./useParamsPicture";
import SavePicture from "./savePicture";
import GlobalError from "../extra/globalError";
import { useAuth } from "../auth";
import GlobalLoading from "../extra/globalLoading";

const PicturePage = () => {
  const { picture, loading, error, setError } = useParamsPicture();
  const { currentUser, loading: currentUserLoading } = useAuth();

  const isCurrentUserAuthor = currentUser?.id === picture?.authorId;
  console.log(loading, currentUserLoading);
  return (
    <DefaultOverlay
      title={picture?.title}
      color={"medium"}
      backHref={"/gallery"}
      editHref={
        (isCurrentUserAuthor && `/pictures/${picture?.id}/edit`) || undefined
      }
    >
      {picture && <PictureComponent picture={picture} />}
      <GlobalError error={error} setError={setError} />
    </DefaultOverlay>
  );
};

export default PicturePage;

const SavePicturePage = () => {
  return (
    <DefaultOverlay
      color={"medium"}
      title={"Upload Picture"}
      backHref={"/gallery"}
    >
      <SavePicture />
    </DefaultOverlay>
  );
};

const EditPicturePage = () => {
  const { picture, loading, error, setError } = useParamsPicture();

  return (
    <DefaultOverlay
      color={"medium"}
      title={`Edit ${picture?.title}`}
      backHref={`/pictures/${picture?.id}`}
    >
      {picture && <SavePicture picture={picture} />}
      <GlobalError error={error} setError={setError} />
    </DefaultOverlay>
  );
};

export { SavePicturePage, EditPicturePage };

import * as React from "react";
import * as API from "../../api";
import { Picture } from "./types";
import { logger } from "../../core/logger";

const log = logger("UsePictures");

type PictureState = {
  pictures: Picture[];
  loading: boolean;
  error: string;
};

const initialState: PictureState = {
  pictures: [],
  loading: false,
  error: "",
};

type ActionPicture = {
  type: string;
  payload?: any;
};

const PICTURES_LOADING = "PICTURES_LOADING";
const PICTURES_FAILED = "PICTURES_FAILED";
const PICTURES_SUCCEEDED = "PICTURES_SUCCEEDED";

const pictureReducer: (
  state: PictureState,
  action: ActionPicture
) => PictureState = (
  state: PictureState = initialState,
  action: ActionPicture
): PictureState => {
  switch (action.type) {
    case PICTURES_LOADING:
      return { ...state, loading: true, error: "" };
    case PICTURES_FAILED:
      return { ...state, loading: false, error: action.payload };
    case PICTURES_SUCCEEDED:
      return { ...state, loading: false, pictures: action.payload };
    default:
      return state;
  }
};

const resourceURL = API.resourceURL("pictures");

const usePictures = () => {
  const [state, dispatch] = React.useReducer(pictureReducer, initialState);
  const { pictures, loading, error } = state;

  React.useEffect(() => {
    getPictures();
  }, []);

  const getPictures = React.useCallback(async () => {
    try {
      dispatch({ type: PICTURES_LOADING });
      log("getPictures - started");
      const pictures = await API.get<Picture[]>(resourceURL);
      dispatch({ type: PICTURES_SUCCEEDED, payload: pictures });
      log("getPictures - succeeded");
    } catch (err: any) {
      dispatch({ type: PICTURES_FAILED, payload: err.message });
      log("getPictures - failed -", err.message);
    }
  }, [pictures]);

  const getPictureById = React.useCallback(async (id: string) => {
    try {
      log("getPictureById - started");
      const picture = await API.get<Picture[]>(`${resourceURL}/${id}}`);
      log("getPictureById - succeeded");
      return picture;
    } catch (err: any) {
      log("getPictureById - failed -", err.message);
      return undefined;
    }
  }, []);

  const savePicture = React.useCallback(
    async (picture: Picture) => {
      try {
        dispatch({ type: PICTURES_LOADING });
        log("savePicture - started");
        if (!picture.id) {
          const addedPicture = await API.post<Picture>(resourceURL, picture);
          dispatch({
            type: PICTURES_SUCCEEDED,
            payload: [...pictures, addedPicture],
          });
        } else {
          const updatedPicture = await API.put<Picture>(
            `${resourceURL}/${picture.id}`,
            picture
          );
          dispatch({
            type: PICTURES_SUCCEEDED,
            payload: pictures.map((p) =>
              p.id === updatedPicture.id ? updatedPicture : p
            ),
          });
        }
        log("savePicture - succeeded");
      } catch (err: any) {
        dispatch({ type: PICTURES_FAILED, payload: err.message });
        log("savePicture - failed -", err.message);
      }
    },
    [pictures]
  );

  return {
    pictures,
    loading,
    error,
    getPictureById,
    savePicture,
  };
};

export default usePictures;

import * as React from "react";
import * as API from "../../api";
import { Picture } from "./types";
import { logger } from "../../core/logger";

const log = logger("usePictures");

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
const PICTURES_FETCHED = "PICTURES_FETCHED";

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
    case PICTURES_FETCHED:
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
      log("getPictures started");
      dispatch({ type: PICTURES_LOADING });
      const pictures = await API.get<Picture[]>(resourceURL);
      log("getPictures succeeded");
      dispatch({ type: PICTURES_FETCHED, payload: pictures });
    } catch (err: any) {
      log("getPictures failed", err.message);
      dispatch({ type: PICTURES_FAILED, payload: err.message });
    }
  }, [pictures]);

  const addPicture = React.useCallback(
    async (picture: Picture) => {
      try {
        log("addPicture started");
        dispatch({ type: PICTURES_LOADING });
        const addedPicture = await API.post<Picture>(resourceURL, picture);
        log("addPicture succeeded");
        dispatch({
          type: PICTURES_FETCHED,
          payload: [...pictures, addedPicture],
        });
      } catch (err: any) {
        log("addPicture failed", err.message);
        dispatch({ type: PICTURES_FAILED, payload: err.message });
      }
    },
    [pictures]
  );

  const updatePicture = React.useCallback(
    async (picture: Picture) => {
      try {
        log("updatePicture started");
        dispatch({ type: PICTURES_LOADING });
        const updatedPicture = await API.put<Picture>(
          `${resourceURL}/${picture.id}`,
          picture
        );
        log("updatePicture succeeded");
        dispatch({
          type: PICTURES_FETCHED,
          payload: pictures.map((picture) =>
            picture.id === updatedPicture.id ? updatedPicture : picture
          ),
        });
      } catch (err: any) {
        log("updatePicture failed", err.message);
        dispatch({ type: PICTURES_FAILED, payload: err.message });
      }
    },
    [pictures]
  );

  return {
    pictures,
    loading,
    error,
    addPicture,
    updatePicture,
  };
};

export default usePictures;

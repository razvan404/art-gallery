import * as React from "react";
import PictureAPI from "./pictureApi";
import { Picture, PictureToSave } from "./types";
import { logger } from "../../core/logger";
import { newWebSocket } from "../../api";
import { useAuth } from "../../auth";

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
const PICTURES_SAVED = "PICTURES_SAVED";
const PICTURES_UPDATED = "PICTURES_UPDATED";
const PICTURES_DELETED = "PICTURES_DELETED";

const pictureReducer = (
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
    case PICTURES_SAVED:
      return {
        ...state,
        loading: false,
        pictures: [...state.pictures, action.payload],
      };
    case PICTURES_UPDATED:
      return {
        ...state,
        loading: false,
        pictures: state.pictures.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case PICTURES_DELETED:
      return {
        ...state,
        loading: false,
        pictures: state.pictures.filter((p) => p.id !== action.payload.id),
      };
    default:
      return state;
  }
};

const usePictures = () => {
  const { currentUser, token } = useAuth();
  const [state, dispatch] = React.useReducer(pictureReducer, initialState);
  const { pictures, loading, error } = state;

  React.useEffect(() => {
    wsEffect();
  }, [token]);

  React.useEffect(() => {
    findPictures();
  }, [currentUser]);

  const findPictures = React.useCallback(async () => {
    try {
      if (currentUser?.id === undefined) return;
      dispatch({ type: PICTURES_LOADING });
      log("getPictures - started");
      const fetchedPictures = await PictureAPI.findFromAuthorId(currentUser.id);
      dispatch({ type: PICTURES_SUCCEEDED, payload: fetchedPictures });
      log("getPictures - succeeded");
    } catch (err: any) {
      dispatch({ type: PICTURES_FAILED, payload: err.message });
      log("getPictures - failed -", err.message);
    }
  }, [currentUser]);

  const savePicture = React.useCallback(
    async (picture: PictureToSave) => {
      try {
        console.log(token);
        dispatch({ type: PICTURES_LOADING });
        log("savePicture - started");
        await PictureAPI.save(
          {
            ...picture,
            authorId: currentUser?.id,
          },
          token
        );
      } catch (err: any) {
        dispatch({ type: PICTURES_FAILED, payload: err.message });
        log("savePicture - failed -", err.message);
      }
    },
    [pictures]
  );

  const wsEffect = React.useCallback(() => {
    let canceled = false;
    log("wsEffect - connecting");
    const closeWebSocket = newWebSocket<Picture>((message) => {
      if (canceled) {
        return;
      }
      const { event, payload } = message;
      log("wsEffect - pictures -", event);
      dispatch({ type: event, payload });
    }, token);
    return () => {
      log("wsEffect - disconnecting");
      canceled = true;
      closeWebSocket?.();
    };
  }, [token]);

  return {
    pictures,
    loading,
    error,
    savePicture,
  };
};

export default usePictures;

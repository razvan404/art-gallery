import * as React from "react";
import * as API from "../../api";
import { User } from "./types";
import { logger } from "../../core/logger";

const log = logger("useUsers");

type UserState = {
  currentUser?: User;
  loading: boolean;
  error: string;
};

const initialState: UserState = {
  currentUser: undefined,
  loading: false,
  error: "",
};

type ActionUser = {
  type: string;
  payload?: any;
};

const USERS_LOADING = "USERS_LOADING";
const USERS_FAILED = "USERS_FAILED";
const USERS_SUCCEEDED = "USERS_SUCCEEDED";

const userReducer = (
  state: UserState = initialState,
  action: ActionUser
): UserState => {
  switch (action.type) {
    case USERS_LOADING:
      return { ...state, loading: true, error: "" };
    case USERS_FAILED:
      return { ...state, loading: false, error: action.payload };
    case USERS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        currentUser: action.payload ?? state.currentUser,
      };
    default:
      return state;
  }
};

const resourceURL = API.resourceURL("users");

const useUsers = () => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  const { currentUser, loading, error } = state;

  const findUserById = React.useCallback(async (id: string) => {
    try {
      const user = await API.get<User[]>(`${resourceURL}/${id}}`);
      dispatch({ type: USERS_SUCCEEDED });
      return user;
    } catch (err: any) {
      dispatch({ type: USERS_FAILED, payload: err.message });
      return undefined;
    }
  }, []);

  const saveUser = React.useCallback(async (user: User) => {
    try {
      if (user.id) {
        user = await API.put<User>(`${resourceURL}/${user.id}`, user);
        dispatch({ type: USERS_SUCCEEDED, payload: user });
      } else {
        await API.post<User>(resourceURL, user);
        dispatch({ type: USERS_SUCCEEDED, payload: user });
      }
    } catch (err: any) {
      dispatch({ type: USERS_FAILED, payload: err.message });
    }
  }, []);

  const deleteUser = React.useCallback(async (user: User) => {
    try {
      await API.del<User>(`${resourceURL}/${user.id}`);
      dispatch({ type: USERS_SUCCEEDED });
    } catch (err: any) {
      dispatch({ type: USERS_FAILED, payload: err.message });
    }
  }, []);

  return { currentUser, loading, error, findUserById, saveUser, deleteUser };
};

export default useUsers;

import * as React from "react";
import * as API from "../../api";
import { User } from "./types";
import { logger } from "../../core/logger";

const log = logger("UseUsers");

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
const USERS_LOGIN = "USER_LOGIN";
const USERS_LOGOUT = "USER_LOGOUT";

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
        currentUser: action.payload,
      };
    case USERS_LOGIN:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case USERS_LOGOUT:
      return {
        ...state,
        loading: false,
        currentUser: undefined,
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
      log("findUserById - started");
      const user = await API.get<User[]>(`${resourceURL}/${id}}`);
      log("findUserById - succeeded");
      return user;
    } catch (err: any) {
      log("findUserById - failed -", err.message);
      return undefined;
    }
  }, []);

  const saveUser = React.useCallback(async (user: User) => {
    try {
      dispatch({ type: USERS_LOADING });
      log("saveUser - started");
      if (user.id) {
        user = await API.put<User>(`${resourceURL}/${user.id}`, user);
        dispatch({ type: USERS_SUCCEEDED, payload: user });
      } else {
        user = await API.post<User>(resourceURL, user);
        dispatch({ type: USERS_SUCCEEDED, payload: user });
      }
      log("saveUser - succeeded");
    } catch (err: any) {
      dispatch({ type: USERS_FAILED, payload: err.message });
      log("saveUser - failed -", err.message);
    }
  }, []);

  const deleteUser = React.useCallback(async (user: User) => {
    dispatch({ type: USERS_LOADING });
    log("deleteUser - started");
    try {
      await API.del<User>(`${resourceURL}/${user.id}`);
      dispatch({ type: USERS_SUCCEEDED });
      log("deleteUser - succeeded");
    } catch (err: any) {
      dispatch({ type: USERS_FAILED, payload: err.message });
      log("deleteUser - failed -", err.message);
    }
  }, []);

  const login = React.useCallback(
    async (username: string, password: string) => {},
    []
  );

  const logout = React.useCallback(async () => {
    dispatch({ type: USERS_LOGOUT });
  }, []);

  return {
    currentUser,
    loading,
    error,
    findUserById,
    saveUser,
    deleteUser,
    login,
    logout,
  };
};

export default useUsers;

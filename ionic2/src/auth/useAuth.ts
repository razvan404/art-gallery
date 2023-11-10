import * as React from "react";
import UserAPI from "../models/user/userApi";
import AuthAPI from "./authApi";
import { User } from "../models/user/types";
import { logger } from "../core/logger";

const log = logger("UseAuth");

type UserState = {
  currentUser?: User;
  token?: string;
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

const USER_LOADING = "USER_LOADING";
const USER_FAILED = "USER_FAILED";
const USER_SUCCEEDED = "USER_SUCCEEDED";
const USER_LOGIN = "USER_LOGIN";
const USER_REGISTER = "USER_REGISTER";
const USER_LOGOUT = "USER_LOGOUT";

const userReducer = (
  state: UserState = initialState,
  action: ActionUser
): UserState => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, loading: true, error: "" };
    case USER_FAILED:
      return { ...state, loading: false, error: action.payload };
    case USER_SUCCEEDED:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        loading: false,
        currentUser: action.payload.user,
        token: action.payload.token,
      };
    case USER_REGISTER:
      return {
        ...state,
        loading: false,
        currentUser: action.payload.user,
        token: action.payload.token,
      };
    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
        currentUser: undefined,
        token: undefined,
      };
    default:
      return state;
  }
};

const useAuth = () => {
  const [state, dispatch] = React.useReducer(userReducer, initialState);
  const { currentUser, token, loading, error } = state;

  React.useEffect(() => {
    log("currentUser -", currentUser);
  }, [currentUser]);

  const saveUser = React.useCallback(async (user: User) => {
    try {
      dispatch({ type: USER_LOADING });
      log("saveUser - started");
      user = await UserAPI.save(user);
      dispatch({ type: USER_SUCCEEDED, payload: user });
      log("saveUser - succeeded");
    } catch (err: any) {
      dispatch({ type: USER_FAILED, payload: err.message });
      log("saveUser - failed -", err.message);
    }
  }, []);

  const deleteUser = React.useCallback(async () => {
    dispatch({ type: USER_LOADING });
    log("deleteUser - started");
    if (!currentUser?.id) {
      dispatch({ type: USER_FAILED, payload: "No user to delete" });
      log("deleteUser - failed - No user to delete");
      return;
    }
    try {
      await UserAPI.delete(currentUser.id);
      dispatch({ type: USER_SUCCEEDED });
      log("deleteUser - succeeded");
    } catch (err: any) {
      dispatch({ type: USER_FAILED, payload: err.message });
      log("deleteUser - failed -", err.message);
    }
  }, []);

  const login = React.useCallback(
    async (usernameOrEmail: string, password: string) => {
      try {
        const resp = await AuthAPI.login(usernameOrEmail, password);
        localStorage.setItem("authToken", resp.token);
        dispatch({ type: USER_LOGIN, payload: resp });
        log("login - succeeded");
      } catch (err: any) {
        dispatch({ type: USER_FAILED, payload: err.message });
        log("login - failed -", err.message);
      }
    },
    []
  );

  const register = React.useCallback(
    async (username: string, email: string, password: string) => {
      try {
        const resp = await AuthAPI.register(username, email, password);
        localStorage.setItem("authToken", resp.token);
        dispatch({ type: USER_REGISTER, payload: resp });
        log("register - succeeded");
      } catch (err: any) {
        dispatch({ type: USER_FAILED, payload: err.message });
        log("register - failed -", err.message);
      }
    },
    []
  );

  const logout = React.useCallback(async () => {
    localStorage.removeItem("authToken");
    dispatch({ type: USER_LOGOUT });
  }, []);

  const me = React.useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      log("useEffect - token found");
      AuthAPI.me(token)
        .then((resp) => {
          dispatch({ type: USER_LOGIN, payload: { user: resp, token } });
          log("useEffect - token found - succeeded");
        })
        .catch((err) => {
          dispatch({ type: USER_FAILED, payload: err.message });
          log("useEffect - token found - failed -", err.message);
        });
    }
  }, []);

  React.useEffect(() => {
    me();
  }, []);

  const setError = React.useCallback((error?: string) => {
    dispatch({ type: USER_FAILED, payload: error });
  }, []);

  return {
    currentUser,
    token,
    loading,
    error,
    setError,
    saveUser,
    deleteUser,
    login,
    register,
    logout,
  };
};

export default useAuth;

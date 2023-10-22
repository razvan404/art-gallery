import { logger } from "../core/logger";
import { baseURL, webSocketURL } from "./consts";
import { Response } from "./types";
import axios from "axios";

const log = logger("API");

export const resourceURL = (resource: string) =>
  `http://${baseURL}/api/${resource}`;

export const imageUrl = (image: string) => `http://${baseURL}/uploads/${image}`;

export const downloadImageUrl = (image: string) =>
  `${imageUrl(image)}/download`;

const withLogs = <T>(
  promise: Promise<Response<T>>,
  fnName: string
): Promise<T> => {
  log(`${fnName} - started`);
  return promise
    .then((res) => {
      log(`${fnName} - succeeded`);
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      log(`${fnName} - failed - ${err}`);
      return Promise.reject(err);
    });
};

export const get = <T>(path: string): Promise<T> =>
  withLogs<T>(axios.get(path, { method: "GET" }), `GET - ${path}`);

export const post = <T>(path: string, body: any): Promise<T> =>
  withLogs<T>(axios.post(path, body), `POST - ${path}`);

export const put = <T>(path: string, body: any): Promise<T> =>
  withLogs<T>(axios.put(path, body), `PUT - ${path}`);

export const del = <T>(path: string): Promise<T> =>
  withLogs<T>(axios.delete(path), `DELETE - ${path}`);

type Message<T extends any> = {
  event: string;
  payload: T;
};

export const newWebSocket = <T>(
  resource: string,
  onMessage: (data: Message<T>) => void
) => {
  const ws = new WebSocket(`${webSocketURL}/${resource}`);
  ws.onopen = () => {
    log("web socket onopen");
  };
  ws.onclose = () => {
    log("web socket onclose");
  };
  ws.onerror = (error) => {
    log(`web socket onerror: ${error}`);
  };
  ws.onmessage = (message) => {
    log(`web socket onmessage: ${message.data}`);
    onMessage(message.data);
  };
  return () => {
    ws.close();
  };
};

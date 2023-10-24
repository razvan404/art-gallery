import WebSocket from "ws";
import { wsServer } from "..";

export default {
  sendToAll: (event: any, payload: any) => {
    wsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ event, payload }));
      }
    });
  },
};

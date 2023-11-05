import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { uploadsRouter } from "./raw/uploads";
import userRouter from "./models/user";
import pictureTypeRouter from "./models/pictureType";
import { pictureRouter } from "./models/picture/router";
import WebSocket from "ws";
import jwt from "jsonwebtoken";
import { authRouter } from "./auth";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT = parseInt(process.env.PORT, 10);
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("[:date[iso]] :method :url :status (:response-time ms)"));

app.use("/uploads", uploadsRouter);
app.use("/api/users", userRouter);
app.use("/api/pictureTypes", pictureTypeRouter);
app.use("/api/pictures", pictureRouter);
app.use("/api/auth", authRouter);

app.use("*", (_req, res) => {
  res.sendStatus(404);
});

const httpServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export const wsServer = new WebSocket.Server({ noServer: true });

httpServer.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
});

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { uploadsRouter } from "./raw/uploads";
import userRouter from "./models/user";
import pictureTypeRouter from "./models/pictureType";
import { pictureRouter } from "./models/picture/router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT = parseInt(process.env.PORT, 10);
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", uploadsRouter);
app.use("/api/users", userRouter);
app.use("/api/pictureTypes", pictureTypeRouter);
app.use("/api/pictures", pictureRouter);

app.use("*", (_req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

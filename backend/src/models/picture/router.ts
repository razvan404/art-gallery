import express from "express";
import * as pictureService from "./service";

export const pictureRouter = express.Router();

// GET pictures/
pictureRouter.get("/", async (req, res) => {
  try {
    const pictures = await pictureService.findAll();
    res.status(200).send(pictures);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

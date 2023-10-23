import express from "express";
import * as pictureService from "./service";

export const pictureRouter = express.Router();

// GET pictures/
pictureRouter.get("/", async (req, res) => {
  try {
    const pictures = await pictureService.findAllMini();
    res.status(200).send(pictures);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET pictures/:id
pictureRouter.get("/:id", async (req, res) => {
  try {
    const picture = await pictureService.findById(req.params.id);
    res.status(200).send(picture);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// PUT pictures/
pictureRouter.put("/:id", async (req, res) => {
  try {
    const picture = await pictureService.update({
      ...req.body,
      id: req.params.id,
    });
    res.status(200).send(picture);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

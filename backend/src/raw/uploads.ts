import express from "express";
import fs from "fs";

export const uploadsRouter = express.Router();

// GET /uploads/:file
uploadsRouter.get("/:file", async (req, res) => {
  const file = req.params.file;
  const filePath = `${__dirname}/../../uploads/${file}`;
  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "image/jpeg");
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.sendStatus(404);
  }
});

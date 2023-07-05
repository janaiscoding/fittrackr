import express, { Express, Request, Response } from "express";
const router = express.Router();

const array: string[] = [];

router.get("/", function (req: Request, res: Response, next) {
  res.json({ array });
});

router.post("/", function (req: Request, res: Response, next) {
  array.push(req.body.message);
  res.json({ message: "POST request simulation works" });
});

export default router;

import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import postControllers from "../controllers/postControllers";
//protected (gotta be logged on to see heh)
router.get("/", postControllers.posts_get);

router.get("/signup", (req, res, next) => {
  res.json({ message: "auth signup get" });
});
router.get("/login", (req, res, next) => {
  res.json({ message: "auth login get" });
});

export default router;

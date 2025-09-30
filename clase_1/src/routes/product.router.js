import { Router } from "express";

const router = Router();

// get
router.get("/", (req, res) => {
  res.status(200).json({ message: "Todos los priductos" });
});
router.get("/:id", (req, res) => {
  res.status(200).json({ message: "Un producto" });
});
// post

// put

// delete

export default router;

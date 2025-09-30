import { Router } from "express";
import userModel from "../models/user.model.js";
const router = Router();

// get
router.get("/", async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({ message: "Todos los usuarios", payload: users });
});
router.get("/:id", async (req, res) => {
   const id= req.params.id
  res.status(200).json({ message: "Un usuario" });
});
// post
router.post("/", async (req, res) => {
  const { name, last_name, email } = req.body;
  const newUser = await userModel.create({ name, last_name, email });
  res.status(201).json({ message: "Un usuario", payload: newUser });
});

// put

// delete

export default router;

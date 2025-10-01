import { Router } from "express";

import userModel from "../models/users.model.js";

const router = Router();
// rutas post
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "El correo ya existe" });
    }
    const newUser = {
      first_name,
      last_name,
      email,
      password,
    };
    await userModel.create(newUser);

    res.status(201).redirect("/login");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", err: error.message });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await userModel.findOne({ email: email });
    if (userExist) {
      //  si existe el usuario creamos la sesión ¿Cómo? 🤷‍♀️
      // ¿Validamos el password?
      res.redirect("/profile");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error interno del servidor", err: error.mesagge });
  }
});



// logout
router.post("/logout", (req, res, next) => {
  if (req.session.user) {
  // Destruimos la session
  }
})
  
export default router;

import { Router } from "express";

const router = Router();

router.get("/register", (req, res) => {
  res.render("register", { title: "REGISTER" });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "LOGIN" });
});

router.get("/profile", (req, res) => {
  // Si no existe la sesion debemos redirigir al login. Una manera básica de 'proteger' esta ruta
  const user = {};

  res.render("profile", { title: "PROFILE", user: user });
});

export default router;

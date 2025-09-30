import express from "express";
import mongoose from "mongoose";
import usersRoutes from "./routes/user.router.js";

const app = express();

// const PORT = 3000
//settings
app.set("PORT", 3000);

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sessions");
    console.log("Conexion exitosa");
  } catch (error) {
    console.log("error de conexion");
  }
};

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Hola tarola!");
});
app.use("/api/users", usersRoutes);

// manejador de rutas inexistes
app.use((req, res, next) => {
  res.status(404).send("Not found");
});
// listeners
connectDb();
app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")} `);
});

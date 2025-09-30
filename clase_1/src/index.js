import express from "express";
import mongoose, { mongo } from "mongoose";
import usersRoutes from "./routes/user.router.js";
import productRoutes from "./routes/product.router.js";

const app = express();

// const PORT = 3000
//settings
app.set("PORT", 3000);

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/class-zero");
    console.log("Conexion exitosa");
  } catch (error) {
    console.log("error de conexion");
  }
};

// middlewares
app.use(express.json());
const midDate = (req, res, next) => {
  console.log(
    `Este middleware muetra la fecha donde lo necesite ${new Date().toLocaleDateString()}`
  );
  next();
};
const midDate2 = (req, res, next) => {
  console.log(
    `Este middleware muetra la fecha donde lo necesite ${new Date().toDateString()}`
  );
  next();
};
// routes
app.get("/", [midDate2, midDate], (req, res) => {
  res.send("Hola tarola!");
});
app.use("/api/users", usersRoutes);
app.use("/api/products", productRoutes);

// manejador de rutas inexistes
app.use((req, res, next) => {
  res.status(404).send("not found");
});
// listeners
connectDb();
app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")} `);
});

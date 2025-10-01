import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
// import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import usersRoutes from "./routes/user.router.js";

const app = express();

// const PORT = 3000
//settings
app.set("PORT", 3000);
const url = "mongodb://127.0.0.1:27017/sessions";
const secret = "kjhfkjhf383?;;jmsd";
// const fileStore = FileStore(session);

const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Conexion exitosa");
  } catch (error) {
    console.log("error de conexion");
  }
};

// middlewares
app.use(express.json());
app.use(cookieParser());
// guardar la sesion en local
// app.use(
//   session({
//     store: new fileStore({ path: "./sessions", ttl: 100, retries: 0 }),
//     secret,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// guardar la session en DB
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: url,
      ttl: 60000,
    }),
    secret,
    resave: false,
    saveUninitialized: false,
  })
);

// routes
app.get("/", (req, res) => {
  res.send("Hola tarola!");
});

// rutas de ejemplo
app.use("/api/users", usersRoutes);

app.get("/login", (req, res) => {
  const user = req.query.user;
  req.session.user = user; //req.query.user
  res.redirect("/user");
});

app.get("/user", (req, res) => {
  if (req.session?.user) {
    return res.send(`El usuario registrado es ${req.session.user}`);
  }

  res.send("No hay usuario registrado");
});
// manejador de rutas inexistes
app.use((req, res, next) => {
  res.status(404).send("Not found");
});
// listeners
connectDb(url);
app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")} `);
});

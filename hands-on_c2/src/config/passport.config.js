import passport from "passport";
import local from "passport-local";
import userModel from "../models/users.model.js";
import { createHash, isValidadPassword } from "../utils/index.js";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email } = req.body;
        try {
          const userFound = await userModel.findOne({ email: username });
          if (userFound) {
            console.log("Useuario existente en la db");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
          };
          const user = await userModel.create(newUser);
          return done(null, user);
        } catch (error) {
          return done(`Error al crear el usuario ${error}`, false);
        }
      }
    )
  );
  //   login

  // aca ocurre magia
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport
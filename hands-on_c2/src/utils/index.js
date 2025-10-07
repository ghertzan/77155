import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), "..");

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidadPassword = (password, hash) =>
  bcrypt.compareSync(password, hash);

export { join, __dirname };

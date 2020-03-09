import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../configs/authConfig";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "JWT Token must be provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    console.log(decoded);
    if (decoded.tipo == "3") {
      req.userId = decoded.id;
      req.userTipo = decoded.tipo;
      return next();
    }
    return res.status(401).json({ error: "Usuário deve der Administrador" });
  } catch (err) {
    return res.status(401).json({ error: "Token invalid" });
  }

  next();
};
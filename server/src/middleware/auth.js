import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    req.admin = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

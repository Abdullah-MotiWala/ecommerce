import jwt from "jsonwebtoken";

//middle ware for authentication
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

//authorization middle ware
export const authorizerMW = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //bearer XXXXXXX only token part to be valid(this was the error in dradtier for verify)
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).sendMessage({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).sendMessage({ message: "No Token" });
  }
};

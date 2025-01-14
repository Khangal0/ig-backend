const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const head = req.headers["authorization"];
  const token = head.split(" ")[1];

  const token2 = jwt.verify(token, process.env.JWT_SECRET);
  if (token2) {
    next();
  } else {
    res.send("err");
  }
};

module.exports = authMiddleware;

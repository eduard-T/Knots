const jwt = require("jsonwebtoken");

const getToken = (userInfo) => {
  return jwt.sign(userInfo, process.env.TOKEN_SECRET, { expiresIn: "48h" });
};

const getAuthUser = (req, res, next) => {
  const rawToken = req.headers.authorization;
  console.log(`rawToken`, rawToken);
  if (rawToken) {
    const token = rawToken.slice(7, rawToken.length);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ authError: { msg: "Invalid token" } });
      }

      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ authError: { msg: "Token does not exist" } });
  }
};

module.exports = { getToken, getAuthUser };

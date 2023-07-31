const jwt = require("jsonwebtoken")

//generate a token
const getToken = (userInfo) => {
  return jwt.sign(userInfo, process.env.TOKEN_SECRET, { expiresIn: "48h" })
}

//authorize user
const getAuthUser = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ authError: { msg: "Invalid token" } })
      }

      req.user = decode
      next()
      return
    })
  } else {
    return res.status(401).send({ authError: { msg: "Token does not exist" } })
  }
}

module.exports = { getToken, getAuthUser }

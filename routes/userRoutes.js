const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const pool = require("../db/connect");
const { getToken } = require("../util");

const router = express.Router();

const saltRounds = 10;

const userInfoValidation = (action) => {
  switch (action) {
    case "login":
      return [
        body("email", "Please enter your email").notEmpty(),
        body("password", "Please enter your password").notEmpty(),
      ];
    case "register":
      return [
        body("firstName", "Please enter a valid first name")
          .exists()
          .notEmpty()
          .isLength({ min: 2, max: 30 }),
        body("lastName", "Please enter a valid last name")
          .exists()
          .notEmpty()
          .isLength({ min: 2, max: 30 }),
        body("email", "Invalid email address").exists().notEmpty().isEmail(),
        body("email").custom(async (email) => {
          const duplicate = await pool.query(
            "SELECT email FROM users WHERE email = $1",
            [email]
          );

          if (duplicate.rows && !!duplicate.rows.length) {
            throw new Error("User already exists with this email!");
          }

          return true;
        }),
        body("password", "Password must be at least 8 characters")
          .exists()
          .notEmpty()
          .isLength({ min: 8 }),
        body("confirm", "Passwords do not match")
          .exists()
          .notEmpty()
          .isLength({ min: 8 })
          .custom((confirm, { req }) => {
            if (confirm !== req.body.password) {
              return;
            }
            return true;
          }),
      ];
    default:
      break;
  }
};

router.post(
  "/register",
  cors(),
  userInfoValidation("register"),
  async (request, response) => {
    const userInfo = request.body;
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(401).send(errors.mapped());
    } else {
      const pwHash = await bcrypt.hash(userInfo.password, saltRounds);

      // insert the object into the users table
      const newUser = await pool
        .query(
          "INSERT INTO users(firstName, lastName, email, passwordHash) VALUES ($1, $2, $3, $4) RETURNING firstName, lastName, email",
          [userInfo.firstName, userInfo.lastName, userInfo.email, pwHash]
        )
        .catch(() =>
          response.status(403).send({
            registrationError: {
              msg: "Internal registration error! Unable to add user",
            },
          })
        );

      return response
        .status(200)
        .send({ ...newUser.rows[0], token: getToken(newUser.rows[0]) });
    }
  }
);

router.post(
  "/login",
  cors(),
  userInfoValidation("login"),
  async (request, response) => {
    const { email, password } = request.body;
    const errors = validationResult(request);

    const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [
      email.trim(),
    ]);

    if (!errors.isEmpty()) {
      return response.status(401).send(errors.mapped());
    }

    if (userQuery && !!userQuery.rows.length && password) {
      const { password_hash, ...userInfo } = userQuery.rows[0];

      const passwordCheck = await bcrypt.compare(
        password.trim(),
        password_hash
      );

      if (!passwordCheck) {
        return response.status(403).send({
          loginError: {
            msg: "Login failed! Please check your credentials",
          },
        });
      }

      return response
        .status(200)
        .send({ ...userInfo, token: getToken(userInfo) });
    } else {
      return response.status(403).send({
        loginError: {
          msg: "Login failed! Please check your credentials",
        },
      });
    }
  }
);

module.exports = router;

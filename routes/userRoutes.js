const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const pool = require("../db/connect");
const { getToken, getAuthUser } = require("../util");

const router = express.Router();

const saltRounds = 10;

const userInfoValidation = (action) => {
  switch (action) {
    case "login":
      return [
        body("email", "Please enter your email").notEmpty(),
        body("password", "Please enter your password").notEmpty(),
      ];
    case "update":
      return [
        body("firstName", "Please enter a valid first name")
          .notEmpty()
          .isLength({ min: 2, max: 30 }),
        body("lastName", "Please enter a valid last name")
          .notEmpty()
          .isLength({ min: 2, max: 30 }),
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
          "INSERT INTO users(first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email",
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

router.put(
  "/update/info",
  cors(),
  userInfoValidation("update"),
  getAuthUser,
  async (request, response) => {
    const authUser = request.user;
    const { firstName, lastName } = request.body;
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(401).send(errors.mapped());
    } else {
      const updateUser = await pool
        .query(
          "UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING first_name, last_name",
          [firstName, lastName, authUser.id]
        )
        .catch(() => {
          return response.status(401).send({
            updateUserError: {
              msg: "Failed to update the user information, please refresh your browser and try again",
            },
          });
        });

      return response.status(200).send(updateUser.rows[0]);
    }
  }
);

router.delete("/delete", cors(), getAuthUser, async (request, response) => {
  const authUser = request.user;

  await pool
    .query("DELETE FROM users WHERE id = $1", [authUser.id])
    .catch(() => {
      return response.status(401).send({
        deleteUserError: {
          msg: "Failed to delete the user, please refresh your browser and try again",
        },
      });
    });

  response.status(200).end();
});

module.exports = router;

const express = require("express");
const cors = require("cors");
const pool = require("../db/connect");
const { getAuthUser } = require("../util");

const router = express.Router();

router.get("/", cors(), getAuthUser, async (request, response) => {
  const authUser = request.user;
  const userGoals = await pool
    .query("SELECT * FROM goals WHERE user_id = $1 ORDER BY gid", [authUser.id])
    .catch(() => {
      return response.status(401).send({
        readError: {
          msg: "Failed to retrieve user goals, please refresh your browser and try again",
        },
      });
    });

  response.status(200).send(userGoals.rows);
});

router.post("/create", cors(), getAuthUser, async (request, response) => {
  const authUser = request.user;
  const { description, timeline } = request.body;

  if (!description || !timeline) {
    return response
      .status(403)
      .send("Missing values for description and/or timeline");
  } else {
    await pool
      .query(
        "INSERT INTO goals (user_id, description, timeline, completed) VALUES ($1, $2, $3, $4)",
        [authUser.id, description, timeline, false]
      )
      .catch(() => {
        return response.status(401).send({
          createError: {
            msg: "Failed to create the goal, please refresh your browser and try again",
          },
        });
      });

    response.status(200).end();
  }
});

router.put("/update/:id", cors(), getAuthUser, async (request, response) => {
  const authUser = request.user;
  const { description, timeline } = request.body;
  const goalID = request.params.id;

  if (!description || !timeline) {
    return response
      .status(403)
      .send("Missing values for description and/or timeline");
  } else {
    await pool
      .query(
        "UPDATE goals SET description = $1, timeline = $2 WHERE user_id = $3 AND gid = $4",
        [description, timeline, authUser.id, goalID]
      )
      .catch(() => {
        return response.status(401).send({
          updateError: {
            msg: "Failed to update the goal, please refresh your browser and try again",
          },
        });
      });

    response.status(200).end();
  }
});

router.put("/complete/:id", cors(), getAuthUser, async (request, response) => {
  const authUser = request.user;
  const { completed } = request.body;
  const goalID = request.params.id;

  await pool
    .query("UPDATE goals SET completed = $1 WHERE user_id = $2 AND gid = $3", [
      completed,
      authUser.id,
      goalID,
    ])
    .catch(() => {
      return response.status(401).send({
        updateError: {
          msg: "Failed to mark the goal as complete, please refresh your browser and try again",
        },
      });
    });

  response.status(200).end();
});

router.delete("/delete/:id", cors(), getAuthUser, async (request, response) => {
  const authUser = request.user;
  const goalID = request.params.id;

  await pool
    .query("DELETE FROM goals WHERE gid = $1 AND user_id = $2", [
      goalID,
      authUser.id,
    ])
    .catch(() => {
      return response.status(401).send({
        updateError: {
          msg: "Failed to delete the goal, please refresh your browser and try again",
        },
      });
    });

  response.status(200).end();
});

module.exports = router;

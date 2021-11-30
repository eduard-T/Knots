const express = require("express");
const cors = require("cors");
const pool = require("../db/connect");
const { getAuthUser } = require("../util");

const router = express.Router();

// GET ALL GOALS
router.get("/", cors(), getAuthUser, async (request, response) => {
  const authUser = request.user;
  const userGoals = await pool
    //query for all goals by user id
    .query("SELECT * FROM goals WHERE user_id = $1 ORDER BY gid", [authUser.id])
    .catch(() => {
      //if postgres query fails, return an error message
      return response.status(401).send({
        readError: {
          msg: "Failed to retrieve user goals, please refresh your browser and try again",
        },
      });
    });

  response.status(200).send(userGoals.rows);
});

// CREATE A NEW GOAL
router.post("/create", cors(), getAuthUser, async (request, response) => {
  const authUser = request.user;
  const { description, timeline } = request.body;

  if (!description || !timeline) {
    //if no values for description or timeline, return an error
    return response
      .status(403)
      .send("Missing values for description and/or timeline");
  } else {
    //insert the values into goals table
    await pool
      .query(
        "INSERT INTO goals (user_id, description, timeline, completed) VALUES ($1, $2, $3, $4)",
        [authUser.id, description, timeline, false]
      )
      .catch(() => {
        //if postgres query fails, return an error message
        return response.status(401).send({
          createError: {
            msg: "Failed to create the goal, please refresh your browser and try again",
          },
        });
      });

    response.status(200).end();
  }
});

// UPDATE AN EXISTING GOAL
router.put("/update/:id", cors(), getAuthUser, async (request, response) => {
  const authUser = request.user;
  const { description, timeline } = request.body;
  const goalID = request.params.id;

  if (!description || !timeline) {
    //if no values for description or timeline, return an error
    return response
      .status(403)
      .send("Missing values for description and/or timeline");
  } else {
    //update the goal with the values provided
    await pool
      .query(
        "UPDATE goals SET description = $1, timeline = $2 WHERE user_id = $3 AND gid = $4",
        [description, timeline, authUser.id, goalID]
      )
      .catch(() => {
        //if postgres query fails, return an error message
        return response.status(401).send({
          updateError: {
            msg: "Failed to update the goal, please refresh your browser and try again",
          },
        });
      });

    response.status(200).end();
  }
});

// MARK A GOAL AS COMPLETED
router.put("/complete/:id", cors(), getAuthUser, async (request, response) => {
  const authUser = request.user;
  const { completed } = request.body;
  const goalID = request.params.id;

  //update the goal state to true
  await pool
    .query("UPDATE goals SET completed = $1 WHERE user_id = $2 AND gid = $3", [
      completed,
      authUser.id,
      goalID,
    ])
    .catch(() => {
      //if postgres query fails, return an error message
      return response.status(401).send({
        updateError: {
          msg: "Failed to mark the goal as complete, please refresh your browser and try again",
        },
      });
    });

  response.status(200).end();
});

// DELETE A GOAL
router.delete("/delete/:id", cors(), getAuthUser, async (request, response) => {
  const authUser = request.user;
  const goalID = request.params.id;

  //delete the goal from the table
  await pool
    .query("DELETE FROM goals WHERE gid = $1 AND user_id = $2", [
      goalID,
      authUser.id,
    ])
    .catch(() => {
      //if postgres query fails, return an error message
      return response.status(401).send({
        updateError: {
          msg: "Failed to delete the goal, please refresh your browser and try again",
        },
      });
    });

  response.status(200).end();
});

module.exports = router;

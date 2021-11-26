const express = require("express");
const cors = require("cors");
const pool = require("./db/connect");
const path = require("path");

//routers
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 4000;

const api = express();

//middleware
api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use(cors());

//routes
api.use("/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  api.use(express.static(path.join(__dirname, "../client/build")));
}

// === SEND ALL DATA FROM GOALS
api.get("/goals", cors(), async (request, response) => {
  try {
    // const allGoals = await pool.query("SELECT * FROM orders");
    // response.status(200).json(allOrders.rows);
    const goals = [
      {
        gid: 1,
        description: "Learn Python before Christmas",
        type: "Short Term",
        completed: false,
      },
      {
        gid: 2,
        description: "Help a developer with their code",
        type: "Long Term",
        completed: false,
      },
      {
        gid: 3,
        description: "Finish the MVP of this project",
        type: "Urgent",
        completed: true,
      },
    ];

    response.status(200).send(goals);
  } catch (error) {
    console.log("ERROR!", error);
    response.status(500).send("Failed to retrieve goals");
  }
});

//catch all function to redirect to the homepage if the path does not exist
api.get("*", cors(), (request, response) => {
  response.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// listen for API at the given port
api.listen(PORT, () => {
  console.log(`API running at PORT: ${PORT}`);
});

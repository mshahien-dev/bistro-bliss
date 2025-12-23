const express = require("express");
const cors = require("cors");
require("./db/mongoose");
require("./db/redis");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/item");

const app = express();

// Allowed frontends
const allowedOrigins = ["http://localhost:4200", "http://localhost:4201"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use((err, req, res, next) => {
  if (err.message && err.message.includes("CORS")) {
    return res.status(403).send({ error: err.message });
  }
  next(err);
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;

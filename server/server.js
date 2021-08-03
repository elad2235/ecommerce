const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

//import routes
const authRoutes = require("./routes/auth");

//db
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((e) => console.error(e));

// middlewares
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api", authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("server running"));
